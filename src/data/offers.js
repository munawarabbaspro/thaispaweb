// Time-limited offers. Each one shows a live countdown to its end date and disappears
// by itself when the date passes.
//
// TODO owner: add ONLY real offers you will honour at the counter.
//   { id, badge, title, text, slug, minutes, dealPrice, endsAt, terms }
//   - slug / minutes pick the treatment; its normal price is read from services.js
//   - dealPrice is the offer price in PKR (must be lower than the normal price)
//   - endsAt is a real end date, e.g. '2026-10-31T20:00:00+05:00'
//   - never use a countdown that resets for every visitor: that is a fake deadline
export const offers = [
  {
    id: 'head-shoulder-30',
    badge: '7 days only',
    title: 'Head & Shoulder, thirty minutes',
    text: 'Our short neck, shoulder and scalp session at a lower price this week. Neck work is included.',
    slug: 'head-shoulder-massage',
    minutes: 30,
    dealPrice: 2500,
    endsAt: '2026-10-15T20:00:00+05:00',
    terms: 'Offer price valid until the date shown.',
  },
]

// Preview only (npm run dev, and only while `offers` above is empty): DEMO cards so you can see the design.
export const demoOffers = () => {
  const day = 24 * 3600 * 1000
  return [
    {
      id: 'demo-reset',
      demo: true,
      badge: 'This week',
      title: 'The 30-minute reset',
      text: 'Back & neck, short and focused. A first visit that fits a lunch break.',
      slug: 'back-neck-massage',
      minutes: 30,
      dealPrice: 2000,
      endsAt: new Date(Date.now() + 3 * day + 4 * 3600 * 1000).toISOString(),
      terms: 'Demo card, not a real offer.',
    },
  ]
}
