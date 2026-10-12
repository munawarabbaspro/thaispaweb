import { Link } from 'react-router-dom'
import Seo, { absUrl } from '../components/seo/Seo'
import BreadcrumbSchema from '../components/seo/BreadcrumbSchema'
import JsonLd from '../components/seo/JsonLd'
import PageHero from '../components/ui/PageHero'
import Button from '../components/ui/Button'
import Media from '../components/ui/Media'
import { business } from '../data/business'
import { posts, readMinutes } from '../data/blog'
import { img } from '../data/images'

export const formatDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })

export default function Blog() {
  return (
    <div className="page">
      <Seo
        title="Massage & Pain Relief Blog | Thai Spa Bahria Town"
        description="Practical advice on massage, back pain, sleep and recovery from the therapists at Thai Spa, Civic Center Bahria Town."
        path="/blog"
      />
      <BreadcrumbSchema items={[{ name: 'Blog', path: '/blog' }]} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: `${business.name} blog`,
          url: absUrl('/blog'),
          blogPost: posts.map((p) => ({
            '@type': 'BlogPosting',
            headline: p.title,
            url: absUrl(`/blog/${p.slug}`),
            datePublished: p.datePublished,
          })),
        }}
      />
      <PageHero
        crumbs={[{ name: 'Blog' }]}
        light="What we get asked,"
        bold="answered properly"
        intro="Plain, practical answers to the questions people ask at the counter, with no hype."
      />
      <section className="fleet-browser">
        <div className="fleet-grid-x blog-grid">
          {posts.map((p) => (
            <article key={p.slug} className="car-tile" data-tilt>
              <Link className="tile-media" to={`/blog/${p.slug}`} tabIndex={-1} aria-hidden="true">
                <Media seed={p.slug.length} {...img(p.image)} />
              </Link>
              <div className="tile-body">
                <p className="tile-cat">{formatDate(p.datePublished)} · {readMinutes(p)} min read</p>
                <h2 className="blog-card-title"><Link to={`/blog/${p.slug}`}>{p.title}</Link></h2>
                <p className="blog-card-desc">{p.description}</p>
                <div className="tile-foot"><span /><Button to={`/blog/${p.slug}`}>Read</Button></div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
