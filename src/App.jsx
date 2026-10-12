import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import MobileActionBar from './components/layout/MobileActionBar'
import LocalBusinessSchema from './components/seo/LocalBusinessSchema'
import { bindChrome, bindTilt, reducedMotion } from './lib/chrome'

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

  // GA4: loaded only when VITE_GA_ID is set, and only after first paint.
  useEffect(() => {
    const id = import.meta.env.VITE_GA_ID
    if (!id || window.gtag) return
    const load = () => {
      const s = document.createElement('script')
      s.async = true
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + id
      document.head.appendChild(s)
      window.dataLayer = window.dataLayer || []
      window.gtag = function () { window.dataLayer.push(arguments) }
      window.gtag('js', new Date())
      window.gtag('config', id)
    }
    ;('requestIdleCallback' in window ? window.requestIdleCallback : (f) => setTimeout(f, 2000))(load)
  }, [])

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
