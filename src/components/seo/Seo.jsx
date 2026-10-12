import { Head } from 'vite-react-ssg'
import { business } from '../../data/business'

export const absUrl = (path = '/') => `${business.domain}${path === '/' ? '/' : path.replace(/\/$/, '')}`

export default function Seo({ title, description, path = '/', image = business.ogImage, type = 'website', noindex = false }) {
  const url = absUrl(path)
  const img = image.startsWith('http') ? image : `${business.domain}${image}`
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex" />}
      <meta property="og:site_name" content={business.name} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:locale" content="en_PK" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
    </Head>
  )
}
