import { Link } from 'react-router-dom'
import Seo from '../components/seo/Seo'
import BreadcrumbSchema from '../components/seo/BreadcrumbSchema'
import PageHero from '../components/ui/PageHero'
import { fullBodyServices, targetedServices, formatPrice, fromPrice } from '../data/services'
import { posts } from '../data/blog'

// Human-readable sitemap: one clean page that links to every page, which also helps crawlers and
// strengthens internal linking. Built from the same data files as the site, so it never goes stale.
export default function SitemapPage() {
  const main = [
    ['/', 'Home: massage in Bahria Town Phase 4'],
    ['/services', 'All massage services'],
    ['/prices', 'Massage price list'],
    ['/about', 'About Thai Spa'],
    ['/contact', 'Contact, hours and booking'],
    ['/blog', 'Blog'],
  ]
  return (
    <div className="page">
      <Seo
        title="Sitemap | Thai Spa, Civic Center Bahria Town"
        description="Every page on the Thai Spa website: massage services, prices, blog guides, contact and booking in Civic Center, Bahria Town Phase 4, Islamabad."
        path="/sitemap"
      />
      <BreadcrumbSchema items={[{ name: 'Sitemap', path: '/sitemap' }]} />
      <PageHero crumbs={[{ name: 'Sitemap' }]} light="Everything on" bold="this website" intro="Every page of Thai Spa in one place." />
      <section className="fleet-browser">
        <div className="sitemap-grid">
          <div>
            <h2 className="section-title">Main pages</h2>
            <ul className="ticks sitemap-list">
              {main.map(([to, label]) => <li key={to}><Link to={to}>{label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h2 className="section-title">Full-body massages</h2>
            <ul className="ticks sitemap-list">
              {fullBodyServices.map((s) => (
                <li key={s.slug}><Link to={`/services/${s.slug}`}>{s.name}</Link> <small>from {formatPrice(fromPrice(s))}</small></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="section-title">Targeted treatments</h2>
            <ul className="ticks sitemap-list">
              {targetedServices.map((s) => (
                <li key={s.slug}><Link to={`/services/${s.slug}`}>{s.name}</Link> <small>from {formatPrice(fromPrice(s))}</small></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="section-title">Blog guides</h2>
            <ul className="ticks sitemap-list">
              {posts.map((p) => <li key={p.slug}><Link to={`/blog/${p.slug}`}>{p.title}</Link></li>)}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
