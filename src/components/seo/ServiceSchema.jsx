import JsonLd from './JsonLd'
import { business } from '../../data/business'
import { absUrl } from './Seo'

export const buildService = (service, description) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.name,
  serviceType: 'Massage',
  description,
  url: absUrl(`/services/${service.slug}`),
  provider: { '@id': `${business.domain}/#business` },
  areaServed: business.areaServed.map((name) => ({ '@type': 'Place', name })),
  offers: service.rates.map((r) => ({
    '@type': 'Offer',
    name: `${service.name} — ${r.minutes} minutes`,
    price: r.price,
    priceCurrency: 'PKR',
  })),
})

export default function ServiceSchema({ service, description }) {
  return <JsonLd data={buildService(service, description)} />
}
