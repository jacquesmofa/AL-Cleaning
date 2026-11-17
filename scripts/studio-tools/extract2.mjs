// Second pass after extract.mjs: moves (1) inline literal lists in JSX ({[ {...}, ... ].map(...)})
// and (2) background pictures written as `url('...')` into the page's JSON content file.
// Usage: node extract2.mjs <file.tsx> <content.json> <importVar>
import fs from 'fs';
import { parse } from '@babel/parser';
import traverseMod from '@babel/traverse';
import MagicString from 'magic-string';
const traverse = traverseMod.default ?? traverseMod;
const [file, jsonFile, v] = process.argv.slice(2);
const code = fs.readFileSync(file, 'utf8');
const data = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
const ast = parse(code, { sourceType: 'module', plugins: ['jsx', 'typescript'] });
const ms = new MagicString(code);
const lit = (n) => {
  if (n.type === 'StringLiteral' || n.type === 'NumericLiteral' || n.type === 'BooleanLiteral') return [true, n.value];
  if (n.type === 'TemplateLiteral' && n.expressions.length === 0) return [true, n.quasis[0].value.cooked];
  if (n.type === 'ArrayExpression') { const out = []; for (const e of n.elements) { const [ok, val] = lit(e); if (!ok) return [false]; out.push(val); } return [true, out]; }
  if (n.type === 'ObjectExpression') { const o = {}; for (const p of n.properties) { if (p.type !== 'ObjectProperty' || p.computed) return [false]; const k = p.key.name ?? p.key.value; const [ok, val] = lit(p.value); if (!ok) return [false]; o[k] = val; } return [true, o]; }
  return [false];
};
const uniq = (base) => { let k = base, i = 2; while (k in data) k = base + i++; return k; };
const camel = (s) => s.replace(/[^A-Za-z0-9]+(.)/g, (_, c) => c.toUpperCase()).replace(/^[A-Z]/, (c) => c.toLowerCase());
let n = 0;
traverse(ast, {
  CallExpression(p) {
    const c = p.node.callee;
    if (c.type !== 'MemberExpression' || c.property.name !== 'map' || c.object.type !== 'ArrayExpression') return;
    if (!p.findParent((q) => q.isJSXExpressionContainer())) return;
    const [ok, val] = lit(c.object);
    if (!ok || !val.length) return;
    // name from the item variable of the .map callback, e.g. (program) => ... → programs
    const fn = p.node.arguments[0]; const item = fn?.params?.[0]?.name || 'item';
    const key = uniq(camel(item.endsWith('s') ? item + 'List' : item + 's'));
    data[key] = val; ms.overwrite(c.object.start, c.object.end, `${v}.${key}`); n++;
  },
  ObjectProperty(p) {
    if ((p.node.key.name ?? p.node.key.value) !== 'backgroundImage') return;
    const t = p.node.value;
    if (t.type !== 'TemplateLiteral' || t.expressions.length) return;
    const m = t.quasis[0].value.cooked.match(/^url\((['"]?)(.+)\1\)$/);
    if (!m) return;
    const key = uniq('heroBackgroundImage');
    data[key] = m[2]; ms.overwrite(t.start, t.end, '`url(\'${' + v + '.' + key + '}\')`'); n++;
  },
});
fs.writeFileSync(file, ms.toString());
fs.writeFileSync(jsonFile, JSON.stringify(data, null, 2) + '\n');
console.log(`${file}: ${n} more item(s) moved → ${jsonFile}`);
