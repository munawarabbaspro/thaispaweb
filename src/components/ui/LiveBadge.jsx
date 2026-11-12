import { business, isAllDay, waLink, bookingMessage } from '../../data/business'

// "Live" button: shown only while the business data says we are open around the clock.
// Taps through to WhatsApp, so it doubles as a booking button.
export default function LiveBadge({ className = '' }) {
  if (!business.hours.every(isAllDay)) return null
  return (
    <a className={`live-badge ${className}`.trim()} href={waLink(bookingMessage())} aria-label="Live now, open 24 hours. Tap to book on WhatsApp">
      <span className="live-dot" aria-hidden="true" />
      <b className="live-tag">Live</b>
      <span className="live-text">Open 24 hours</span>
      <span className="live-go" aria-hidden="true">Book now →</span>
    </a>
  )
}
