import { Head } from 'vite-react-ssg'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <section className="bg-shell pb-20 pt-36 md:pb-32 md:pt-44">
      <Head>
        <title>Page not found | Thai Spa</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <h1 className="max-w-[14ch] text-4xl md:text-6xl">This page has moved or never existed</h1>
        <p className="mt-6 max-w-prose text-ink-600">Try one of these instead.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button to="/services">See all services</Button>
          <Button variant="ghostLight" to="/prices">See all prices</Button>
          <Button variant="ghostLight" to="/contact">Contact the spa</Button>
        </div>
      </div>
    </section>
  )
}
