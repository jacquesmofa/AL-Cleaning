import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import seo from '../../content/seo.json';

// Keeps the tab title, Google description and share tags in step with the current page.
// Social apps never run this: they read the static page scripts/social-pages.mjs writes
// for every address at build time, from the same src/content/seo.json.
type Page = { path: string; title: string; description: string; image?: string; imageAlt?: string };

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

export default function SeoSync() {
  const { pathname } = useLocation();
  useEffect(() => {
    const path = pathname.replace(/\/+$/, '') || '/';
    const page = (seo.pages as Page[]).find((p) => p.path === path) ?? (seo.pages as Page[])[0];
    const url = seo.site.url + (page.path === '/' ? '/' : page.path);
    const img = page.image || seo.site.image;
    const image = img.startsWith('/') ? seo.site.url + img : img;
    const imageAlt = page.imageAlt || seo.site.imageAlt;
    document.title = page.title;
    setMeta('name', 'description', page.description);
    setMeta('property', 'og:title', page.title);
    setMeta('property', 'og:description', page.description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:image:alt', imageAlt);
    setMeta('name', 'twitter:title', page.title);
    setMeta('name', 'twitter:description', page.description);
    setMeta('name', 'twitter:image', image);
    setMeta('name', 'twitter:image:alt', imageAlt);
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = url;
  }, [pathname]);
  return null;
}
