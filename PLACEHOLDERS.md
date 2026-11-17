# PLACEHOLDERS: AL Cleaning Pro (alcleaningpro.ca)

Everything here is unconfirmed or temporary. Ask the client; do not invent.

## To confirm with the client (important)
- **"5.0 Rating (500+ Reviews)"** (home page) and **"5.0 Average Rating across 500+ verified reviews"** (Reviews page): where are these reviews (Google? HomeStars?) and is the number real? If not, the text must change. The same claim was removed from the hidden Google data (structured data) on 17 Nov 2026, because Google penalises ratings it cannot verify.
- **Reviews on the Reviews page** (`src/mocks/home.ts`, `reviews`): "OA (Orenda Automation Tech)", "Sarah M.", "James & Priya K.", "Linda T.", "Marcus D.", "Amanda R.", "David H.". Which are real customers who agreed to be quoted? Remove the others.
- **"Fully Insured"**, **"We re-clean within 24h for free"**: confirm both promises.
- **Our work / before-after gallery** (`workGallery`): the pictures are AI-made, shown as real jobs in named cities. Replace with real job photos or remove.
- **About page team photo**: AI-made picture captioned "AL Cleaning Pro family team". Needs a real photo.
- **Social links** (Facebook, Instagram, TikTok, X, LinkedIn `…/Alcleaningpro`): confirm each account exists.
- **Logo**: no logo file in the project. The browser icon and share picture use an "AL" monogram in the site's blue until the real logo arrives.

## Forms
- Contact form and "Leave a review" form still post to Readdy (`readdy.ai/api/form/...`): messages may never reach the client. Move to Web3Forms with a key created for the client's email (Jacques creates the key; never paste a password in chat), then test that a message arrives.
- Online payment (Stripe code in `CheckoutModal.tsx`): not verified as connected. Do not tell anyone payments work.

## Pictures
- 29 AI placeholder pictures (`readdy.ai/api/search-image`) remain across the site.

## Editors
- Google and sharing texts are in `src/content/seo.json`. Everything (wording EN/FR, services, reviews, prices, pictures) is editable in both editors since 17 Nov 2026.
