# Thai Spa — thaispa.pk

A massage spa in Civic Center, Bahria Town Phase 4, Islamabad. The site's job is
phone calls and WhatsApp bookings from people searching locally.

## Source documents

- `THAISPAS_MASTER_BRIEF.md` — the full spec. Sections 4, 5 and 6 (pages, schema,
  technical SEO) are authoritative. Read the relevant section before building a page.
- `reference/thaispa-3d.html` — a working single-file implementation of the homepage:
  the WebGL stone stage, the interactive body map, the scroll reveals and the palette.
  **Port from this file. Do not reinvent it.**

### Design direction (supersedes the brief's section 3 and 4.1, and the earlier jade/amber/WebGL plan)

The owner chose to replicate the **DriveLuxe "Crystal" layout** (https://driveluxeisb.netlify.app/) exactly:
light blue glass theme, Sora + Inter, blue gradient accent (`--grad`), glass nav pill, hero + quick-book
form, brand marquee, pinned scroll scenes, bento "why" grid, card-zoom features scene, FAQ, floating
WhatsApp button and mobile quick-action pill. GSAP + ScrollTrigger + Lenis drive the motion.
CSS lives in `src/styles/site.css`, `pages.css`, `extra.css` (ported, tokens are CSS variables).
Content is Thai Spa's own; images are NOT reused — photo slots draw a contour graphic via `<Media>`
until real photographs are supplied. The old jade/amber palette, amber-only-for-buttons rule and the
WebGL stage / body map are dropped. Everything else in the brief (services, prices, titles, meta,
schema, technical SEO, blog plan) stands.

## Stack

React 18 + Vite (JavaScript, not TypeScript) · Tailwind 3 · react-router-dom v6 ·
react-helmet-async (via `Head` from vite-react-ssg, which bundles it) · **vite-react-ssg** ·
three + @react-three/fiber + @react-three/drei · gsap (ScrollTrigger) · lenis · lucide-react

No jQuery, no Bootstrap, no Webflow, no component library. (GSAP is now allowed.)

## Single source of truth

All business facts live in `src/data/business.js`. All services in
`src/data/services.js`. All posts in `src/data/blog/`. Nothing is hardcoded in a
component — changing a price in one file must update the page, the price table and
the JSON-LD together.

Business data:
- Phone and WhatsApp: `+92 347 3200319`
- Address: Civic Center, Bahria Town Phase 4, Islamabad, near Anarkali Hotel
- Hours: Mon–Fri 9am–8pm, Sat–Sun 10am–9pm
- `geo` lat/lng: null — the owner supplies these. Leave a TODO, do not invent them.

Full-body treatments (all seven share one rate card):
30 min Rs 3,500 · 40 min Rs 4,000 · 60 min Rs 5,500 · 90 min Rs 8,000
Thai · Deep Tissue · Swedish · Aromatherapy · Hot Stone · Sports · Full Body Oil

Targeted treatments:
- Head & Shoulder — 30/3,000 · 40/3,500 · 60/5,000 · 90/7,000
- Back & Neck — 30/2,500 · 40/3,000 · 60/4,000
- Foot Massage — 30/2,500 · 40/3,500

## Design tokens

See `:root` in `src/styles/site.css`: --bg #f6fafd, --bg-2 #ecf4fa, --ink #0b1e33, --accent #0a79ad,
--accent-2 #2459d8, --grad blue gradient, --wa #25d366. Display font Sora, body Inter, Urdu Noto Nastaliq
Urdu (`dir="rtl" lang="ur"`, never uppercase).

## Hard rules — do not break these without asking

1. (Retired with the jade/amber palette.) Keep WhatsApp green only on WhatsApp actions.
3. Every route must pre-render to static HTML. After any build, confirm the body text
   is present in the HTML file, not injected by JS.
4. No `AggregateRating` or `Review` schema.
5. Invent nothing. No therapist names, qualifications, review counts, founding years,
   awards or star ratings. Where a fact is missing, write a `TODO:` comment.
6. No clinical language. Massage, not physiotherapy. "Eases muscle tension and
   stiffness" is the register.
7. The DriveLuxe-style intro (name types in the centre, flies to the header logo) is ON by request, home page only, skipped under reduced motion, with a CSS failsafe so it can never trap the page.
8. Lenis is disabled below 768px and under `prefers-reduced-motion`. It must never
   break keyboard tabbing or in-page anchors.
9. No per-area pages ("Massage in Phase 5", "DHA"). Doorway pages.
10. (Relaxed by the owner: text reveals are part of the replicated design.)
11. No numbered markers on non-sequences. The five session stages are a real sequence
    and are numbered. The four problem cards are not.

## Commands

```bash
npm run dev        # dev server
npm run build      # must pass with no errors before any phase is called done
npm run preview    # serve the built output
```

## Definition of done for every phase

- `npm run build` completes with no errors and no console warnings
- Built HTML for each new route contains its visible body text
- Works at 360px, 768px, 1024px and 1440px with no horizontal scroll
- Keyboard reaches every control with a visible focus ring
