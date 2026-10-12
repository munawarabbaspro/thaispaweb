import { Link } from 'react-router-dom'
import { Phone, Tag, MessageCircle } from 'lucide-react'
import { business, waLink, bookingMessage } from '../../data/business'

// Mobile: floating glass pill with Call / Prices / WhatsApp. Desktop: round WhatsApp button.
export default function MobileActionBar() {
  const wa = waLink(bookingMessage())
  return (
    <>
      <nav className="m-bar" aria-label="Quick actions">
        <a href={business.phoneHref}><Phone className="ico" aria-hidden="true" />Call</a>
        <Link to="/prices"><Tag className="ico" aria-hidden="true" />Prices</Link>
        <a className="wa" href={wa} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="ico" aria-hidden="true" />WhatsApp
        </a>
      </nav>
      <a className="wa-float" href={wa} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <MessageCircle className="ico" aria-hidden="true" />
      </a>
    </>
  )
}
