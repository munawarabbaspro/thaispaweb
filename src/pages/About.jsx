import { Link } from 'react-router-dom'
import Seo from '../components/seo/Seo'
import BreadcrumbSchema from '../components/seo/BreadcrumbSchema'
import JsonLd from '../components/seo/JsonLd'
import PageHero from '../components/ui/PageHero'
import Button from '../components/ui/Button'
import { absUrl } from '../components/seo/Seo'
import { business, waLink, bookingMessage } from '../data/business'
import { team } from '../data/team'

export default function About() {
  const a = business.address
  const facilities = [
    'Private rooms, not a shared hall with curtains between beds',
    'Fresh linen for every client',
    'Premium quality oils',
    'A relaxing, quiet atmosphere',
    'Parking at Civic Center',
    'Open seven days a week',
  ]
  const steps = [
    ['Questions first', 'Every session starts with two minutes of questions: where it hurts, and what you do all day.'],
    ['We pick the technique', 'Thai, deep tissue, Swedish or a shorter targeted session, matched to what you told us.'],
    ['You stay in control', 'Pressure is yours to change at any moment. Just say so.'],
    ['Something to take home', 'One simple aftercare tip you can use the same evening.'],
  ]
  return (
    <div className="page">
      <Seo
        title="About Thai Spa | Civic Center, Bahria Town Phase 4"
        description="Thai Spa is a massage centre in Civic Center, Bahria Town Phase 4, Islamabad. Private rooms, trained therapists, and a consultation before every session."
        path="/about"
      />
      <BreadcrumbSchema items={[{ name: 'About', path: '/about' }]} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: `About ${business.name}`,
          url: absUrl('/about'),
          about: { '@id': `${business.domain}/#business` },
        }}
      />
      <PageHero crumbs={[{ name: 'About' }]} light="A massage centre," bold="run properly" />

      <section className="fleet-browser">
        <div className="two-col">
          <div>
            <h2 className="section-title">Who we are</h2>
            <p className="page-intro left">
              Thai Spa is a massage centre in {a.street}, {a.landmark}. We offer Thai, deep tissue, Swedish, aromatherapy, hot
              stone and sports massage, plus shorter back, neck, head and foot treatments.
            </p>
            <p className="page-intro left">
              We built it around three simple ideas: ask before we touch, publish every price, and make thirty minutes a real
              option, so you can find out whether massage helps without committing to an hour.
            </p>
          </div>
          <div>
            <h2 className="section-title">Find us</h2>
            <address className="note-box" style={{ fontStyle: 'normal' }}>
              {a.street}<br />{a.landmark}<br />{a.city}<br />
              <a href={business.phoneHref}>{business.phone}</a>
            </address>
            <p className="actions-row">
              <Button to="/contact">Contact &amp; directions</Button>
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="section-title">How a session works</h2>
        <div className="session-steps">
          {steps.map(([t, d]) => <p key={t}><strong>{t}.</strong> {d}</p>)}
        </div>
      </section>

      <section className="rates">
        <h2 className="section-title">The rooms and facilities</h2>
        <ul className="ticks grid2">
          {facilities.map((f) => <li key={f}>{f}</li>)}
        </ul>
      </section>

      <section>
        <h2 className="section-title">The team</h2>
        {team.length === 0 ? (
          <p className="page-intro left">
            Our therapists are trained in Thai and deep-tissue technique. Ask us when you book if you would like to know who
            will be looking after you.
          </p>
        ) : (
          <div className="pkg-grid">
            {team.map((m) => (
              <article key={m.name} className="pkg-card">
                <h3>{m.name}</h3>
                <p className="pkg-dur">{m.role}</p>
                {m.training && <p className="pkg-sum">{m.training}</p>}
                {m.years && <p className="pkg-sum">{m.years} years of experience</p>}
              </article>
            ))}
          </div>
        )}
        <p className="center-cta">
          <Button size="lg" href={waLink(bookingMessage())}>Book on WhatsApp</Button>{' '}
          <Button size="lg" variant="light" to="/prices">See all prices</Button>
        </p>
      </section>
    </div>
  )
}
