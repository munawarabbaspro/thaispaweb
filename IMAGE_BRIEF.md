# Thai Spa — image bundle brief

Drop finished files in a folder called `images-to-add/` using EXACTLY the filenames below, then tell Claude
"images are in images-to-add". Claude will resize them, convert to WebP (<200 KB), move them to `public/images/`,
add alt text and wire every slot. You do not need to touch code.

## Rules for every image
- Look: bright, airy, clean, cool daylight. Pale white-blue / soft grey backgrounds (the site is light blue-white,
  and many slots fade into the page background). Accents of teal/blue, white linen, smooth dark stones, clear oil.
- NO faces. Crops of hands, backs, shoulders, feet, towels, stones, oils, candles, linen. Client always covered with a towel.
- No text, logos, watermarks, hands with extra fingers. Same lighting and colour grade across the whole set.
- Generate or shoot at the "Generate at" size (2x), Claude shrinks it. Landscape unless noted.
- REAL beats AI for: the actual rooms, reception, building entrance, team. Use your phone for those (see "Real photos").
  AI is fine for mood close-ups (hands, oils, stones, linen). Do not use AI pictures of "our rooms" or "our therapists":
  customers will compare them with reality and Google Business Profile removes misleading photos.

## Slots (14 for the homepage, 10 for the services pages)

| # | Filename | Where it appears | Generate at | Subject |
|---|---|---|---|---|
| 1 | `hero.webp` | Homepage hero, full right side, fades to white on the left | 2400x1500 | Therapist hands working on a shoulder, towel-covered client, soft window light, subject on the RIGHT, empty pale space on the left |
| 2 | `premium.webp` | "Treatments chosen by what's wrong" | 1650x1140 | Wide calm treatment room: bed with white linen, folded towels, stones, plant; no people |
| 3 | `instant.webp` | "Instantly booked" | 1650x1200 | Hand holding a phone with a blank chat screen next to a towel and oil bottle (flat-lay, pale background) |
| 4 | `luxury.webp` | Big stage image behind the word RELIEF | 2100x1050 | Row of smooth dark basalt stones on white linen, tiny steam, very wide, bright |
| 5 | `problem-shoulders.webp` | Card "Stiff shoulders" | 1350x900 | Close crop of a bare shoulder and neck, hands pressing, towel at the edge |
| 6 | `problem-back.webp` | Card "Aching back" | 1350x900 | Close crop of a lower/upper back with hands applying oil |
| 7 | `problem-sleep.webp` | Card "Restless sleep" | 1350x900 | Pillow, lavender sprigs, aroma oil bottle, dim warm-cool light, no face |
| 8 | `problem-legs.webp` | Card "Tired legs" | 1350x900 | Close crop of feet and ankles on a towel, hands massaging |
| 9 | `tile-back-neck.webp` | Short sessions tile | 1080x690 | Hands on upper back and neck, tight crop |
| 10 | `tile-foot.webp` | Short sessions tile | 1080x690 | Foot massage, hands, oil, towel |
| 11 | `tile-head-shoulder.webp` | Short sessions tile | 1080x690 | Hands on shoulders and base of neck from behind |
| 12 | `feature-wide.webp` | "Thirty minutes to start" card | 1200x840 | Wall clock or sand timer beside towel and oil, pale |
| 13 | `feature-back-neck.webp` | Blue "Back & neck" card (fades up from bottom) | 1050x780 | Back and neck close crop, white-blue tone |
| 14 | `feature-week.webp` | "7 days" card | 1050x720 | Calendar or appointment book flat-lay with towel and stone |

Services pages (one hero each, also used as the card image): size 2400x1500, filename = service slug:
`thai-massage.webp`, `deep-tissue-massage.webp`, `swedish-massage.webp`, `aromatherapy-massage.webp`,
`hot-stone-massage.webp`, `sports-massage.webp`, `full-body-massage.webp`, `head-shoulder-massage.webp`,
`back-neck-massage.webp`, `foot-massage.webp`.

Share image: `og-thai-spa.jpg`, 1200x630 (logo "ThaiSpa" on pale blue + one stone photo). Claude can build this one.

## Master prompt (paste first, in ONE chat, so the style stays consistent)

> I need a consistent set of photographs for a massage spa website. Style: bright airy lifestyle photography, soft
> natural window light, pale white and very light blue background, smooth dark basalt stones, white cotton linen,
> clear massage oil, subtle teal accents, shallow depth of field, 85mm lens, clean modern premium look, cool colour
> grade. Strict rules: never show faces, client is always covered with a towel, no text, no logos, no watermark,
> natural hands with five fingers, no jewellery. Confirm you understand, then I will ask for images one by one.
> Keep this exact style for every image.

Then, one message per slot:

> Image <number>: <Subject column>. Aspect ratio <e.g. 16:10>. Same style as above.

Ratios: hero 16:10 · premium 1.45:1 · instant 1.4:1 · luxury 2:1 · problem cards and tiles 3:2 · features 1.4:1.

Per-image prompt lines (add after "Image N:"):
1. Close photo of a therapist's hands massaging a shoulder of a client covered with a white towel, subject on the right third, left half is empty pale white-blue space, soft window light.
2. Calm empty massage room, white linen bed, folded towels, dark stones on a tray, small green plant, large window light, symmetrical.
3. Flat-lay on a pale surface: smartphone with a blank chat screen, folded white towel, clear oil bottle, a dark stone, top view.
4. Wide panoramic row of five smooth dark basalt stones stacked and spaced on white linen, a little steam, bright high-key.
5. Tight crop of a bare shoulder and neck with two hands applying pressure, towel edge visible, no face.
6. Tight crop of a bare back with hands spreading clear oil, towel at the hips, no face.
7. Still life: white pillow, sprigs of lavender, a small glass aroma oil bottle, soft cool light, no people.
8. Tight crop of a client's feet resting on a white towel, therapist hands massaging the ankle, no faces.
9. Hands working the upper back and neck, tight crop, towel-covered client, high-key.
10. Foot massage close-up, thumbs pressing the sole, oil sheen, white towel, high-key.
11. View from behind of hands on shoulders and the base of the neck, towel-covered client, high-key.
12. Minimal still life: a small sand timer beside a folded towel and a dark stone on pale background.
13. Back and neck close crop with a cool blue-white tone, soft shadows, towel edge.
14. Flat-lay of a paper appointment book and pen next to a folded towel and a dark stone, pale background.

Service heroes (16:10): same style, subject per treatment: Thai (clothed client in loose cotton wear, therapist leaning to stretch a leg, no face);
Deep tissue (forearm pressing a back, towel); Swedish (long gliding strokes on a back with oil); Aromatherapy (diffuser, lavender, oil dropper, bed);
Hot stone (warm stones on a towel-covered back, steam); Sports (hands on a calf or hamstring, athletic towel); Full body (calm room with bed and oil, hands on back);
Head & shoulder (hands on shoulders from behind); Back & neck (hands on neck and upper back); Foot (hands on a foot).

## Which tool
No single site makes the whole site-ready bundle. Use ONE of these for all images in one chat so they match:
ChatGPT (image generation), Google Gemini (Nano Banana / Imagen), Midjourney, Adobe Firefly, Ideogram.
Claude cannot generate photographs; Claude resizes, compresses, names, places and writes alt text.

## Real photos (do these with your phone, 30 minutes)
Entrance and signboard (also needed for Google Business Profile), reception, each room with bed made, towels and oils
on the shelf, the stones, parking. Landscape, daylight, wipe surfaces first. Put in `images-to-add/real/`.
Google Business Profile needs 15+ real photos anyway.
