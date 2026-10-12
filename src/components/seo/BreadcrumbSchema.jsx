import JsonLd from './JsonLd'
import { absUrl } from './Seo'

// items: [{ name, path }] — ends with the current page. Home is prepended.
export default function BreadcrumbSchema({ items }) {
  const all = [{ name: 'Home', path: '/' }, ...items]
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: all.map((it, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: it.name,
          item: absUrl(it.path),
        })),
      }}
    />
  )
}
