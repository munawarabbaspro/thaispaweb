import { ExternalLink, MapPin } from 'lucide-react'
import { business } from '../../data/business'

// Map links built from business.geo. With a real pin (lat/lng) the map and the directions button point at the exact
// spot; until then they search for the name + address text, which is only approximate.
export const mapLinks = () => {
  const { lat, lng } = business.geo
  const a = business.address
  const exact = lat != null && lng != null
  const query = exact ? `${lat},${lng}` : encodeURIComponent(`${business.name}, ${a.street}, ${a.landmark}, ${a.city}`)
  return {
    exact,
    embed: `https://www.google.com/maps?q=${query}&z=17&output=embed`,
    directions: business.social.googleMaps
      ? business.social.googleMaps
      : `https://www.google.com/maps/dir/?api=1&destination=${query}`,
    open: business.social.googleMaps || `https://www.google.com/maps/search/?api=1&query=${query}`,
  }
}

// Interactive Google Map (drag, zoom, street view). Loads only when scrolled near, so it never slows the first paint.
export default function MapEmbed({ className = '' }) {
  const l = mapLinks()
  const a = business.address
  return (
    <div className={className}>
      <div className="map-wrap">
        <iframe
          title={`Map showing ${business.name} in ${a.street}`}
          src={l.embed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <p className="map-links">
        <a href={l.directions} target="_blank" rel="noopener noreferrer"><MapPin className="ico" aria-hidden="true" />Get directions</a>
        <a href={l.open} target="_blank" rel="noopener noreferrer"><ExternalLink className="ico" aria-hidden="true" />Open in Google Maps</a>
      </p>
    </div>
  )
}
