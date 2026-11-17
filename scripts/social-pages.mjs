#!/usr/bin/env node
/**
 * Share previews for every page (studio tool, same file in every client repo).
 *
 * Social apps (Facebook, WhatsApp, LinkedIn, X, iMessage, Slack, Teams...) never run
 * the website's JavaScript: they only read the first HTML file. A React site therefore
 * shows the home-page preview for every link. This script runs right after `vite build`
 * and writes one small HTML file per page (e.g. out/about.html) whose <head> carries
 * that page's own title, description, link and picture. The .htaccess serves
 * /about -> about.html, and the React app then starts exactly as before.
 *
 * Source of truth: src/content/seo.json
 *   site:  name, url (no trailing slash), image, imageAlt, locale, localeAlternate?, twitter?
 *   pages: [{ path, title, description, image?, imageAlt?, noindex? }]
 * It also writes sitemap.xml and makes sure robots.txt points at it.
 *
 * Usage: node scripts/social-pages.mjs [outDir]   (default: the folder vite built into)
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const outDir = path.resolve(root, process.argv[2] || (fs.existsSync(path.join(root, 'dist/index.html')) && !fs.existsSync(path.join(root, 'out/index.html')) ? 'dist' : 'out'));
const seoFile = path.join(root, 'src/content/seo.json');
const seo = JSON.parse(fs.readFileSync(seoFile, 'utf8'));
const site = seo.site;
if (!site?.url || !site?.name) throw new Error('seo.json: site.url and site.name are required');
const siteUrl = site.url.replace(/\/+$/, '');

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// Editor uploads are saved as /media/uploads/x.jpg: share pictures must be full addresses.
const abs = (u) => (u && !/^https?:\/\//.test(u) ? `${siteUrl}/${u.replace(/^\/+/, '')}` : u);
const urlFor = (p) => (p === '/' ? `${siteUrl}/` : `${siteUrl}/${p.replace(/^\/+|\/+$/g, '')}`);
const imgType = (u) => (/\.png($|\?)|f_png/.test(u) ? 'image/png' : /\.webp($|\?)|f_webp/.test(u) ? 'image/webp' : 'image/jpeg');

const template = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8');

// Tags this script owns. Any copy already in index.html is removed so nothing is ever doubled.
const OWNED = [
  /<title>[\s\S]*?<\/title>\s*/gi,
  /<meta\s+(?:name|property)="(?:description|robots|googlebot|og:[^"]*|twitter:[^"]*|article:[^"]*)"[^>]*>\s*/gi,
  /<link\s+rel="canonical"[^>]*>\s*/gi,
  /<!--\s*(?:Open Graph|Twitter|X \/ Twitter|Share previews)[^>]*-->\s*/gi,
];
let base = template;
for (const re of OWNED) base = base.replace(re, '');
// Remove HTML comments that only labelled the removed tags, and blank-line runs.
base = base.replace(/\n[ \t]*\n(?:[ \t]*\n)+/g, '\n\n');

function headBlock(page) {
  const title = page.title || site.name;
  const description = page.description || site.description || '';
  const url = urlFor(page.path);
  const image = abs(page.image || site.image);
  const imageAlt = page.imageAlt || (page.image ? title : site.imageAlt) || title;
  const robots = page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  const L = [
    `<!-- Share previews: generated from src/content/seo.json by scripts/social-pages.mjs -->`,
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    page.noindex ? '' : `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:type" content="${page.type || (page.path === '/' ? 'website' : 'website')}" />`,
    `<meta property="og:site_name" content="${esc(site.name)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:locale" content="${esc(site.locale || 'en_CA')}" />`,
    ...(site.localeAlternate ? [].concat(site.localeAlternate).map((l) => `<meta property="og:locale:alternate" content="${esc(l)}" />`) : []),
    ...(image ? [
      `<meta property="og:image" content="${esc(image)}" />`,
      `<meta property="og:image:secure_url" content="${esc(image)}" />`,
      `<meta property="og:image:type" content="${imgType(image)}" />`,
      `<meta property="og:image:width" content="${page.image ? page.imageWidth || 1200 : site.imageWidth || 1200}" />`,
      `<meta property="og:image:height" content="${page.image ? page.imageHeight || 630 : site.imageHeight || 630}" />`,
      `<meta property="og:image:alt" content="${esc(imageAlt)}" />`,
    ] : []),
    `<meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}" />`,
    site.twitter ? `<meta name="twitter:site" content="${esc(site.twitter)}" />` : '',
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    ...(image ? [`<meta name="twitter:image" content="${esc(image)}" />`, `<meta name="twitter:image:alt" content="${esc(imageAlt)}" />`] : []),
  ].filter(Boolean);
  return L.map((l) => `    ${l}`).join('\n');
}

function render(page) {
  const block = headBlock(page);
  // Insert right after the viewport meta (or charset), so the head reads top-down.
  const anchor = base.match(/<meta[^>]+name="viewport"[^>]*>\s*\n/i) || base.match(/<meta[^>]+charset[^>]*>\s*\n/i);
  if (!anchor) return base.replace(/<head>/i, `<head>\n${block}\n`);
  const at = anchor.index + anchor[0].length;
  return base.slice(0, at) + block + '\n' + base.slice(at);
}

const written = [];
for (const page of seo.pages) {
  if (!page?.path || page.path.includes(':') || page.path.includes('*')) continue;
  const rel = page.path === '/' ? 'index.html' : `${page.path.replace(/^\/+|\/+$/g, '')}.html`;
  const file = path.join(outDir, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, render(page));
  written.push(rel);
}
// Pages not listed (e.g. a 404 address) fall back to index.html, which now carries the home tags.

// sitemap.xml: every listed page that is not noindex.
const today = new Date().toISOString().slice(0, 10);
const urls = seo.pages.filter((p) => p?.path && !p.noindex && !p.path.includes(':') && !p.path.includes('*'));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<!-- Generated from src/content/seo.json on every build. -->\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls
  .map((p) => {
    const img = abs(p.image || (p.path === '/' ? site.image : ''));
    return `  <url>\n    <loc>${esc(urlFor(p.path))}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${p.path === '/' ? '1.0' : '0.8'}</priority>${img ? `\n    <image:image><image:loc>${esc(img)}</image:loc></image:image>` : ''}\n  </url>`;
  })
  .join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap);

// robots.txt: keep what the site had, make sure it names the right sitemap.
const robotsFile = path.join(outDir, 'robots.txt');
let robots = fs.existsSync(robotsFile) ? fs.readFileSync(robotsFile, 'utf8') : 'User-agent: *\nAllow: /\n';
robots = robots.replace(/^Sitemap:.*$/gim, '').replace(/\n{3,}/g, '\n\n').trimEnd();
fs.writeFileSync(robotsFile, `${robots}\n\nSitemap: ${siteUrl}/sitemap.xml\n`);

console.log(`social-pages: ${written.length} pages with their own share preview, sitemap.xml with ${urls.length} addresses (${siteUrl})`);
