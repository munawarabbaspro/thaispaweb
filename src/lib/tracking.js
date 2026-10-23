// Google tag: Google Ads conversion tracking (+ optional GA4).
// Conversion "Website Call or WhatsApp Click" in the Thai Spa Google Ads account.
//
// SPEED: the Google tag is ~150 KB of JavaScript, so it is NOT loaded with the page. It loads on the visitor's
// first scroll / touch / click / key press (or after 12 s as a safety net). Real visitors always interact before
// they tap Call or WhatsApp, so conversions are still counted, and the page's load score is not affected.
const ADS_ID = import.meta.env.VITE_ADS_ID || 'AW-17716557652'
const ADS_CONTACT_LABEL = import.meta.env.VITE_ADS_CONTACT_LABEL || 'XlnqCK6C2KYdENTu9P9B'
const GA_ID = import.meta.env.VITE_GA_ID

let started = false
let tagLoaded = false // script requested
let tagReady = false // script downloaded and running

function loadTag() {
  if (tagLoaded || window.gtag) return
  tagLoaded = true
  const s = document.createElement('script')
  s.async = true
  s.onload = () => { tagReady = true }
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + (ADS_ID || GA_ID)
  document.head.appendChild(s)
  window.dataLayer = window.dataLayer || []
  window.gtag = function () { window.dataLayer.push(arguments) }
  window.gtag('js', new Date())
  if (ADS_ID) window.gtag('config', ADS_ID)
  if (GA_ID) window.gtag('config', GA_ID)
}

// kind: 'call' | 'whatsapp' | 'form'. `done` runs once the conversion has been sent (or after a short timeout).
export function trackContact(kind, done) {
  if (typeof window === 'undefined') return
  let finished = false
  const finish = () => {
    if (finished) return
    finished = true
    if (done) done()
  }
  try {
    loadTag()
    if (ADS_ID && ADS_CONTACT_LABEL) {
      window.gtag('event', 'conversion', {
        send_to: ADS_ID + '/' + ADS_CONTACT_LABEL,
        value: 1.0,
        currency: 'PKR',
        event_callback: finish,
      })
    }
    if (GA_ID) window.gtag('event', 'contact_' + kind)
  } catch (e) { /* never break the page over tracking */ }
  if (done) setTimeout(finish, 900)
}

// Called once from App: loads the tag on first interaction and watches every tel: / wa.me link.
export function initTracking() {
  if (typeof window === 'undefined' || started) return () => {}
  started = true

  const first = ['pointerdown', 'touchstart', 'keydown', 'scroll', 'wheel']
  const onFirst = () => {
    first.forEach((t) => window.removeEventListener(t, onFirst))
    loadTag()
  }
  first.forEach((t) => window.addEventListener(t, onFirst, { passive: true, once: true }))
  const fallback = setTimeout(loadTag, 12000)

  const onClick = (e) => {
    const a = e.target instanceof Element ? e.target.closest('a[href]') : null
    if (!a) return
    const href = a.getAttribute('href') || ''
    if (href.startsWith('tel:')) {
      if (tagReady) {
        trackContact('call')
        return
      }
      // Tag not ready yet (the visitor tapped Call straight away): hold the dialer for a moment so the
      // conversion is sent first, then open it.
      e.preventDefault()
      trackContact('call', () => { window.location.href = href })
    } else if (/^https?:\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\//i.test(href)) {
      trackContact('whatsapp')
    }
  }
  document.addEventListener('click', onClick, true)
  return () => {
    first.forEach((t) => window.removeEventListener(t, onFirst))
    clearTimeout(fallback)
    document.removeEventListener('click', onClick, true)
    started = false
  }
}
