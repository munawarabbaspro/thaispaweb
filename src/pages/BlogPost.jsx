import { Link, useParams } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import Seo from '../components/seo/Seo'
import BreadcrumbSchema from '../components/seo/BreadcrumbSchema'
import ArticleSchema from '../components/seo/ArticleSchema'
import Button from '../components/ui/Button'
import Media from '../components/ui/Media'
import NotFound from './NotFound'
import { RichText, plain } from '../lib/richText'
import { formatDate } from './Blog'
import { posts, getPost, readMinutes } from '../data/blog'
import { getService, fromPrice, formatPrice } from '../data/services'
import { waLink, bookingMessage } from '../data/business'
import { img } from '../data/images'

function Block({ b }) {
  switch (b.t) {
    case 'h2': return <h2>{b.v}</h2>
    case 'h3': return <h3>{b.v}</h3>
    case 'p': return <p><RichText text={b.v} /></p>
    case 'ul': return <ul>{b.v.map((x, i) => <li key={i}><RichText text={x} /></li>)}</ul>
    case 'callout': return <aside className="note-box" role="note"><RichText text={b.v} /></aside>
    default: return null
  }
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)
  if (!post) return <NotFound />

  const service = getService(post.cta.slug)
  const path = `/blog/${post.slug}`
  const words = post.title.split(' ')
  const cut = Math.ceil(words.length / 2)
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3)
  const image = img(post.image)

  return (
    <div className="page">
      <Seo title={`${post.seoTitle || plain(post.title)} | Thai Spa`} description={post.description} path={path} type="article" image={image.src} />
      <BreadcrumbSchema items={[{ name: 'Blog', path: '/blog' }, { name: post.title, path }]} />
      <ArticleSchema post={{ ...post, image: image.src }} />

      <section className="page-hero">
        <div className="clouds" aria-hidden="true"><i className="c c1" /><i className="c c3" /></div>
        <nav className="crumbs" aria-label="Breadcrumb">
          <ol>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li aria-current="page">{post.title}</li>
          </ol>
        </nav>
        <h1 className="display post-title">
          <span className="light">{words.slice(0, cut).join(' ')}</span>{' '}
          <span className="bold">{words.slice(cut).join(' ')}</span>
        </h1>
        <p className="page-intro">{formatDate(post.datePublished)} · {readMinutes(post)} min read</p>
      </section>

      <article className="post-body">
        <figure className="post-figure"><Media eager seed={post.slug.length} {...image} /></figure>
        {post.blocks.map((b, i) => <Block key={i} b={b} />)}

        <div className="post-cta">
          <h2>{post.cta.text}</h2>
          <p>
            {service.name}: {service.bestFor.toLowerCase()}. From {formatPrice(fromPrice(service))} for {service.rates[0].minutes} minutes.
          </p>
          <div className="actions-row">
            <Button href={waLink(bookingMessage(service.name))}><MessageCircle className="ico" aria-hidden="true" />Book on WhatsApp</Button>
            <Button variant="light" to={`/services/${service.slug}`}>About {service.name}</Button>
            <Button variant="light" to="/prices">See all prices</Button>
          </div>
        </div>
      </article>

      <section className="rates">
        <h2 className="section-title">More from the blog</h2>
        <div className="fleet-grid-x blog-grid">
          {more.map((p) => (
            <article key={p.slug} className="car-tile" data-tilt>
              <Link className="tile-media" to={`/blog/${p.slug}`} tabIndex={-1} aria-hidden="true"><Media seed={p.slug.length} {...img(p.image)} /></Link>
              <div className="tile-body">
                <p className="tile-cat">{readMinutes(p)} min read</p>
                <h3 className="blog-card-title"><Link to={`/blog/${p.slug}`}>{p.title}</Link></h3>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
