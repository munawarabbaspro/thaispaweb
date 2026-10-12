import JsonLd from './JsonLd'

// Pass only questions that are visibly rendered on the same page.
export default function FaqSchema({ faqs }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }}
    />
  )
}
