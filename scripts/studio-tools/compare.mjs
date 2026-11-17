// Usage: node compare.mjs before.json after.json  -> prints differences per route
import { readFileSync } from 'node:fs';
const [a, b] = process.argv.slice(2).map((f) => JSON.parse(readFileSync(f, 'utf8')));
let diffs = 0;
for (const route of Object.keys(a)) {
  for (const key of ['title', 'text', 'all', 'imgs', 'bgs', 'links', 'videos']) {
    const x = JSON.stringify(a[route]?.[key]);
    const y = JSON.stringify(b[route]?.[key]);
    if (x !== y) {
      diffs++;
      const xa = [].concat(a[route]?.[key] ?? []);
      const ya = [].concat(b[route]?.[key] ?? []);
      const removed = xa.filter((v) => !ya.includes(v));
      const added = ya.filter((v) => !xa.includes(v));
      console.log(`\n✗ ${route} ${key}: ${xa.length} → ${ya.length} items`);
      removed.slice(0, 8).forEach((v) => console.log('   - ' + String(v).slice(0, 160)));
      added.slice(0, 8).forEach((v) => console.log('   + ' + String(v).slice(0, 160)));
      if (!removed.length && !added.length) console.log('   (same items, different order)');
    }
  }
}
console.log(diffs ? `\n${diffs} difference(s)` : 'IDENTICAL: every route matches');
process.exit(diffs ? 1 : 0);
