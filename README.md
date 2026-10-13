# Thai Spa — thaispas.pk
okkk new 
#2026@vercelpro_push_main_undone
React + Vite site, every page pre-rendered to static HTML (vite-react-ssg). You never edit page code to change
facts: everything lives in `src/data/`.

## Run it

```bash
npm install        # once
npm run dev        # live preview at http://localhost:5180
npm run build      # builds the real site into dist/ (also writes sitemap.xml)
npm run check      # audits the built pages: titles, meta, headings, JSON-LD, images
npm run links      # checks every internal link, image and #anchor for breakage
npm run meta       # lists every page's title and meta description, flags duplicates
npm run verify     # build + check + links in one go. Run this before every deploy
```

Speed notes: phones and tablets load no animation library at all (GSAP and Lenis load on desktop only), the
intro animation plays once per visit on desktop, and `public/_headers` makes images and scripts cache for repeat
visits.

## Change a price
Open `src/data/services.js`.
- The seven full-body massages share `fullBodyRates` at the top. Change a number there and all seven pages, the
  prices page, the schema markup and the blog text update together.
- Targeted treatments (Head & Shoulder, Back & Neck, Foot) have their own `rates` lines further down.
- Then open `src/data/business.js` and change `pricesUpdated` to today's date. Run `npm run build`.

## Change the phone number, WhatsApp, address or hours
Open `src/data/business.js`: `phone`, `phoneHref`, `whatsapp` (digits only, with country code), `address`, `hours`.
Every page, the footer, the buttons and the schema read from there. Also fill in `geo` (exact latitude/longitude from
Google Maps), `email`, and `social` links when you have them.

## Add or change a blog post
1. Copy any file in `src/data/blog/` to a new name, e.g. `my-new-post.js`. Change `slug`, `title`, `description`,
   `datePublished`, `image` (a name from `src/data/images.js`) and the `blocks`.
2. Block types: `h2`, `h3`, `p`, `ul` (list of strings), `callout`.
   Links inside text: `[label](/services/thai-massage)`. Live prices: `{{price:back-neck-massage:30}}`.
3. Add it to the list in `src/data/blog/index.js`. Build. It appears on the blog page and in the sitemap by itself.

## Run a limited-time offer
Open `src/data/offers.js` and add an offer to the `offers` list (instructions are in the file). The offer card with a
live countdown appears on the homepage until the end date, then disappears. Only add offers you will honour.
While the list is empty nothing is shown on the live site (in `npm run dev` you see two DEMO cards).

## Change photos
Photos are in `public/images/`. Replace a file with a new one of the same name (WebP, under 200 KB). Alt texts are
in `src/data/images.js`. To process new PNGs in one go see `scripts/process-images.mjs`.

## Team, reviews, policies
- `src/data/team.js` — add real staff only (names, training, years). Empty on purpose.
- `src/data/testimonials.js` — real client reviews only, with permission.
- `src/data/business.js` → `policies` — tax, cancellation, tipping, walk-ins. Until filled, the prices page says
  "please ask when you book".

## Optional settings
Copy `.env.example` to `.env.local`: `VITE_GA_ID` (Google Analytics 4) and `VITE_FORM_ENDPOINT` (emails contact-form
bookings). Both are off unless set.

## Rules this site follows
No invented therapists, credentials, review counts, founding years or awards. No clinical language: massage eases
muscle tension and stiffness. No `AggregateRating` or `Review` schema. No per-area landing pages (doorway pages).
