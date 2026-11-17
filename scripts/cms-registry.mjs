/**
 * Which content files appear in the two website editors (Pages CMS and Sveltia at /admin).
 * Field types are worked out by scripts/cms-config.mjs from the JSON itself.
 * Adding content: src/content/<...>.json (top level an object) → entry below → npm run cms:config → commit.
 */

/** relay: false = Sveltia sign-in with "Sign In Using Access Token" (Hostinger sites publish from the live branch). */
export const SITE = {
  url: 'https://alcleaningpro.ca',
  repo: 'jacquesmofa/AL-Cleaning',
  logo: 'https://alcleaningpro.ca/icon-192.png',
  relay: false,
};

export const GROUPS = [
  { name: 'settings', label: 'Google and sharing' },
];

export const ENTRIES = [
  { group: 'settings', name: 'seo', label: 'Page titles, descriptions and share picture', file: 'src/content/seo.json',
    description: 'What Google, Facebook, WhatsApp and LinkedIn show for each page, service and city.' },
];

export const FIELD_HINTS = {
  site: { label: 'Whole site (defaults)' },
  pages: { label: 'Pages', itemName: 'page' },
  path: { label: 'Page address', description: 'For example /about. Do not change.' },
  title: { label: 'Title (under 65 characters)' },
  description: { label: 'Description (120 to 160 characters)', type: 'text' },
  image: { label: 'Share picture (1200 × 630)' },
  imageAlt: { label: 'What the picture shows (for screen readers)' },
  imageWidth: { label: 'Share picture width' },
  imageHeight: { label: 'Share picture height' },
  name: { label: 'Name' },
  url: { label: 'Web address' },
  locale: { label: 'Main language code' },
  localeAlternate: { label: 'Second language code' },
};
