// Single source of truth for treatments and prices (PKR).
// Change a number here and the page, the price tables and the JSON-LD all update.

// All seven full-body treatments share this rate card.
export const fullBodyRates = [
  { minutes: 30, price: 3500 },
  { minutes: 40, price: 4000 },
  { minutes: 60, price: 5500 },
  { minutes: 90, price: 8000 },
]

export const services = [
  // ---- Group 1: full-body treatments (shared rates) ----
  {
    slug: 'thai-massage',
    group: 'full',
    name: 'Thai Massage',
    urdu: 'تھائی مساج',
    bestFor: 'Stiffness, tight hips and hamstrings, low energy',
    rates: fullBodyRates,
  },
  {
    slug: 'deep-tissue-massage',
    group: 'full',
    name: 'Deep Tissue Massage',
    urdu: 'ڈیپ ٹشو مساج',
    bestFor: 'Chronic knots, desk-job shoulders, gym soreness',
    rates: fullBodyRates,
  },
  {
    slug: 'swedish-massage',
    group: 'full',
    name: 'Swedish Relaxing Massage',
    urdu: 'سویڈش مساج',
    bestFor: 'First-timers, general tension, winding down',
    rates: fullBodyRates,
  },
  {
    slug: 'aromatherapy-massage',
    group: 'full',
    name: 'Aromatherapy Massage',
    urdu: 'آروماتھراپی مساج',
    bestFor: 'Stress, tension headaches, poor sleep',
    rates: fullBodyRates,
  },
  {
    slug: 'hot-stone-massage',
    group: 'full',
    name: 'Hot Stone Massage',
    urdu: 'ہاٹ اسٹون مساج',
    bestFor: 'Deep cold-weather stiffness, muscles slow to release',
    rates: fullBodyRates,
  },
  {
    slug: 'sports-massage',
    group: 'full',
    name: 'Sports Massage',
    urdu: 'اسپورٹس مساج',
    bestFor: 'Training recovery, tight hamstrings, pre-event',
    rates: fullBodyRates,
  },
  {
    slug: 'full-body-massage',
    group: 'full',
    name: 'Full Body Massage',
    urdu: 'فل باڈی مساج',
    bestFor: "The standard oil massage — the default if you're unsure",
    rates: fullBodyRates,
  },

  // ---- Group 2: targeted treatments (own rates) ----
  // "Head, Neck & Shoulder" from the printed menu is merged into this one.
  {
    slug: 'head-shoulder-massage',
    group: 'targeted',
    name: 'Head & Shoulder Massage',
    urdu: 'سر اور کندھوں کا مساج',
    bestFor: 'Screen headaches, jaw and neck tension',
    rates: [
      { minutes: 30, price: 3000 },
      { minutes: 40, price: 3500 },
      { minutes: 60, price: 5000 },
      { minutes: 90, price: 7000 },
    ],
  },
  {
    slug: 'back-neck-massage',
    group: 'targeted',
    name: 'Back & Neck Massage',
    urdu: 'کمر اور گردن کا مساج',
    bestFor: 'Lower back ache, stiff neck, long drives',
    rates: [
      { minutes: 30, price: 2500 },
      { minutes: 40, price: 3000 },
      { minutes: 60, price: 4000 },
    ],
  },
  {
    slug: 'foot-massage',
    group: 'targeted',
    name: 'Foot Massage',
    urdu: 'پاؤں کا مساج',
    bestFor: 'Tired legs, swelling, all-day standing',
    rates: [
      { minutes: 30, price: 2500 },
      { minutes: 40, price: 3500 },
    ],
  },
]

export const fullBodyServices = services.filter((s) => s.group === 'full')
export const targetedServices = services.filter((s) => s.group === 'targeted')

export const getService = (slug) => services.find((s) => s.slug === slug)

export const formatPrice = (n) => `Rs ${n.toLocaleString('en-US')}`

const allPrices = services.flatMap((s) => s.rates.map((r) => r.price))
export const minPrice = Math.min(...allPrices)
export const maxPrice = Math.max(...allPrices)

export const fromPrice = (service) => Math.min(...service.rates.map((r) => r.price))

// 30-minute entry points, cheapest first — feeds the homepage "short sessions" band.
export const shortSessions = targetedServices
  .map((s) => ({ service: s, price: s.rates.find((r) => r.minutes === 30)?.price }))
  .filter((x) => x.price)
  .sort((a, b) => a.price - b.price)
