import JsonLd from './JsonLd'
import { business } from '../../data/business'

const dayName = (d) => `https://schema.org/${d}`

export const buildLocalBusiness = () => {
  const { address: a, geo } = business
  const sameAs = Object.values(business.social).filter(Boolean)
  return {
    '@context': 'https://schema.org',
    '@type': ['HealthAndBeautyBusiness', 'DaySpa'],
    '@id': `${business.domain}/#business`,
    name: business.name,
    url: business.domain,
    image: `${business.domain}${business.ogImage}`,
    description: 'Massage centre in Civic Center, Bahria Town Phase 4, Islamabad. Thai, deep tissue, Swedish, aromatherapy, hot stone and sports massage, plus back, neck, head and foot sessions from 30 minutes. Prices published.',
    telephone: business.phone,
    email: business.email,
    priceRange: business.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${a.street}, ${a.landmark}`,
      addressLocality: a.city,
      addressRegion: a.region,
      postalCode: a.postalCode,
      addressCountry: a.country,
    },
    // Only emitted once the owner supplies a real pin — never invented.
    ...(geo.lat != null && geo.lng != null
      ? { geo: { '@type': 'GeoCoordinates', latitude: geo.lat, longitude: geo.lng } }
      : {}),
    ...(business.social.googleMaps ? { hasMap: business.social.googleMaps } : {}),
    openingHoursSpecification: business.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days.map(dayName),
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: business.areaServed.map((name) => ({ '@type': 'Place', name })),
    ...(sameAs.length ? { sameAs } : {}),
  }
}

export default function LocalBusinessSchema() {
  return <JsonLd data={buildLocalBusiness()} />
}
