import { useEffect, useId, useState } from 'react'
import { business, waLink } from '../../data/business'
import { trackContact } from '../../lib/tracking'
import { services, getService, formatPrice } from '../../data/services'

// Validates, then opens a pre-filled WhatsApp message. No backend.
export default function BookingForm({ id, className, defaultSlug = 'full-body-massage', cta = 'Book on WhatsApp' }) {
  const uid = useId()
  const [slug, setSlug] = useState(defaultSlug)
  const service = getService(slug)
  const [minutes, setMinutes] = useState(60)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [msg, setMsg] = useState({ text: '', err: false })
  const [today, setToday] = useState('')

  useEffect(() => setToday(new Date().toISOString().split('T')[0]), [])
  useEffect(() => {
    if (!service.rates.some((r) => r.minutes === minutes)) setMinutes(service.rates.at(-1).minutes)
  }, [slug]) // eslint-disable-line react-hooks/exhaustive-deps

  const submit = (e) => {
    e.preventDefault()
    if (!date || !time) return setMsg({ text: 'Please choose a preferred date and time.', err: true })
    const rate = service.rates.find((r) => r.minutes === minutes)
    const text =
      `Assalam o Alaikum, I'd like to book a ${service.name} (${minutes} minutes, ${formatPrice(rate.price)}) ` +
      `at ${business.name} on ${date} at ${time}.`
    setMsg({ text: 'Opening WhatsApp with your booking request…', err: false })
    trackContact('whatsapp')
    window.open(waLink(text), '_blank', 'noopener')
  }

  return (
    <form className={className} id={id} noValidate onSubmit={submit} aria-label="Booking">
      <label htmlFor={`${uid}-s`}>Treatment
        <select id={`${uid}-s`} value={slug} onChange={(e) => setSlug(e.target.value)}>
          {services.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
        </select>
      </label>
      <label htmlFor={`${uid}-d`}>Duration
        <select id={`${uid}-d`} value={minutes} onChange={(e) => setMinutes(Number(e.target.value))}>
          {service.rates.map((r) => (
            <option key={r.minutes} value={r.minutes}>{r.minutes} min — {formatPrice(r.price)}</option>
          ))}
        </select>
      </label>
      <label htmlFor={`${uid}-dt`}>Preferred date
        <input id={`${uid}-dt`} type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} required />
      </label>
      <label htmlFor={`${uid}-t`}>Preferred time
        <input id={`${uid}-t`} type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
      </label>
      <button type="submit" className="btn btn-dark">{cta}</button>
      <p className={`form-msg${msg.err ? ' err' : ''}`} role="status" aria-live="polite">{msg.text}</p>
    </form>
  )
}
