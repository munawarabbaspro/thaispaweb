import { useEffect, useState } from 'react'
import { MapPin, MessageCircle, Phone } from 'lucide-react'
import Seo, { absUrl } from '../components/seo/Seo'
import BreadcrumbSchema from '../components/seo/BreadcrumbSchema'
import FaqSchema from '../components/seo/FaqSchema'
import JsonLd from '../components/seo/JsonLd'
import PageHero from '../components/ui/PageHero'
import Button from '../components/ui/Button'
import ContactForm from '../components/sections/ContactForm'
import MapEmbed, { mapLinks } from '../components/sections/MapEmbed'
import { business, formatHours, hoursLabel, waLink, bookingMessage } from '../data/business'
import { faqs } from '../data/faqs'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function Contact() {
  const a = business.address
  const [today, setToday] = useState('')
  useEffect(() => setToday(DAYS[new Date().getDay()]), [])

  const directions = mapLinks().directions

  return (
    <div className="page">
      <Seo
        title="Massage Centre Civic Center Bahria Town | Contact & Book | Thai Spa"
        description="Book a massage at Thai Spa, the massage centre in Civic Center, Bahria Town Phase 4, near Anarkali Hotel. Call, WhatsApp or send the form. Open seven days."
        path="/contact"
      />
      <BreadcrumbSchema items={[{ name: 'Contact', path: '/contact' }]} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'ContactPage', name: `Contact ${business.name}`, url: absUrl('/contact'), about: { '@id': `${business.domain}/#business` } }} />
      <FaqSchema faqs={faqs} />
      <PageHero
        crumbs={[{ name: 'Contact' }]}
        light="Massage centre in"
        bold="Civic Center, Bahria Town"
        intro="Book a session at Thai Spa, our massage centre in Civic Center, Bahria Town Phase 4, close to Anarkali Hotel. Looking for a massage near Anarkali Hotel in Bahria Town? Look for us in Civic Center. Wondering whether the spa in Bahria Town Phase 4 is open now? Today's row in the hours table below is highlighted. We welcome clients from Phases 4 to 8, DHA and Rawalpindi."
      />

      <section className="fleet-browser">
        <div className="contact-grid">
          <div>
            <h2 className="section-title">Visit or call</h2>
            <address className="note-box" style={{ fontStyle: 'normal' }}>
              <strong>{business.name}</strong><br />
              {a.street}<br />{a.landmark}<br />{a.city}
            </address>
            <div className="actions-row">
              <Button href={business.phoneHref}><Phone className="ico" aria-hidden="true" />Call {business.phone}</Button>
              <Button variant="wa" href={waLink(bookingMessage())}><MessageCircle className="ico" aria-hidden="true" />WhatsApp</Button>
              <Button variant="light" href={directions}><MapPin className="ico" aria-hidden="true" />Get directions</Button>
            </div>

            <h3 className="section-title" style={{ fontSize: 22, margin: '34px 0 14px' }}>Opening hours</h3>
            <table className="rate-table hours-table">
              <tbody>
                {business.hours.flatMap((h) =>
                  h.days.map((d) => (
                    <tr key={d} className={d === today ? 'is-today' : undefined}>
                      <th scope="row">{d}{d === today ? ' (today)' : ''}</th>
                      <td>{formatHours(h)}</td>
                    </tr>
                  )),
                )}
              </tbody>
            </table>

            <MapEmbed />
            {/* TODO owner: set business.geo and business.social.googleMaps for an exact pin. */}
          </div>

          <div>
            <h2 className="section-title">Request a booking</h2>
            <p className="page-intro left">Fill this in and it opens WhatsApp with your details ready to send. We confirm your slot there.</p>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="rates">
        <h2 className="section-title">Questions we are asked</h2>
        <div className="faq-list" style={{ maxWidth: 800 }}>
          {faqs.map((f) => (
            <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
          ))}
        </div>
      </section>
    </div>
  )
}
