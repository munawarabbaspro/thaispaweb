import { useEffect, useId, useState } from 'react'
import { business, waLink } from '../../data/business'
import { services, getService, formatPrice } from '../../data/services'

const initial = { name: '', phone: '', slug: 'full-body-massage', date: '', time: '', notes: '' }

// Validates inline, then opens a pre-filled WhatsApp message. If VITE_FORM_ENDPOINT
// (e.g. a Formspree URL) is set, the booking is also posted there for email delivery.
export default function ContactForm() {
  const uid = useId()
  const [v, setV] = useState(initial)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [today, setToday] = useState('')
  useEffect(() => setToday(new Date().toISOString().split('T')[0]), [])

  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (v.name.trim().length < 2) e.name = 'Please enter your name.'
    if (!/^[+\d][\d\s-]{8,}$/.test(v.phone.trim())) e.phone = 'Please enter a phone number we can reach.'
    if (!v.date) e.date = 'Please choose a date.'
    if (!v.time) e.time = 'Please choose a time.'
    return e
  }

  const submit = async (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) return
    const s = getService(v.slug)
    const text =
      `Assalam o Alaikum, I'd like to book at ${business.name}.\n` +
      `Name: ${v.name.trim()}\nPhone: ${v.phone.trim()}\nTreatment: ${s.name} (from ${formatPrice(s.rates[0].price)})\n` +
      `Preferred date: ${v.date}\nPreferred time: ${v.time}` +
      (v.notes.trim() ? `\nNotes: ${v.notes.trim()}` : '')
    const endpoint = import.meta.env.VITE_FORM_ENDPOINT
    if (endpoint) {
      try {
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...v, treatment: s.name }),
        })
      } catch {
        /* WhatsApp below still works */
      }
    }
    setSent(true)
    window.open(waLink(text), '_blank', 'noopener')
  }

  const field = (k, label, input) => (
    <div className="cf-field">
      <label htmlFor={`${uid}-${k}`}>{label}</label>
      {input}
      {errors[k] && <p className="cf-err" id={`${uid}-${k}-err`} role="alert">{errors[k]}</p>}
    </div>
  )
  const aria = (k) => ({ id: `${uid}-${k}`, 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${uid}-${k}-err` : undefined })

  return (
    <form className="contact-form" noValidate onSubmit={submit} aria-label="Booking form">
      {field('name', 'Name', <input type="text" autoComplete="name" value={v.name} onChange={set('name')} {...aria('name')} />)}
      {field('phone', 'Phone', <input type="tel" autoComplete="tel" placeholder="+92 3xx xxxxxxx" value={v.phone} onChange={set('phone')} {...aria('phone')} />)}
      {field('slug', 'Treatment',
        <select value={v.slug} onChange={set('slug')} {...aria('slug')}>
          {services.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
        </select>)}
      <div className="cf-row">
        {field('date', 'Preferred date', <input type="date" min={today} value={v.date} onChange={set('date')} {...aria('date')} />)}
        {field('time', 'Preferred time', <input type="time" value={v.time} onChange={set('time')} {...aria('time')} />)}
      </div>
      {field('notes', 'Notes (optional)', <textarea rows="3" placeholder="Where does it ache? Anything we should know?" value={v.notes} onChange={set('notes')} {...aria('notes')} />)}
      <button type="submit" className="btn btn-dark btn-lg">Send on WhatsApp</button>
      <p className="form-msg" role="status" aria-live="polite">
        {sent ? 'Thank you. WhatsApp should have opened with your details. If it did not, call us on ' + business.phone + '.' : ''}
      </p>
    </form>
  )
}
