// Usage: node snapshot.mjs <outDir-to-serve> <snapshot.json>
// Serves a built site, visits every route in Chrome, records visible text,
// image sources, background images and link targets.
import { chromium } from 'playwright-core';
import http from 'node:http';
import { readFileSync, existsSync, statSync, writeFileSync } from 'node:fs';
import { join, extname } from 'node:path';

const [root, outFile] = process.argv.slice(2);
const routes = process.env.ROUTES ? process.env.ROUTES.split(",") : ["/", "/about", "/about/who-we-are/president-profile", "/international-focus", "/local-programmes", "/programs/mining-technology-exchange", "/impact", "/events", "/events/upcoming", "/events/past", "/events/news", "/events/press-releases", "/events/gallery", "/partners", "/donate", "/contact", "/contact/media-inquiries", "/privacy-policy", "/terms-of-service", "/accessibility", "/faq", "/sitemap", "/events/gallery/1st-international-post-covid-conference-toronto-2024", "/events/gallery/2nd-international-post-covid-conference-brampton-2025", "/events/gallery/angola-diplomatic-engagement-2025", "/events/gallery/conference-planning-behind-the-scenes", "/events/gallery/canada-south-africa-economic-outlook-2026", "/events/gallery/diplomatic-engagements-partnerships", "/events/gallery/greater-sudbury-mining-ecosystem-2026", "/no-such-page"];
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png' };

const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  let file = join(root, url);
  if (!existsSync(file) || statSync(file).isDirectory()) file = join(root, 'index.html');
  res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' });
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(4310, r));

const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'] });
const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
// Freeze time and randomness so carousels/dates are stable between runs.
await context.addInitScript(() => {
  Math.random = () => 0.42;
  const fixed = new Date('2026-11-10T12:00:00Z').getTime();
  const RealDate = Date;
  // eslint-disable-next-line no-global-assign
  Date = class extends RealDate {
    constructor(...a) { super(...(a.length ? a : [fixed])); }
    static now() { return fixed; }
  };
});
// Block outside network so results don't depend on remote servers.
await context.route('**/*', (route) => {
  const u = route.request().url();
  if (u.startsWith('http://localhost:4310')) return route.continue();
  return route.abort();
});

const result = {};
for (const path of routes) {
  const page = await context.newPage();
  await page.goto('http://localhost:4310' + path, { waitUntil: 'load' });
  await page.waitForTimeout(900);
  for (let y = 0; y < 16000; y += 1600) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(40);
  }
  await page.waitForTimeout(800);
  result[path] = await page.evaluate(() => {
    const norm = (s) => (s ?? '').replace(/\s+/g, ' ').trim();
    const text = document.body.innerText.split('\n').map(norm).filter(Boolean);
    const imgs = [...document.querySelectorAll('img')].map((i) => i.getAttribute('src') + ' | alt=' + (i.getAttribute('alt') ?? ''));
    const bgs = [...document.querySelectorAll('[style]')].map((e) => e.getAttribute('style')).filter((s) => s.includes('url('));
    const links = [...document.querySelectorAll('a')].map((a) => a.getAttribute('href') + ' | ' + norm(a.innerText ?? a.textContent).slice(0, 60));
    const videos = [...document.querySelectorAll('video, source, iframe')].map((v) => v.getAttribute('src'));
    const all = norm(document.getElementById('root').textContent); return { title: document.title, text, all: [all], imgs, bgs, links, videos };
  });
  await page.close();
}
await browser.close();
server.close();
writeFileSync(outFile, JSON.stringify(result, null, 1));
console.log('snapshot', outFile, Object.keys(result).length, 'routes');
