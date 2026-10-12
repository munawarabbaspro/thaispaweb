import JsonLd from './JsonLd'
import { business } from '../../data/business'
import { absUrl } from './Seo'

export default function ArticleSchema({ post }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.datePublished,
        dateModified: post.dateModified || post.datePublished,
        author: { '@type': 'Organization', name: business.name, url: business.domain },
        publisher: { '@type': 'Organization', name: business.name, url: business.domain },
        image: `${business.domain}${post.image || business.ogImage}`,
        mainEntityOfPage: absUrl(`/blog/${post.slug}`),
      }}
    />
  )
}
