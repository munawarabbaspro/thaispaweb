# Launching thaispas.pk

## Before you deploy (owner to-do)
- [ ] Exact Google Maps pin: fill `geo` and `social.googleMaps` in `src/data/business.js`
- [ ] Confirm `+92 347 3200319` is on WhatsApp; create `info@thaispas.pk` or change `email`
- [ ] Fill `policies` (tax, cancellation, tipping, walk-ins) in `business.js`
- [ ] Real staff in `src/data/team.js` (or leave empty)
- [ ] Take real photos of the entrance, reception, rooms (see IMAGE_BRIEF.md) for the Google profile
- [ ] Use ONE spelling everywhere: **Thai Spa** (your printed menu says "Thia SPA", fix it)
- [ ] Merge "Head & Shoulder" and "Head, Neck & Shoulder" on the printed menu; describe "Full Body Massage"
- [ ] `npm run build` then `npm run check` must both pass

## Deploy (Netlify, simplest)
1. Create a free account at netlify.com, then Add new site, Deploy manually (or connect a GitHub repo).
2. Build command `npm run build`, publish directory `dist`. (Or drag the built `dist` folder in.)
3. Domain settings, Add custom domain `thaispas.pk`. At your domain registrar set the DNS records Netlify shows
   (an A record for the root domain and a CNAME for `www`). HTTPS is issued automatically within minutes.
4. Make `https://thaispas.pk` the primary domain and redirect `www` to it.

Vercel works the same way (Framework: Vite, build `npm run build`, output `dist`).

The build also writes `dist/_redirects` and ships `public/_headers` and `netlify.toml`, so Netlify serves each page at
one URL (`/services`, never `/services/`) and caches images and scripts. `vercel.json` does the same on Vercel.

## First five minutes after going live
- [ ] Open `https://thaispas.pk`, `/services`, `/prices`, `/contact` and a blog post on your phone, on mobile data
- [ ] Tap Call and WhatsApp from the bottom bar; submit the contact form once to see WhatsApp open
- [ ] `https://thaispas.pk/sitemap.xml` and `/robots.txt` open
- [ ] `https://www.thaispas.pk` redirects to `https://thaispas.pk`
- [ ] A made-up address such as `/nothing-here` shows the "page not found" page

## After it is live
1. Search Console (search.google.com/search-console): add the property `thaispas.pk`, verify via DNS, then
   Sitemaps, submit `https://thaispas.pk/sitemap.xml`.
2. Run two pages through Google's Rich Results Test and the URL Inspection tool: `/` and `/services/thai-massage`.
3. Optional: set `VITE_GA_ID` for Google Analytics and `VITE_FORM_ENDPOINT` for emailed bookings, then rebuild.

## Google Business Profile checklist (do this first, it matters most)
- [ ] Business name exactly **Thai Spa** (no keywords added)
- [ ] Primary category **Massage spa**
- [ ] Address and phone identical to the website: Civic Center, Bahria Town Phase 4, near Anarkali Hotel, +92 347 3200319
- [ ] Opening hours: Mon to Fri 9am to 8pm, Sat and Sun 10am to 9pm
- [ ] Website link `https://thaispas.pk`
- [ ] 15+ real photos (entrance, reception, rooms, linen, oils, stones). No stock, no AI pictures of the premises
- [ ] Services with prices, copied from the website price list
- [ ] Ask every happy client for a review (see below)

Reviews: after a good session, send the client your review link on WhatsApp the same evening with one friendly
sentence. Ask everyone, never offer rewards for reviews, reply to every review, and answer bad ones calmly.

**Note:** in the first six months the Google Business Profile will bring more phone calls than the website. The
site's early job is to make the profile credible and to answer the questions that stop someone from calling.
