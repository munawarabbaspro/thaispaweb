import { Link } from 'react-router-dom'
import Seo from '../components/seo/Seo'
import BreadcrumbSchema from '../components/seo/BreadcrumbSchema'
import JsonLd from '../components/seo/JsonLd'
import PageHero from '../components/ui/PageHero'
import Button from '../components/ui/Button'
import Media from '../components/ui/Media'
import { absUrl } from '../components/seo/Seo'
import { img } from '../data/images'
import {
  services, fullBodyServices, targetedServices, fullBodyRates, fromPrice, formatPrice,
} from '../data/services'
import { business } from '../data/business'

function Card({ s, shared }) {
  return (
    <article className="car-tile" data-tilt>
      <Link className="tile-media" to={`/services/${s.slug}`} tabIndex={-1} aria-hidden="true">
        <Media seed={s.slug.length} {...img(s.slug)} />
      </Link>
      <div className="tile-body">
        <p className="tile-cat">{shared ? 'Full-body' : 'Targeted'}</p>
        <h3><Link to={`/services/${s.slug}`}>{s.name}</Link></h3>
        <p className="urdu-line" dir="rtl" lang="ur" style={{ margin: '0 0 8px', fontSize: 16 }}>{s.urdu}</p>
        <ul className="tile-specs"><li>{s.bestFor}</li></ul>
        <div className="tile-foot">
          <p className="tile-price"><span className="from">from</span> <strong>{formatPrice(fromPrice(s))}</strong>
            <small className="per">{s.rates[0].minutes} minutes</small></p>
          <Button to={`/services/${s.slug}`}>Details</Button>
        </div>
      </div>
    </article>
  )
}

export default function Services() {
  return (
    <div className="page">
      <Seo
        title="Massage Services in Bahria Town, Islamabad | Thai Spa"
        description="Thai, deep tissue, Swedish, aromatherapy, hot stone and sports massage in Civic Center, Bahria Town Phase 4. Plus back, neck, head and foot treatments from Rs 2,500."
        path="/services"
      />
      <BreadcrumbSchema items={[{ name: 'Services', path: '/services' }]} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: `${business.name} massage services`,
          itemListElement: services.map((s, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: s.name,
            url: absUrl(`/services/${s.slug}`),
          })),
        }}
      />
      <PageHero
        crumbs={[{ name: 'Services' }]}
        light="Ten treatments, chosen by"
        bold="what's actually wrong"
        intro="Seven full-body massages on one shared rate card, and three shorter targeted treatments that make an easy first visit."
      />

      <section className="fleet-browser">
        <h2 className="section-title">Full-body treatments <small>All seven share the same rates</small></h2>
        <table className="rate-table" style={{ marginBottom: 28 }}>
          <tbody>
            {fullBodyRates.map((r) => (
              <tr key={r.minutes}><th scope="row">{r.minutes} minutes</th><td>{formatPrice(r.price)}</td></tr>
            ))}
          </tbody>
        </table>
        <div className="fleet-grid-x">
          {fullBodyServices.map((s) => <Card key={s.slug} s={s} shared />)}
        </div>
      </section>

      <section className="rates">
        <h2 className="section-title">Targeted treatments <small>Shorter, cheaper, and the easiest first booking</small></h2>
        <div className="fleet-grid-x">
          {targetedServices.map((s) => <Card key={s.slug} s={s} />)}
        </div>
        <p className="center-cta"><Button size="lg" to="/prices">See the full price list</Button></p>
      </section>
    </div>
  )
}
