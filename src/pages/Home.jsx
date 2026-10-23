import { useEffect, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, Clock, Home as HomeIcon, ShieldCheck, Sparkles, Tag } from 'lucide-react'
import { Head } from 'vite-react-ssg'
import Seo from '../components/seo/Seo'
import FaqSchema from '../components/seo/FaqSchema'
import Button from '../components/ui/Button'
import Media from '../components/ui/Media'
import TickerSlider from '../components/sections/TickerSlider'
import MapEmbed from '../components/sections/MapEmbed'
import OfferCards from '../components/sections/OfferCards'
import BookingForm from '../components/sections/BookingForm'
import { business, waLink, bookingMessage } from '../data/business'
import { faqs } from '../data/faqs'
import { problems } from '../data/problems'
import {
  services, fullBodyServices, targetedServices, getService, fromPrice, formatPrice, minPrice, shortSessions, fullBodyRates,
} from '../data/services'
import { img, imgSrcSet } from '../data/images'
import { reducedMotion, revealWithObserver, countUpOnView } from '../lib/chrome'

const TILE_IMG = { 'back-neck-massage': 'tile-back-neck', 'foot-massage': 'tile-foot', 'head-shoulder-massage': 'tile-head-shoulder' }
const rate60 = fullBodyRates.find((r) => r.minutes === 60).price
const words = (text) => text.split(' ')

// Layout-effect cleanup runs BEFORE React removes the page's DOM, so GSAP can unwrap its pin-spacers first.
// (Passive-effect cleanup ran too late and React crashed with "removeChild ... not a child of this node".)
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function Home() {
  useIsoLayoutEffect(() => {
    // The animation code is its own file, fetched right after the first paint so it never delays the page.
    if (reducedMotion()) {
      const offs = [revealWithObserver(), countUpOnView()]
      return () => offs.forEach((f) => f())
    }
    let off = () => {}
    let cancelled = false
    import('../lib/motion').then((m) => {
      if (!cancelled) off = m.initHomeMotion()
    })
    return () => {
      cancelled = true
      off()
    }
  }, [])

  const waBook = waLink(bookingMessage())
  const stats = [
    { value: minPrice, prefix: 'Rs ', label: '30-minute sessions from' },
    { value: services.length, label: 'Treatments' },
    { value: 7, label: 'Days a week' },
  ]

  return (
    <>
      <Seo
        title="Massage in Bahria Town Phase 4, Islamabad | Thai Spa"
        description="Thai Spa is a massage centre in Civic Center, Bahria Town Phase 4. Thai, deep tissue, Swedish and hot stone massage from 30 minutes, prices published. Call or WhatsApp."
        path="/"
      />
      <Head>
        <link rel="preload" as="image" href="/images/hero.webp" imagesrcset={imgSrcSet('hero', 1600)} imagesizes="100vw" fetchpriority="high" />
      </Head>
      <FaqSchema faqs={faqs} />

      {/* HERO */}
      <section className="hero" id="intro">
        <div className="clouds" aria-hidden="true"><i className="c c1" /><i className="c c3" /><i className="c c4" /></div>
        <div className="hero-car"><Media eager seed={1} sizes="100vw" {...img('hero')} /></div>
        <div className="hero-text">
          <p className="eyebrow">Thai Spa · Civic Center, Bahria Town Phase 4</p>
          <h1 className="display">
            <span className="line"><span className="light">Massage in</span></span>{' '}
            <span className="line"><span className="bold">Bahria Town Phase 4</span></span>
          </h1>
          <p className="tagline">
            Thai Spa is a massage centre in Civic Center, Bahria Town Phase 4, Islamabad. Relief that lasts longer than the session: Thai, deep tissue, Swedish and hot stone, from thirty minutes at {formatPrice(minPrice)}, every price published.
          </p>
          <p className="urdu-line" dir="rtl" lang="ur">سکون جو سیشن کے بعد بھی ساتھ رہے</p>
          <div className="actions">
            <Button size="lg" href={waBook}>Book on WhatsApp</Button>
            <Button size="lg" variant="light" to="/prices">See all prices</Button>
          </div>
        </div>
        <BookingForm className="quick-book" id="quick-form" />
      </section>

      {/* TREATMENT MARQUEE */}
      <div className="marquee" aria-label="Our treatments">
        <div className="marquee-track">
          {services.map((s) => <span key={s.slug}>{s.name}</span>)}
          {services.map((s) => <span key={`d-${s.slug}`} aria-hidden="true">{s.name}</span>)}
        </div>
      </div>

      {/* PREMIUM */}
      <section className="premium" id="about">
        <div className="clouds" aria-hidden="true"><i className="c c2" /><i className="c c4" /><i className="c c5" /></div>
        <TickerSlider
          items={[
            'Private rooms, fresh linen for every client',
            'Civic Center · Bahria Town Phase 4 · Islamabad',
            'Open seven days a week',
            'Thirty minutes is a real option',
          ]}
        />
        <div className="split">
          <div className="split-text reveal">
            <p className="eyebrow">{fullBodyServices.length} full-body · {targetedServices.length} targeted</p>
            <h2 className="display"><span className="light">Treatments chosen by</span> <span className="bold">what's wrong</span></h2>
            <div className="row">
              <p className="caps">
                Looking for a spa in Bahria Town Phase 4, or a spa centre near you with the prices listed? Seven full-body massages
                share one rate card, plus three targeted treatments from {formatPrice(minPrice)}. We are open seven days, so if you
                need a massage near you open now, see today's hours on the <Link to="/contact">contact page</Link>.
              </p>
              <p className="urdu-line" dir="rtl" lang="ur">بحریہ ٹاؤن فیز 4 میں مساج سینٹر۔ ہر مساج کی قیمت ویب سائٹ پر درج ہے۔</p>
              <Button variant="light" to="/services">View treatments</Button>
            </div>
          </div>
          <figure className="split-img fade-left reveal"><Media seed={2} {...img('premium')} /></figure>
        </div>
      </section>

      {/* INSTANTLY BOOKED */}
      <section className="instant">
        <figure className="instant-img fade-right reveal"><Media seed={3} {...img('instant')} /></figure>
        <div className="instant-text reveal">
          <p className="eyebrow">Book on WhatsApp</p>
          <h2 className="display right"><span className="light">Instantly</span> <span className="bold">booked</span></h2>
          <p>
            Pick a treatment, send your preferred time on WhatsApp and we confirm your slot. Every price is on the website, so you
            know what you are paying before you walk in.
          </p>
        </div>
      </section>

      {/* LUXURY / STAGE */}
      <section className="luxury">
        <div className="luxury-head reveal">
          <div>
            <h2 className="h-sm">Know the price, choose the treatment and book, before you leave home</h2>
            <p className="lead">
              Every treatment is explained, every rate is published, and booking is one message. We welcome clients from across Bahria Town,
              Phases 4 to 8, DHA and Rawalpindi, with no phone tag and no surprises at the counter.
            </p>
          </div>
          <Button variant="light" to="/prices">View prices</Button>
        </div>
        <div className="luxury-stage">
          <p className="eyebrow">From thirty minutes</p>
          <span className="mega" role="img" aria-label="RELIEF">
            {[...'RELIEF'].map((c, i) => <span key={i} aria-hidden="true">{c}</span>)}
          </span>
          <Media seed={4} {...img('luxury')} />
          <ul className="lux-stats">
            {stats.map((s) => (
              <li key={s.label}>
                <strong data-count={s.value} data-prefix={s.prefix || ''}>{`${s.prefix || ''}${s.value.toLocaleString('en-US')}`}</strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TREATMENTS */}
      <section className="fleet" id="treatments">
        <div className="section-head reveal">
          <p className="eyebrow">Four everyday problems</p>
          <h2 className="display center"><span className="light">Choose your</span> <span className="bold">relief</span></h2>
        </div>
        <div className="cat-grid four">
          {problems.map((p, i) => {
            const s = getService(p.slug)
            return (
              <Link key={p.slug} className="cat-card reveal" data-tilt to={`/services/${p.slug}`}>
                <Media dark seed={i + 5} {...img(`problem-${['shoulders', 'back', 'sleep', 'legs'][i]}`)} />
                <span className="cat-info"><strong>{p.title}</strong><small>{s.name} · from {formatPrice(fromPrice(s))}</small></span>
                <span className="cat-go" aria-hidden="true"><ArrowRight className="ico" /></span>
              </Link>
            )
          })}
        </div>
        <h2 className="sub-head">Short sessions, an easy first visit</h2>
        <div className="fleet-grid-x">
          {shortSessions.map(({ service: s, price }, i) => (
            <article key={s.slug} className="car-tile reveal" data-tilt>
              <Link className="tile-media" to={`/services/${s.slug}`} tabIndex={-1} aria-hidden="true"><Media seed={i + 9} {...img(TILE_IMG[s.slug])} /></Link>
              <div className="tile-body">
                <p className="tile-cat">Targeted treatment</p>
                <h3><Link to={`/services/${s.slug}`}>{s.name}</Link></h3>
                <ul className="tile-specs">
                  <li><Clock className="ico" aria-hidden="true" />30 minutes</li>
                  <li><Check className="ico" aria-hidden="true" />{s.bestFor.split(',')[0]}</li>
                </ul>
                <div className="tile-foot">
                  <p className="tile-price"><span className="from">30 minutes</span> <strong>{formatPrice(price)}</strong></p>
                  <Button href={waLink(bookingMessage(`${s.name} (30 minutes)`))}>Book</Button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="center-cta"><Button size="lg" to="/services">See all {services.length} treatments</Button></p>
      </section>

      {/* LIVE OFFERS: renders only while a real offer is running */}
      <OfferCards />

      {/* WHY */}
      <section className="why" id="why">
        <div className="section-head reveal">
          <p className="eyebrow">Why Thai Spa</p>
          <h2 className="display center"><span className="light">Built for</span> <span className="bold">peace of mind</span></h2>
        </div>
        <div className="bento">
          <article className="b b-1 reveal" data-tilt>
            <ShieldCheck className="ico" aria-hidden="true" />
            <h3>Every session starts with questions</h3>
            <p>Where it hurts, and what you do all day, before anyone touches anything.</p>
            <span className="big">2 min</span>
            <p>of questions before every session.</p>
          </article>
          <article className="b b-2 reveal" data-tilt>
            <Tag className="ico" aria-hidden="true" />
            <h3>Prices are on the website</h3>
            <p>All of them. You know what you're paying before you walk in.</p>
          </article>
          <article className="b b-3 reveal" data-tilt>
            <HomeIcon className="ico" aria-hidden="true" />
            <h3>Private rooms</h3>
            <p>Fresh linen for every client. Not a shared hall with curtains between beds.</p>
          </article>
          <article className="b b-4 reveal" data-tilt>
            <Clock className="ico" aria-hidden="true" />
            <h3>Thirty minutes is a real option</h3>
            <p>You don't have to book an hour to find out whether this helps.</p>
          </article>
          <article className="b b-5 reveal" data-tilt>
            <Sparkles className="ico" aria-hidden="true" />
            <h3>Trained therapists</h3>
            <p>Thai and deep-tissue technique, with premium quality oils.</p>
          </article>
          <article className="b b-6 reveal" data-tilt>
            <div>
              <h3>Not sure which treatment to choose?</h3>
              <p>Tell us where it hurts and we'll pick the technique.</p>
            </div>
            <Button size="lg" href={waBook}>Book on WhatsApp</Button>
          </article>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="steps-wrap" id="how">
        <div className="section-head reveal">
          <p className="eyebrow">Three simple steps</p>
          <h2 className="display center"><span className="light">How it</span> <span className="bold">works</span></h2>
        </div>
        <div className="steps">
          <article className="step reveal"><h3>Tell us where it hurts</h3><p>A couple of minutes of questions: where it aches, and what you do all day.</p></article>
          <article className="step reveal"><h3>We pick the technique</h3><p>Thai, deep tissue, Swedish or a shorter targeted session, matched to what you told us.</p></article>
          <article className="step reveal"><h3>You leave with something to do at home</h3><p>One simple aftercare tip you can use that same evening.</p></article>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" id="features">
        <div className="feature-grid">
          <div className="f-ghost g1" aria-hidden="true" /><div className="f-ghost g2" aria-hidden="true" />
          <div className="f-ghost g3" aria-hidden="true" /><div className="f-ghost g4" aria-hidden="true" />
          <article className="f-card f-wide reveal">
            <div className="f-text">
              <h3 className="display small"><span className="light">Thirty minutes</span> <span className="bold">to start</span></h3>
              <p>A real option from {formatPrice(minPrice)}. Send your time on WhatsApp and we confirm your slot.</p>
              <a href="#booking" className="btn btn-soft">Learn more</a>
            </div>
            <Media seed={12} {...img('feature-wide')} />
          </article>
          <Link className="f-card f-brown reveal" to="/services/back-neck-massage">
            <h3 className="display small light-ink"><span className="light">Back &amp;</span><br /><span className="light">neck</span></h3>
            <Media dark seed={13} {...img('feature-back-neck')} />
          </Link>
          <article className="f-card f-wheel reveal">
            <div className="f-top">
              <p><em>Book a session any day of the week.</em></p>
              <span className="pill">7 days</span>
            </div>
            <Link className="link-caps" to="/prices">See prices</Link>
            <Media seed={14} {...img('feature-week')} />
          </article>
        </div>
        <ul className="stats reveal">
          <li><strong>{services.length}</strong><span>Treatments</span></li>
          <li><strong>{formatPrice(minPrice)}</strong><span>Shortest session from</span></li>
          <li><strong>90 min</strong><span>Longest session</span></li>
          <li><strong>7</strong><span>Days a week</span></li>
        </ul>
      </section>

      {/* PRICE SUMMARY */}
      <section className="home-packages" id="packages">
        <div className="section-head reveal">
          <p className="eyebrow">Full body from {formatPrice(fullBodyRates[0].price)}</p>
          <h2 className="display center"><span className="light">Honest</span> <span className="bold">prices</span></h2>
        </div>
        <div className="pkg-mini-grid">
          <Link className="pkg-mini reveal" data-tilt to="/prices">
            <Tag className="ico" aria-hidden="true" /><strong>Full body, 60 min</strong>
            <small>Thai, deep tissue, Swedish and more</small><span>{formatPrice(rate60)}</span>
          </Link>
          {shortSessions.map(({ service: s, price }) => (
            <Link key={s.slug} className="pkg-mini reveal" data-tilt to={`/services/${s.slug}`}>
              <Clock className="ico" aria-hidden="true" /><strong>{s.name}, 30 min</strong>
              <small>{s.bestFor.split(',')[0]}</small><span>{formatPrice(price)}</span>
            </Link>
          ))}
        </div>
        <p className="center-cta"><Button variant="light" size="lg" to="/prices">See the full price list</Button></p>
      </section>

      {/* FIND US */}
      <section className="find-us" id="find-us">
        <div className="section-head reveal">
          <p className="eyebrow">Civic Center, Bahria Town Phase 4</p>
          <h2 className="display center"><span className="light">Find us on</span> <span className="bold">the map</span></h2>
        </div>
        <div className="contact-grid reveal">
          <div>
            <address className="note-box" style={{ fontStyle: 'normal' }}>
              <strong>{business.name}</strong><br />
              {business.address.street}<br />{business.address.landmark}<br />{business.address.city}
            </address>
            <p className="page-intro left" style={{ marginTop: 18 }}>
              Thai Spa is in Civic Center, near Anarkali Hotel, with parking at Civic Center. We are open seven days a week.
            </p>
            <div className="actions-row">
              <Button href={business.phoneHref}>Call {business.phone}</Button>
              <Button variant="light" to="/contact">Hours &amp; booking</Button>
            </div>
          </div>
          <MapEmbed />
        </div>
      </section>

      {/* BOOKING */}
      <section className="booking" id="booking">
        <div className="clouds" aria-hidden="true"><i className="c c1" /><i className="c c3" /></div>
        <div className="booking-inner reveal">
          <h2 className="display center"><span className="light">Book your</span> <span className="bold">session</span></h2>
          <BookingForm className="booking-form" id="booking-form" />
        </div>
      </section>

      {/* FAQ */}
      <section className="faq" id="faq">
        <div className="clouds" aria-hidden="true"><i className="c c1" /><i className="c c3" /><i className="c c4" /></div>
        <h2 className="display center reveal" aria-label="Everything you need to know before booking">
          <span className="light">{words('Everything you need to know').map((w, i) => <span key={i} className="w" aria-hidden="true">{w}{' '}</span>)}</span>
          <span className="bold">{words('before booking').map((w, i) => <span key={i} className="w" aria-hidden="true">{w}{' '}</span>)}</span>
        </h2>
        <div className="faq-list reveal">
          {faqs.map((f, i) => (
            <details key={f.q} open={i === 0}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
        <p className="center-cta"><Button variant="light" href={business.phoneHref}>Call {business.phone}</Button></p>
      </section>
    </>
  )
}
