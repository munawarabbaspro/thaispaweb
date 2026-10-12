import { Head } from 'vite-react-ssg'

// Serialises a schema object into a JSON-LD script tag. "<" is escaped so
// content can never close the script element early.
export default function JsonLd({ data }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return (
    <Head>
      <script type="application/ld+json">{json}</script>
    </Head>
  )
}
