import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { business, formatHours, hoursLabel } from '../../data/business'
import { fullBodyServices, targetedServices } from '../../data/services'

export default function Footer() {
  const a = business.address
  return (
    <footer className="site-footer">
      <div className="foot-grid foot-grid-4">
        <div>
          <Link to="/" className="logo">Thai<span>Spa</span></Link>
          <p>
            A massage centre in {a.street}, {a.landmark}, {a.city}. Thai, deep tissue, Swedish, aromatherapy, hot stone and
            sports massage, plus targeted back, neck, head and foot sessions. Prices published.
          </p>
        </div>
        <div>
          <p className="foot-h">Full-body</p>
          <ul>
            {fullBodyServices.map((s) => (
              <li key={s.slug}><Link to={`/services/${s.slug}`}>{s.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="foot-h">Targeted</p>
          <ul>
            {targetedServices.map((s) => (
              <li key={s.slug}><Link to={`/services/${s.slug}`}>{s.name}</Link></li>
            ))}
            <li><Link to="/prices">All prices</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/sitemap">Sitemap</Link></li>
          </ul>
        </div>
        <div>
          <p className="foot-h">Contact</p>
          <address>
            {a.street}<br />
            {a.landmark}, {a.city}<br />
            <a href={business.phoneHref}>{business.phone}</a><br />
            <a href={`mailto:${business.email}`}>{business.email}</a><br />
            {business.hours.map((h) => (
              <Fragment key={h.days[0]}>
                {hoursLabel(h)} {formatHours(h)}<br />
              </Fragment>
            ))}
          </address>
        </div>
      </div>
      <p className="copy">
        © {new Date().getFullYear()} {business.name}, Bahria Town, Islamabad. Prices updated {business.pricesUpdated}.
      </p>
    </footer>
  )
}
