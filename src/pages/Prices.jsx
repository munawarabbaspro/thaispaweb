import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import Seo, { absUrl } from '../components/seo/Seo'
import BreadcrumbSchema from '../components/seo/BreadcrumbSchema'
import JsonLd from '../components/seo/JsonLd'
import PageHero from '../components/ui/PageHero'
import Button from '../components/ui/Button'
import { business, waLink, bookingMessage } from '../data/business'
import { services, fullBodyServices, targetedServices, fullBodyRates, formatPrice, minPrice } from '../data/services'

const ASK = 'Please ask when you book and we will tell you before you come.'
const policy = (v) => v || ASK

export default function Prices() {
  const notes = [
    ['What is included', 'Every session is in a private room with fresh linen.'],
    ['Tax', policy(business.policies.tax)],
    ['Cancellation', policy(business.policies.cancellation)],
    ['Tipping', policy(business.policies.tipping)],
    ['Walk-ins', policy(business.policies.walkIns)],
  ]
  // Shorter treatments first: the lowest barrier to a first visit.
  const targeted = [...targetedServices].sort((a, b) => a.rates[0].price - b.rates[0].price)

  return (
    <div className="page">
      <Seo
        title="Massage Price in Bahria Town: Full Rate List | Thai Spa"
        description={`Massage price in Bahria Town at Thai Spa, Civic Center Phase 4. Full body from ${formatPrice(fullBodyRates[0].price)}, back and neck from ${formatPrice(minPrice)}. 30 to 90 minute rate list.`}
        path="/prices"
      />
      <BreadcrumbSchema items={[{ name: 'Prices', path: '/prices' }]} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'OfferCatalog',
          name: `${business.name} massage price list`,
          url: absUrl('/prices'),
          itemListElement: services.map((s) => ({
            '@type': 'OfferCatalog',
            name: s.name,
            itemListElement: s.rates.map((r) => ({
              '@type': 'Offer',
              name: `${s.name} — ${r.minutes} minutes`,
              price: r.price,
              priceCurrency: 'PKR',
              itemOffered: { '@type': 'Service', name: s.name, url: absUrl(`/services/${s.slug}`) },
            })),
          })),
        }}
      />
      <PageHero
        crumbs={[{ name: 'Prices' }]}
        light="Massage price in"
        bold="Bahria Town, on one page"
        intro={
          <>
            How much is a massage in Islamabad? This is the whole massage rate list for Thai Spa. The full body massage Islamabad price
            list is one rate card for all seven treatments, and a 30 minute massage price in Islamabad starts at {formatPrice(minPrice)}.
            Thai massage, deep tissue and the rest all follow the same list. Prices last updated {business.pricesUpdated}, in Pakistani rupees.
          </>
        }
      />

      <section className="fleet-browser">
        <h2 className="section-title">Full-body massages <small>One rate card for all seven</small></h2>
        <div className="rate-tiles">
          {fullBodyRates.map((r) => (
            <div key={r.minutes} className="rate-tile">
              <strong>{formatPrice(r.price)}</strong>
              <span>{r.minutes} minutes</span>
            </div>
          ))}
        </div>
        <p className="page-intro left" style={{ marginTop: 22 }}>Any of these seven, at these rates:</p>
        <ul className="best">
          {fullBodyServices.map((s) => (
            <li key={s.slug}><Link to={`/services/${s.slug}`}>{s.name}</Link></li>
          ))}
        </ul>
      </section>

      <section className="rates">
        <h2 className="section-title">Targeted treatments <small>Each has its own rates. Start from {formatPrice(minPrice)}.</small></h2>
        <div className="pkg-grid">
          {targeted.map((s) => (
            <article key={s.slug} className="pkg-card">
              <h3><Link to={`/services/${s.slug}`}>{s.name}</Link></h3>
              <p className="pkg-sum">{s.bestFor}.</p>
              <table className="pkg-prices">
                <tbody>
                  {s.rates.map((r) => (
                    <tr key={r.minutes}><th scope="row">{r.minutes} minutes</th><td>{formatPrice(r.price)}</td></tr>
                  ))}
                </tbody>
              </table>
              <Button href={waLink(bookingMessage(s.name))}>Book on WhatsApp</Button>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="section-title">Good to know</h2>
        <dl className="notes-list">
          {notes.map(([k, v]) => (
            <div key={k}>
              <dt><Check className="ico" aria-hidden="true" />{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <p className="center-cta">
          <Button size="lg" to="/contact">Book a session</Button>
        </p>
      </section>
    </div>
  )
}
