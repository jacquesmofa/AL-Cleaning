# Studio tools (development only, not part of the site build)

Reusable on any Readdy/Vite React site. They were used to make CAWAP editable on 10 Nov 2026 without changing how a single page looks.

| Tool | What it does |
| --- | --- |
| `extract.mjs` | Moves visible text, image URLs, external links (http/tel/mailto), alt/title/placeholder/aria-label and literal data lists out of a component into a JSON content file, replacing them with references. React's JSX whitespace rules are applied, so the rendered text is identical. |
| `snapshot.mjs` | Serves a built site, opens every route in headless Chrome (time and randomness frozen, outside network blocked), and records visible text, images, background images, links and videos, plus the hover/mobile menus. |
| `compare.mjs` | Compares two snapshots and lists every difference per route. |

## Workflow

```bash
# once, outside the repo
mkdir -p ~/tools && cd ~/tools && npm init -y && npm i playwright-core @babel/parser @babel/traverse magic-string
cp <repo>/scripts/studio-tools/*.mjs ~/tools/

# 1. baseline
cd <repo> && npm run build && cp -r out /tmp/baseline-out
node ~/tools/snapshot.mjs /tmp/baseline-out ~/tools/before.json

# 2. extract (one component at a time; optional 4th arg = group key when several components share one file)
node ~/tools/extract.mjs src/pages/about/page.tsx src/content/pages/about.json ../../content/pages/about.json

# 3. register the file in scripts/cms-registry.mjs, then
npm run cms:config && npm run build
node ~/tools/snapshot.mjs out ~/tools/after.json
node ~/tools/compare.mjs ~/tools/before.json ~/tools/after.json   # must print IDENTICAL
```

`snapshot.mjs` lists the routes at the top of the file and expects Chrome at `/usr/bin/google-chrome`; adjust both for another site.

`extract2.mjs` (17 Nov 2026): second pass for lists written inside JSX (`{[ {...} ].map(...)}`) and `backgroundImage: url(...)`. Usage: `node extract2.mjs <page.tsx> <content.json> <importVar>`. `snapshot.mjs` reads the route list from the `ROUTES` environment variable (comma-separated).
