import { minPrice, maxPrice } from './services'

export const business = {
  name: 'Thai Spa',
  domain: 'https://thaispas.pk',
  phone: '+92 347 3200319',
  phoneHref: 'tel:+923473200319',
  whatsapp: '923473200319', // OWNER: confirm this number is on WhatsApp
  email: 'info@thaispas.pk', // OWNER: create this mailbox, or change it
  address: {
    street: 'Civic Center, Bahria Town Phase 4',
    landmark: 'Near Anarkali Hotel',
    city: 'Islamabad',
    region: 'Islamabad Capital Territory',
    postalCode: '46000',
    country: 'PK',
  },
  geo: { lat: null, lng: null }, // OWNER: exact pin from Google Maps
  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '20:00' },
    { days: ['Saturday', 'Sunday'], opens: '10:00', closes: '21:00' },
  ],
  // Derived from services.js so it can never drift from the price list.
  priceRange: `PKR ${minPrice.toLocaleString('en-US')} – ${maxPrice.toLocaleString('en-US')}`,
  // The menu is massage only. Leave false — no clinical or medical language anywhere.
  offersPhysiotherapy: false,
  pricesUpdated: '8 October 2026', // shown on /prices — bump whenever a price changes
  ogImage: '/images/og-thai-spa.jpg', // OWNER: 1200x630 share image
  areaServed: ['Bahria Town', 'DHA Islamabad', 'Islamabad', 'Rawalpindi'],
  // TODO owner: confirm each policy, then replace null with a plain sentence. Until then the site says "ask when you book".
  policies: { tax: null, cancellation: null, tipping: null, walkIns: null },
  social: { facebook: '', instagram: '', googleMaps: '' },
}

export const waLink = (msg) => `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(msg)}`

export const bookingMessage = (serviceName) =>
  serviceName
    ? `Assalam o Alaikum, I'd like to book a ${serviceName} at ${business.name}.`
    : `Assalam o Alaikum, I'd like to book a massage at ${business.name}.`

export const fullAddress = () => {
  const a = business.address
  return `${a.street}, ${a.city}`
}

const to12h = (t) => {
  const [h, m] = t.split(':').map(Number)
  const suffix = h >= 12 ? 'pm' : 'am'
  const h12 = h % 12 || 12
  return m ? `${h12}:${String(m).padStart(2, '0')} ${suffix}` : `${h12} ${suffix}`
}

export const formatHours = (block) => `${to12h(block.opens)} – ${to12h(block.closes)}`

export const hoursLabel = (block) =>
  block.days.length > 1 ? `${block.days[0].slice(0, 3)} – ${block.days.at(-1).slice(0, 3)}` : block.days[0]
