#!/usr/bin/env node
/**
 * Writes BOTH website-editor configs from the content files in src/content/:
 *   .pages.yml               Pages CMS (people without GitHub)
 *   public/admin/config.yml  Sveltia CMS at /admin (people with GitHub)
 *
 * Run after adding a content file or a new field:   npm run cms:config
 * Check they are up to date (CI / before pushing):    npm run cms:check
 *
 * Field types are worked out from the JSON itself (text vs short text, images,
 * dates, lists, groups). Labels and help text come from scripts/cms-registry.mjs.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ENTRIES, GROUPS, FIELD_HINTS, SITE } from './cms-registry.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const checkOnly = process.argv.includes('--check');

const IMAGE_KEY = /(image|img|photo|logo|banner|poster|flyer|background|avatar|thumbnail|picture|cover)s?$/i;
const IMAGE_URL = /\.(jpe?g|png|webp|gif|avif|svg)(\?|$)|search-image\?|res\.cloudinary\.com|i\.imgur\.com/i;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

const words = (key) => {
  const s = key.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/[_-]+/g, ' ').toLowerCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
};

/** Infer a field description from a key and every value seen for it. */
function infer(key, values) {
  const present = values.filter((v) => v !== undefined && v !== null);
  const hint = FIELD_HINTS[key] ?? {};
  const field = { name: key, label: hint.label ?? words(key) };
  if (hint.description) field.description = hint.description;

  if (present.length && present.every((v) => Array.isArray(v))) {
    const items = present.flat();
    // An empty list has nothing to learn its shape from: the registry can give an example.
    if (!items.length && hint.sample) items.push(...hint.sample);
    if (items.length && items.every((v) => v && typeof v === 'object' && !Array.isArray(v))) {
      return { ...field, kind: 'list-object', fields: inferObject(items) };
    }
    const inner = infer(hint.itemName ?? 'item', items);
    return { ...field, kind: 'list-scalar', item: inner };
  }
  if (present.length && present.every((v) => v && typeof v === 'object')) {
    return { ...field, kind: 'object', fields: inferObject(present) };
  }
  if (present.length && present.every((v) => typeof v === 'boolean')) return { ...field, kind: 'boolean' };
  if (present.length && present.every((v) => typeof v === 'number')) return { ...field, kind: 'number' };

  const strings = present.map(String);
  if (hint.type) return { ...field, kind: hint.type };
  if (IMAGE_KEY.test(key) || (strings.length && strings.every((s) => s === '' || IMAGE_URL.test(s)) && strings.some((s) => s))) {
    return { ...field, kind: 'image' };
  }
  if (/date$/i.test(key) && strings.length && strings.every((s) => DATE.test(s))) return { ...field, kind: 'date' };
  if (strings.some((s) => s.length > 90 || s.includes('\n'))) return { ...field, kind: 'text' };
  return { ...field, kind: 'string' };
}

function inferObject(objects) {
  const keys = [];
  for (const o of objects) for (const k of Object.keys(o)) if (!keys.includes(k)) keys.push(k);
  return keys.map((k) => infer(k, objects.map((o) => o[k])));
}

// ---------- Pages CMS ----------
const PAGES_TYPE = { string: 'string', text: 'text', image: 'image', date: 'date', boolean: 'boolean', number: 'number' };
function pagesField(f) {
  const out = { name: f.name, label: f.label };
  if (f.description) out.description = f.description;
  if (f.kind === 'object') return { ...out, type: 'object', fields: f.fields.map(pagesField) };
  if (f.kind === 'list-object') return { ...out, type: 'object', list: true, fields: f.fields.map(pagesField) };
  if (f.kind === 'list-scalar') return { ...out, type: PAGES_TYPE[f.item.kind] ?? 'string', list: true };
  return { ...out, type: PAGES_TYPE[f.kind] };
}

// ---------- Sveltia CMS ----------
const SVELTIA_WIDGET = { string: 'string', text: 'text', image: 'image', boolean: 'boolean', number: 'number' };
function sveltiaField(f) {
  const out = { name: f.name, label: f.label, required: false };
  if (f.description) out.hint = f.description;
  if (f.kind === 'object') return { ...out, widget: 'object', fields: f.fields.map(sveltiaField) };
  if (f.kind === 'list-object') {
    const first =
      f.fields.find((x) => ['title', 'name', 'heading', 'label', 'question'].includes(x.name)) ?? f.fields.find((x) => x.kind === 'string');
    return { ...out, widget: 'list', ...(first ? { summary: `{{fields.${first.name}}}` } : {}), fields: f.fields.map(sveltiaField) };
  }
  if (f.kind === 'list-scalar') return { ...out, widget: 'list', field: { ...sveltiaField(f.item), name: 'item', label: 'Item' } };
  if (f.kind === 'date') return { ...out, widget: 'datetime', time_format: false, date_format: 'YYYY-MM-DD', format: 'YYYY-MM-DD' };
  return { ...out, widget: SVELTIA_WIDGET[f.kind] };
}

// ---------- tiny YAML writer (strings always double-quoted, so it is always valid) ----------
function yaml(value, indent = 0) {
  const pad = ' '.repeat(indent);
  const scalar = (v) => (typeof v === 'string' ? JSON.stringify(v) : String(v));
  if (Array.isArray(value)) {
    if (!value.length) return ' []';
    return value
      .map((v) => {
        if (v && typeof v === 'object') {
          const body = yaml(v, indent + 2).replace(/^\n/, '').slice(indent + 2);
          return `\n${pad}- ${body}`;
        }
        return `\n${pad}- ${scalar(v)}`;
      })
      .join('');
  }
  if (value && typeof value === 'object') {
    return Object.entries(value)
      .map(([k, v]) => {
        if (v && typeof v === 'object') return `\n${pad}${k}:${yaml(v, indent + 2)}`;
        return `\n${pad}${k}: ${scalar(v)}`;
      })
      .join('');
  }
  return ' ' + scalar(value);
}

// ---------- build ----------
const pagesContent = [];
const sveltiaGroups = Object.fromEntries(GROUPS.map((g) => [g.name, { name: g.name, label: g.label, files: [] }]));

for (const entry of ENTRIES) {
  const path = resolve(root, entry.file);
  if (!existsSync(path)) throw new Error(`Missing content file ${entry.file}`);
  const data = JSON.parse(readFileSync(path, 'utf8'));
  if (Array.isArray(data)) throw new Error(`${entry.file}: the top level must be an object (wrap lists as {"items": [...]})`);
  const fields = inferObject([data]).map((f) => {
    const o = entry.fields?.[f.name];
    return o ? { ...f, ...o } : f;
  });
  const descr = entry.description ? { description: entry.description } : {};
  pagesContent.push({ name: entry.name, label: entry.label, type: 'file', path: entry.file, format: 'json', ...descr, fields: fields.map(pagesField) });
  sveltiaGroups[entry.group].files.push({ name: entry.name, label: entry.label, file: entry.file, format: 'json', fields: fields.map(sveltiaField) });
}

const header = (who) => `# GENERATED by scripts/cms-config.mjs from src/content/*.json — do not edit by hand.
# Run "npm run cms:config" after adding content files or fields.
# ${who}
`;

const pagesYml =
  header('Pages CMS (https://app.pagescms.org): editor for people without a GitHub account.') +
  yaml({
    media: { input: 'public/media/uploads', output: '/media/uploads', rename: 'safe', categories: ['image', 'document'] },
    settings: { commit: { identity: 'user' } },
    content: pagesContent,
  }).replace(/^\n/, '') +
  '\n';

const sveltiaYml =
  header(`Sveltia CMS at ${SITE.url}/admin/ — editor for people with a GitHub account.\n# ${SITE.relay ? '"Sign In with GitHub" runs on our own server: public/api/auth.php + callback.php.' : 'Sign in with "Sign In Using Access Token".'}\n# Access token: fine-grained GitHub token for ${SITE.repo} (Contents: read and write).`) +
  yaml({
    site_url: SITE.url,
    ...(SITE.logo ? { logo_url: SITE.logo } : {}),
    backend: { name: 'github', repo: SITE.repo, branch: 'main', ...(SITE.relay ? { base_url: SITE.url, auth_endpoint: 'api/auth.php' } : {}) },
    media_folder: 'public/media/uploads',
    public_folder: '/media/uploads',
    collections: Object.values(sveltiaGroups).filter((g) => g.files.length),
  }).replace(/^\n/, '') +
  '\n';

const targets = [
  ['.pages.yml', pagesYml],
  ['public/admin/config.yml', sveltiaYml],
];
let stale = false;
for (const [file, text] of targets) {
  const full = resolve(root, file);
  const current = existsSync(full) ? readFileSync(full, 'utf8') : '';
  if (current === text) continue;
  if (checkOnly) {
    stale = true;
    console.error(`✗ ${file} is out of date: run "npm run cms:config"`);
  } else {
    writeFileSync(full, text);
    console.log(`✓ wrote ${file}`);
  }
}
if (checkOnly && stale) process.exit(1);
if (checkOnly) console.log('✓ editor configs are up to date');
