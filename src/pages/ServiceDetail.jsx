import { Link, useParams } from 'react-router-dom'
import { Check, Clock, MessageCircle, Phone } from 'lucide-react'
import Seo from '../components/seo/Seo'
import BreadcrumbSchema from '../components/seo/BreadcrumbSchema'
import ServiceSchema from '../components/seo/ServiceSchema'
import Button from '../components/ui/Button'
import Media from '../components/ui/Media'
import NotFound from './NotFound'
import { business, waLink, bookingMessage } from '../data/business'
import { content, commonSkip, skipClosing, leads } from '../data/service-content'
import { RichText } from '../lib/richText'
import { serviceTitle, serviceLocation } from '../lib/seoTitles'
import { img } from '../data/images'
import { getService, fromPrice, formatPrice, fullBodyRates } from '../data/services'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getService(slug)
  const c = content[slug]
  if (!service || !c) return <NotFound />

  const full = service.group === 'full'
  const from = fromPrice(service)
  const description = `${service.name} in ${serviceLocation(slug)} at Thai Spa, Civic Center Bahria Town Phase 4. ${service.bestFor}. From ${formatPrice(from)} for ${service.rates[0].minutes} minutes.`
  // H1 uses the searched wording (the menu calls it "Swedish Relaxing Massage"; people search "swedish massage")
  const h1Name = slug === 'swedish-massage' ? 'Swedish Massage' : service.name
  const words = `${h1Name} in ${serviceLocation(slug)}`.split(' ')
  const cut = Math.ceil(words.length / 2)
  const book = (min) =>
    waLink(bookingMessage(min ? `${service.name} (${min} minutes)` : service.name))
  const path = `/services/${service.slug}`
  const crumb = [{ name: 'Services', path: '/services' }, { name: service.name, path }]

  return (
    <div className="page svc-page">
      <Seo
        title={serviceTitle(slug)}
        description={description}
        path={path}
      />
      <BreadcrumbSchema items={crumb} />
      <ServiceSchema service={service} description={description} />

      <section className="car-hero">
        <div className="clouds" aria-hidden="true"><i className="c c1" /><i className="c c3" /></div>
        <nav className="crumbs" aria-label="Breadcrumb">
          <ol>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li aria-current="page">{service.name}</li>
          </ol>
        </nav>
        <div className="car-hero-grid">
          <div>
            <h1 className="display car-title">
              <span className="light">{words.slice(0, cut).join(' ')}</span>{' '}
              <span className="bold">{words.slice(cut).join(' ')}</span>
            </h1>
            <p className="urdu-line" dir="rtl" lang="ur">{service.urdu}</p>
            <p className="car-lead">{service.bestFor}.</p>
            <ul className="chips-static">
              {c.best.slice(0, 3).map((b) => (
                <li key={b}><Check className="ico" aria-hidden="true" />{b}</li>
              ))}
            </ul>
            <div className="price-box">
              <div>
                <span className="from">{service.rates.length > 1 ? 'from' : ''} {service.rates[0].minutes} minutes</span>
                <strong>{formatPrice(from)}</strong>
                <small>{full ? 'Same rate for all seven full-body massages' : 'Targeted treatment'}</small>
              </div>
              <Button href={book(service.rates[0].minutes)}>Book on WhatsApp</Button>
            </div>
            <div className="actions-row">
              <Button variant="light" href={business.phoneHref}><Phone className="ico" aria-hidden="true" />Call the spa</Button>
              <Button variant="light" to="/prices">See all prices</Button>
            </div>
          </div>
          <div className="viewer-wrap">
            <div className="viewer">
              <Media eager seed={3} {...img(service.slug)} />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="two-col">
          <div>
            <h2 className="section-title">About this massage</h2>
            {c.intro.map((p, i) => <p key={i} className="page-intro left"><RichText text={i === 0 ? `${leads[slug]} ${p}` : p} /></p>)}
            {c.note && <p className="note-box">{c.note}</p>}
          </div>
          <div>
            <h2 className="section-title">Best for</h2>
            <ul className="best">
              {c.best.map((b) => <li key={b}>{b}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="section-title">What happens in a session</h2>
        <div className="session-steps">
          {c.steps.map((t, i) => <p key={i}>{t}</p>)}
        </div>
      </section>

      <section className="rates">
        <div className="rates-grid">
          <div>
            <h2 className="section-title">Duration &amp; price</h2>
            <table className="rate-table">
              <tbody>
                {service.rates.map((r) => (
                  <tr key={r.minutes}>
                    <th scope="row"><Clock className="ico" aria-hidden="true" style={{ display: 'inline', marginRight: 8, verticalAlign: '-3px' }} />{r.minutes} minutes</th>
                    <td>{formatPrice(r.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="note">
              {full
                ? `All seven full-body massages share these rates. Prices updated ${business.pricesUpdated}.`
                : `Prices updated ${business.pricesUpdated}.`}
            </p>
          </div>
          <div className="incl">
            <h3>Book this massage</h3>
            <div className="actions-row" style={{ marginTop: 0 }}>
              {service.rates.map((r) => (
                <Button key={r.minutes} variant="light" href={book(r.minutes)}>{r.minutes} min · {formatPrice(r.price)}</Button>
              ))}
            </div>
            <p className="note">Opens WhatsApp with this treatment and duration filled in. We confirm your slot there.</p>
          </div>
        </div>
      </section>

      <section>
        <div className="two-col">
          <div>
            <h2 className="section-title">Who should skip this</h2>
            <p className="page-intro left">Please do not book, or check with your doctor first, if:</p>
            <ul className="ticks no">
              {[...commonSkip, ...c.skip].map((t) => <li key={t}>{t}</li>)}
            </ul>
            <p className="page-intro left" style={{ marginTop: 18 }}>{skipClosing}</p>
          </div>
          <div>
            <h2 className="section-title">Aftercare</h2>
            <p className="page-intro left">{c.aftercare}</p>
          </div>
        </div>
      </section>

      <section className="rates">
        <h2 className="section-title">You might also like</h2>
        <div className="fleet-grid-x">
          {c.related.map((rs) => {
            const r = getService(rs)
            return (
              <article key={rs} className="car-tile" data-tilt>
                <Link className="tile-media" to={`/services/${rs}`} tabIndex={-1} aria-hidden="true">
                  <Media seed={5} {...img(rs)} />
                </Link>
                <div className="tile-body">
                  <p className="tile-cat">{r.group === 'full' ? 'Full-body' : 'Targeted'}</p>
                  <h3><Link to={`/services/${rs}`}>{r.name}</Link></h3>
                  <ul className="tile-specs"><li>{r.bestFor.split(',')[0]}</li></ul>
                  <div className="tile-foot">
                    <p className="tile-price"><span className="from">from</span> <strong>{formatPrice(fromPrice(r))}</strong></p>
                    <Button to={`/services/${rs}`}>Details</Button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
        <p className="center-cta">
          <Button size="lg" href={book()}><MessageCircle className="ico" aria-hidden="true" />Book {service.name} on WhatsApp</Button>
        </p>
        <p className="center-cta" style={{ marginTop: 14 }}>
          <Link to="/prices" className="link-caps">See all prices</Link> · <Link to="/contact" className="link-caps">Contact &amp; directions</Link>
        </p>
      </section>
    </div>
  )
}
