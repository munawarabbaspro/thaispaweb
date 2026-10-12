import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, MessageCircle } from 'lucide-react'
import { offers, demoOffers } from '../../data/offers'
import { getService, formatPrice } from '../../data/services'
import { waLink } from '../../data/business'

const pad = (n) => String(n).padStart(2, '0')
const parts = (ms) => {
  const s = Math.max(0, Math.floor(ms / 1000))
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 }
}
const fmtEnd = (iso) => new Date(iso).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })

function Countdown({ endsAt, now }) {
  const t = parts(new Date(endsAt).getTime() - now)
  const cells = [['d', 'days'], ['h', 'hrs'], ['m', 'min'], ['s', 'sec']]
  return (
    <div className="cd" role="timer" aria-label={`Offer ends in ${t.d} days, ${t.h} hours and ${t.m} minutes`}>
      {cells.map(([k, label]) => (
        <div key={k} className="cd-cell" aria-hidden="true">
          <strong>{pad(t[k])}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  )
}

// Rendered only in the browser: the live list depends on the visitor's clock, so the
// static HTML stays identical for everyone and Google never indexes a stale deadline.
export default function OfferCards() {
  const [list, setList] = useState(null)
  const [now, setNow] = useState(0)

  useEffect(() => {
    setList(import.meta.env.DEV && offers.length === 0 ? demoOffers() : offers)
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const live = (list || []).filter((o) => new Date(o.endsAt).getTime() > now)
  if (!live.length) return null

  return (
    <section className="offers" id="offers" aria-labelledby="offers-h">
      <div className="clouds" aria-hidden="true"><i className="c c1" /><i className="c c3" /></div>
      <div className="section-head">
        <p className="eyebrow">Limited-time offers</p>
        <h2 id="offers-h" className="display center"><span className="light">Offers that</span> <span className="bold">end soon</span></h2>
      </div>
      <div className="offer-grid">
        {live.map((o) => {
          const s = getService(o.slug)
          const rate = s.rates.find((r) => r.minutes === o.minutes)
          const saved = rate.price - o.dealPrice
          const msg = `Assalam o Alaikum, I'd like to book the offer "${o.title}": ${s.name}, ${o.minutes} minutes at ${formatPrice(o.dealPrice)}.`
          return (
            <article key={o.id} className="offer-card" data-tilt>
              {o.demo && <span className="offer-demo">DEMO · preview only</span>}
              <span className="offer-badge"><Clock className="ico" aria-hidden="true" />{o.badge}</span>
              <h3>{o.title}</h3>
              <p className="offer-text">{o.text}</p>
              <p className="offer-for"><Link to={`/services/${s.slug}`}>{s.name}</Link> · {o.minutes} minutes</p>
              <p className="offer-price">
                <del>{formatPrice(rate.price)}</del>
                <strong>{formatPrice(o.dealPrice)}</strong>
                {saved > 0 && <em>Save {formatPrice(saved)}</em>}
              </p>
              <Countdown endsAt={o.endsAt} now={now} />
              <p className="offer-end">Ends {fmtEnd(o.endsAt)}</p>
              <a className="btn btn-dark btn-lg" href={waLink(msg)} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="ico" aria-hidden="true" />Claim on WhatsApp
              </a>
              {o.terms && <p className="offer-terms">{o.terms}</p>}
            </article>
          )
        })}
      </div>
    </section>
  )
}
