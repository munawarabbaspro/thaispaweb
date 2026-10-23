// Google tag: Google Ads conversion tracking (+ optional GA4).
// Loaded after first paint so it never blocks rendering.
// Conversion "Website Call or WhatsApp Click" in the Thai Spa Google Ads account.
const ADS_ID = import.meta.env.VITE_ADS_ID || 'AW-17716557652'
const ADS_CONTACT_LABEL = import.meta.env.VITE_ADS_CONTACT_LABEL || 'XlnqCK6C2KYdENTu9P9B'
const GA_ID = import.meta.env.VITE_GA_ID

let started = false

function loadTag() {
  if (window.gtag) return
  const s = document.createElement('script')
  s.async = true
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + (ADS_ID || GA_ID)
  document.head.appendChild(s)
  window.dataLayer = window.dataLayer || []
  window.gtag = function () { window.dataLayer.push(arguments) }
  window.gtag('js', new Date())
  if (ADS_ID) window.gtag('config', ADS_ID)
  if (GA_ID) window.gtag('config', GA_ID)
}

// kind: 'call' | 'whatsapp' | 'form'
export function trackContact(kind) {
  if (typeof window === 'undefined') return
  try {
    loadTag()
    if (ADS_ID && ADS_CONTACT_LABEL) {
      window.gtag('event', 'conversion', {
        send_to: ADS_ID + '/' + ADS_CONTACT_LABEL,
        value: 1.0,
        currency: 'PKR',
      })
    }
    if (GA_ID) window.gtag('event', 'contact_' + kind)
  } catch (e) { /* never break the page over tracking */ }
}

// Called once from App: loads the tag when idle and watches every tel: / wa.me link.
export function initTracking() {
  if (typeof window === 'undefined' || started) return () => {}
  started = true
  const idle = 'requestIdleCallback' in window ? window.requestIdleCallback : (f) => setTimeout(f, 2000)
  idle(loadTag)

  const onClick = (e) => {
    const a = e.target instanceof Element ? e.target.closest('a[href]') : null
    if (!a) return
    const href = a.getAttribute('href') || ''
    if (href.startsWith('tel:')) trackContact('call')
    else if (/^https?:\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\//i.test(href)) trackContact('whatsapp')
  }
  document.addEventListener('click', onClick, true)
  return () => {
    document.removeEventListener('click', onClick, true)
    started = false
  }
}
