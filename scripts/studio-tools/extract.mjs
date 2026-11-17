// Moves client-facing text/images/links out of a React component into a JSON content file.
// Usage: node extract.mjs <component.tsx> <content.json> <importPath> [group]
//   group: optional top-level key in the JSON (for components sharing one page file)
// Rendering stays identical: JSX text is replaced by an expression with the
// exact same rendered string (React whitespace rules applied), attributes and
// style URLs are swapped for references, literal data arrays are moved whole.
import { parse } from '@babel/parser';
import traverseMod from '@babel/traverse';
import MagicString from 'magic-string';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const traverse = traverseMod.default ?? traverseMod;
const [file, jsonPath, importPath, group] = process.argv.slice(2);
const VAR = process.env.EXTRACT_VAR || 'copy';
const src = readFileSync(file, 'utf8');
const ast = parse(src, { sourceType: 'module', plugins: ['jsx', 'typescript'] });
const ms = new MagicString(src);

const content = existsSync(jsonPath) ? JSON.parse(readFileSync(jsonPath, 'utf8')) : {};
const root = group ? (content[group] ??= {}) : content;

if (VAR === 'copy' && /\bcopy\b/.test(src.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, ''))) throw new Error(`${file}: already uses the name "copy"`);

// ---------- helpers ----------
const camel = (s) => {
  const w = s.replace(/&/g, ' and ').replace(/[^A-Za-z0-9]+/g, ' ').trim().split(/\s+/).filter(Boolean).slice(0, 5);
  if (!w.length) return 'section';
  const k = w.map((x, i) => (i ? x[0].toUpperCase() + x.slice(1).toLowerCase() : x.toLowerCase())).join('');
  return /^[0-9]/.test(k) ? 's' + k : k;
};
// React/Babel JSX text whitespace rules
function cleanJSXText(value) {
  const lines = value.split(/\r\n|\n|\r/);
  let lastNonEmpty = 0;
  for (let i = 0; i < lines.length; i++) if (/[^ \t]/.test(lines[i])) lastNonEmpty = i;
  let str = '';
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isFirst = i === 0, isLast = i === lines.length - 1, isLastNonEmpty = i === lastNonEmpty;
    let t = line.replace(/\t/g, ' ');
    if (!isFirst) t = t.replace(/^[ ]+/, '');
    if (!isLast) t = t.replace(/[ ]+$/, '');
    if (t) {
      if (!isLastNonEmpty) t += ' ';
      str += t;
    }
  }
  return str;
}

// section names from JSX comments like {/* Hero Section */}
const comments = (ast.comments || [])
  .filter((c) => c.type === 'CommentBlock' && c.value.trim().length < 60 && !c.value.startsWith('*'))
  .map((c) => ({ start: c.start, name: camel(c.value.trim().replace(/^[^A-Za-z0-9]+/, '')) }));
// top-level components: used as the section name when no JSX comment applies
const funcs = [];
for (const n of ast.program.body) {
  const d = n.type === 'ExportDefaultDeclaration' || n.type === 'ExportNamedDeclaration' ? n.declaration : n;
  if (!d) continue;
  if (d.type === 'FunctionDeclaration' && d.id) funcs.push({ start: d.start, end: d.end, name: d.id.name, isDefault: n.type === 'ExportDefaultDeclaration' });
  if (d.type === 'VariableDeclaration') for (const v of d.declarations) if (v.init && /Function/.test(v.init.type) && v.id.type === 'Identifier') funcs.push({ start: v.start, end: v.end, name: v.id.name, isDefault: false });
}
const sectionAt = (pos) => {
  const fn = funcs.find((f) => f.start <= pos && pos <= f.end);
  let name = fn && !fn.isDefault && funcs.length > 1 ? camel(fn.name.replace(/([a-z])([A-Z])/g, '$1 $2')) : 'main';
  for (const c of comments) if (c.start < pos && (!fn || c.start >= fn.start)) name = c.name;
  return name;
};

const TAG_KEY = { h1: 'title', h2: 'heading', h3: 'subheading', h4: 'subheading', h5: 'smallHeading', h6: 'smallHeading', p: 'text', a: 'link', button: 'button', span: 'label', li: 'item', label: 'fieldLabel', option: 'option', strong: 'bold', em: 'emphasis', blockquote: 'quote', td: 'cell', th: 'cell', div: 'text', small: 'note', cite: 'source' };
function put(section, base, value) {
  while (section in root && (Array.isArray(root[section]) || typeof root[section] !== 'object')) section += 'Section';
  const bucket = (root[section] ??= {});
  let key = base, n = 2;
  while (key in bucket) key = base + n++;
  bucket[key] = value;
  return `${VAR}${group ? '.' + group : ''}.${section}.${key}`;
}
const isLiteralData = (node) => {
  if (!node) return false;
  switch (node.type) {
    case 'StringLiteral': case 'NumericLiteral': case 'BooleanLiteral': case 'NullLiteral': return true;
    case 'TemplateLiteral': return node.expressions.length === 0;
    case 'ArrayExpression': return node.elements.every(isLiteralData);
    case 'ObjectExpression': return node.properties.every((p) => p.type === 'ObjectProperty' && !p.computed && (p.key.type === 'Identifier' || p.key.type === 'StringLiteral') && isLiteralData(p.value));
    case 'TSAsExpression': case 'TSSatisfiesExpression': return isLiteralData(node.expression);
    default: return false;
  }
};
const toValue = (node) => {
  switch (node.type) {
    case 'StringLiteral': case 'NumericLiteral': case 'BooleanLiteral': return node.value;
    case 'NullLiteral': return null;
    case 'TemplateLiteral': return node.quasis[0].value.cooked;
    case 'ArrayExpression': return node.elements.map(toValue);
    case 'ObjectExpression': return Object.fromEntries(node.properties.map((p) => [p.key.name ?? p.key.value, toValue(p.value)]));
    case 'TSAsExpression': case 'TSSatisfiesExpression': return toValue(node.expression);
  }
};
const hasText = (arr) => JSON.stringify(arr).match(/[A-Za-z]{3,}/);

const done = new Set();
const ATTRS = new Set(['alt', 'placeholder', 'title', 'aria-label']);
let changes = 0;

traverse(ast, {
  // literal data arrays (const programs = [{ title: '...', ... }])
  VariableDeclarator(path) {
    const init = path.node.init;
    if (!init || init.type !== 'ArrayExpression' || !init.elements.length || !isLiteralData(init)) return;
    if (path.node.id.type !== 'Identifier') return;
    const value = toValue(init);
    if (!hasText(value)) return;
    let name = path.node.id.name;
    for (let n = 2; name in root; n++) name = path.node.id.name + n;
    root[name] = value;
    ms.overwrite(init.start, init.end, `${VAR}${group ? '.' + group : ''}.${name}`);
    done.add(init);
    path.skip();
    changes++;
  },
  JSXText(path) {
    const text = cleanJSXText(path.node.value);
    if (!/[A-Za-z0-9]/.test(text)) return;
    if (/^[\s:|•·\-–—/,.()&*+]*$/.test(text)) return;
    const parent = path.parentPath.node;
    const tag = parent.type === 'JSXElement' ? parent.openingElement.name.name : 'fragment';
    if (tag === 'style' || tag === 'script') return;
    const ref = put(sectionAt(path.node.start), TAG_KEY[tag] ?? 'text', text);
    // keep surrounding whitespace semantics: cleaned text already includes
    // the significant leading/trailing spaces, so a single expression is exact.
    ms.overwrite(path.node.start, path.node.end, `{${ref}}`);
    changes++;
  },
  JSXAttribute(path) {
    const name = path.node.name.name;
    const v = path.node.value;
    if (!v || v.type !== 'StringLiteral' || !v.value.trim()) return;
    const el = path.parentPath.node.name.name;
    let base = null;
    if (ATTRS.has(name)) base = name === 'alt' ? 'imageAlt' : name === 'aria-label' ? 'ariaLabel' : name;
    else if (name === 'src' && ['img', 'video', 'source', 'iframe'].includes(el)) base = el === 'img' ? 'image' : el === 'iframe' ? 'embedUrl' : 'video';
    else if (name === 'poster') base = 'videoPoster';
    else if (name === 'href' && /^(https?:|tel:|mailto:)/.test(v.value)) base = v.value.startsWith('tel:') ? 'phoneLink' : v.value.startsWith('mailto:') ? 'emailLink' : 'url';
    if (!base) return;
    const ref = put(sectionAt(path.node.start), base, v.value);
    ms.overwrite(v.start, v.end, `{${ref}}`);
    changes++;
  },
  StringLiteral(path) {
    // style={{ backgroundImage: "url('...')" }}
    const p = path.parentPath.node;
    if (p.type !== 'ObjectProperty' || (p.key.name ?? p.key.value) !== 'backgroundImage') return;
    const m = path.node.value.match(/^url\((['"]?)(.*)\1\)$/);
    if (!m) return;
    const ref = put(sectionAt(path.node.start), 'backgroundImage', m[2]);
    ms.overwrite(path.node.start, path.node.end, '`url(' + m[1] + '${' + ref + '}' + m[1] + ')`');
    changes++;
  },
});

if (!changes) {
  console.log(`${file}: nothing to extract`);
  process.exit(0);
}
// import after the last import line
const lastImport = ast.program.body.filter((n) => n.type === 'ImportDeclaration').at(-1);
const importLine = `import ${VAR} from '${importPath}';\n// Text, images and links: ${jsonPath.replace(/^.*?src\//, 'src/')} (editable in the website editors).\n`;
if (lastImport) ms.appendLeft(lastImport.end, '\n' + importLine.trimEnd());
else ms.prepend(importLine);

writeFileSync(file, ms.toString());
writeFileSync(jsonPath, JSON.stringify(content, null, 2) + '\n');
console.log(`${file}: ${changes} item(s) moved → ${jsonPath}${group ? ' [' + group + ']' : ''}`);
