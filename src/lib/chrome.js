// Light-weight behaviour that every visitor gets. No animation library in here, so phones
// never download GSAP or Lenis (those live in motion.js, loaded on desktop only).

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Desktop-class screens get the pinned, scroll-scrubbed scenes. Everyone else gets simple fades.
export const wantsScenes = () =>
  !reducedMotion() && window.matchMedia('(min-width: 961px) and (min-height: 620px)').matches

// Header state + scroll progress bar
export function bindChrome() {
  const header = document.querySelector('.site-header')
  const progress = document.querySelector('.scroll-progress')
  let ticking = false
  const update = () => {
    ticking = false
    header?.classList.toggle('scrolled', window.scrollY > 30)
    const max = document.documentElement.scrollHeight - window.innerHeight
    if (progress && max > 0) progress.style.setProperty('--p', Math.min(1, window.scrollY / max).toFixed(4))
  }
  const onScroll = () => {
    if (!ticking) {
      ticking = true
      requestAnimationFrame(update)
    }
  }
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
  return () => window.removeEventListener('scroll', onScroll)
}

// Pointer-device card tilt
export function bindTilt(root = document) {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || reducedMotion()) return () => {}
  const offs = []
  root.querySelectorAll('[data-tilt]').forEach((el) => {
    const move = (e) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      el.style.transform = `perspective(900px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 9).toFixed(2)}deg) translateY(-4px)`
    }
    const leave = () => { el.style.transform = '' }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    offs.push(() => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave) })
  })
  return () => offs.forEach((f) => f())
}

// Simple fade-in on scroll (phones, tablets, reduced motion)
export function revealWithObserver(root = document) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
    })
  }, { threshold: 0.12 })
  root.querySelectorAll('.reveal').forEach((el) => io.observe(el))
  return () => io.disconnect()
}

export const fmtCount = (v, prefix = '', suffix = '') => `${prefix}${Math.round(v).toLocaleString('en-US')}${suffix}`

// Number count-up when scrolled into view (no library)
export function countUpOnView(root = document) {
  const els = [...root.querySelectorAll('[data-count]')]
  if (!els.length) return () => {}
  const run = (el) => {
    const { prefix = '', suffix = '', count } = el.dataset
    const end = +count
    const t0 = performance.now()
    const dur = 1400
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur)
      el.textContent = fmtCount(end * (1 - Math.pow(1 - p, 2)), prefix, suffix)
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target) } })
  }, { threshold: 0.6 })
  els.forEach((el) => io.observe(el))
  return () => io.disconnect()
}
