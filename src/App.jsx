import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import MobileActionBar from './components/layout/MobileActionBar'
import LocalBusinessSchema from './components/seo/LocalBusinessSchema'
import { bindChrome, bindTilt, reducedMotion } from './lib/chrome'
import { initTracking } from './lib/tracking'

export default function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    const offs = [bindChrome()]
    let cancelled = false
    // Smooth scroll (GSAP + Lenis) is desktop-only and loaded after first paint.
    if (!reducedMotion() && window.matchMedia('(min-width: 768px)').matches) {
      import('./lib/motion').then((m) => {
        if (!cancelled) offs.push(m.startSmoothScroll())
      })
    }
    return () => {
      cancelled = true
      offs.forEach((f) => f())
    }
  }, [])

  // Google Ads conversion tracking (+ GA4 if VITE_GA_ID is set): call and WhatsApp clicks.
  useEffect(() => initTracking(), [])

  useEffect(() => {
    window.scrollTo(0, 0)
    return bindTilt()
  }, [pathname])

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="loader" aria-hidden="true"><span className="loader-text" /><span className="caret" /></div>
      <div className="fog" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
      <LocalBusinessSchema />
      <a href="#main" className="sr-only">Skip to content</a>
      <Navbar />
      <main id="main" className="page-main">
        <Outlet />
      </main>
      <Footer />
      <MobileActionBar />
    </>
  )
}
