# CLAUDE.md: AL Cleaning Pro

Family-owned home cleaning in Brampton and the GTA (residential, deep, move-in/out, office, Airbnb, post-construction).

- Live domain: alcleaningpro.ca (found in code; confirm)
- Host: ❓ (FTP workflow exists; host not recorded)
- Design and audience: see `brand-dna.md`. Placeholders: `PLACEHOLDERS.md` (create it when you find one).

## Studio rules (Jacques' web studio: apply to every task)
- This site must look custom-made for this client, never like a template. Never reuse another client's palette, font pairing, layout rhythm or signature element. No generic AI layout (centered hero + 3 icon cards + testimonial slider + CTA band) unless Jacques asks for it.
- Read `brand-dna.md` in this repo before any design or content change. Items marked ❓ are not confirmed: ask, don't invent.
- Real copy and real photos only. Never invent reviews, testimonials, statistics, people or partner logos. Every placeholder goes in `PLACEHOLDERS.md`.
- Done means: `npm ci && npm run build` passes, you checked desktop and mobile yourself, alt text, AA contrast, page titles/descriptions, compressed images.
- Push to the deploy branch only after the build passes and the change is verified (pushing deploys the live site). Never commit secrets.
- Report to Jacques in plain language, no jargon, with the live link. Anything he must do himself (secrets, DNS, accounts): click-by-click steps.
- Studio stack (zero recurring cost): client's own host via GitHub Actions FTP deploy; Cloudflare free in front; images in Cloudinary or the repo; video on YouTube or Mux (store the public Playback ID, never the Asset ID); forms via Web3Forms; editing via Pages CMS + Sveltia at `/admin`. No Vercel Hobby or Netlify for client sites.

## Stack and build
- Originally a Readdy export: Vite + React + TypeScript + Tailwind + React Router, i18next installed.
- Install and build: `npm ci && npm run build` (`vite build && node scripts/social-pages.mjs`) → output in `dist/`.
- Dev preview: `npm run dev`.
- Routes: `/`, `/about`, `/areas`, `/areas/:cityId`, `/contact`, `/quote`, `/reviews`, `/services`, `/services/:serviceId`.

## Deploy
- No passwords, no FTP (17 Nov 2026). `.github/workflows/deploy.yml`: push to `main` → `npm ci && npm run build` → the built site (`dist/`) is saved to the `live` branch → Hostinger pulls that branch (hPanel > alcleaningpro.ca > Advanced > Git, branch `live`, Auto deployment webhook) → the workflow checks alcleaningpro.ca shows the new build.
- Never edit the `live` branch by hand: it is rewritten on every publish. `public/.htaccess` carries the server rules (https, clean addresses, per-page files, SPA fallback, caching). If Hostinger misses a publish, the workflow nudges it up to twice (empty commit on `live`).

## Where things live
- Pages: `src/pages/<page>/` (one folder per page, sections in `components/`). Routes: `src/router/`.
- Text, images and links are mostly hard-coded inside the page components (`src/pages/<page>/components/*.tsx`) and in `src/mocks/`.
- Next studio step for this site: move client-facing content into `src/content/*.json` and wire up both editors (Pages CMS + Sveltia at `/admin`), exactly like `jacquesmofa/CAWAP` (see its CLAUDE.md and `scripts/studio-tools/` for `extract.mjs`, `snapshot.mjs`, `compare.mjs`). Verify with before/after snapshots that visitors see no change.

## Known issues (found 10 Nov 2026)
- 29 Readdy AI placeholder image URLs (`readdy.ai/api/search-image`) are still in the code. Replace them with real photos and track the rest in `PLACEHOLDERS.md`.
- Some forms post to Readdy's form service (`readdy.ai/api/form`). Move them to Web3Forms with the client's email (studio standard) and test that a message actually arrives.
- Stripe/checkout code exists: check whether it is actually connected before telling anyone that payments work.
- Build output is `dist/` here (not `out/`).
- Design overlap with other clients: Blue + green is the default 'cleaning company' look; Sparkle Empire (another cleaning client) uses blue + teal. These two must look clearly different.

- 17 Nov 2026: Hostinger (hPanel > alcleaningpro.ca > Advanced > Git) is connected to the `live` branch with Auto-deployment on. First automatic publish verified the same day.

## SEO and icons (17 Nov 2026)
- `src/content/seo.json`: title and description for all 20 addresses (7 pages, 6 services, 7 cities). `SeoSync.tsx` applies it in the browser; `scripts/social-pages.mjs` writes one HTML file per address plus `sitemap.xml`. New service or city: add its line to `seo.json`.
- Icons (`public/favicon.ico`, `icon-*.png`, `apple-touch-icon.png`) and share picture (`public/media/share.jpg`) are an "AL" monogram in the site's blue: replace when the real logo arrives.
- The unverified "5.0 / 500 reviews" rating was removed from the structured data in `index.html`. The same claim is still visible on the pages: see `PLACEHOLDERS.md` (ask the client).

## Editors (17 Nov 2026)
- Pages CMS (`.pages.yml`) and Sveltia (`public/admin/`, https://alcleaningpro.ca/admin/) edit `src/content/seo.json` only. BOTH GENERATED: `npm run cms:config` + `scripts/cms-registry.mjs`; `npm run cms:check`. Sveltia sign-in: "Sign In Using Access Token" only.
- Not yet editable: page text (`src/i18n/local/*/translation.ts`, `src/mocks/home.ts`). Next step: move it to `src/content/` (LDII is the model), after the client answers the questions in PLACEHOLDERS.md.
