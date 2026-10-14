import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)
export { gsap, ScrollTrigger }

import { reducedMotion, fmtCount, revealWithObserver } from './chrome'

const reduceQ = () => window.matchMedia('(prefers-reduced-motion: reduce)')
const wideQ = () => window.matchMedia('(min-width: 768px)')


// Smooth scroll, driven from the GSAP ticker so ScrollTrigger stays in step.
// Off under reduced motion and below 768px; native scroll is left alone otherwise,
// so keyboard tabbing and in-page anchors behave normally.
let activeLenis = null

export function startSmoothScroll() {
  const reduce = reduceQ()
  const wide = wideQ()
  let lenis = null
  let tick = null

  const start = () => {
    if (lenis || reduce.matches || !wide.matches) return
    lenis = new Lenis({ lerp: 0.09, anchors: true })
    activeLenis = lenis
    lenis.on('scroll', ScrollTrigger.update)
    tick = (t) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
  }
  const stop = () => {
    if (tick) gsap.ticker.remove(tick)
    lenis?.destroy()
    lenis = null
    activeLenis = null
    tick = null
  }
  const sync = () => (reduce.matches || !wide.matches ? stop() : start())

  start()
  reduce.addEventListener('change', sync)
  wide.addEventListener('change', sync)
  return () => {
    reduce.removeEventListener('change', sync)
    wide.removeEventListener('change', sync)
    stop()
  }
}

export function reveal(selectors) {
  gsap.utils.toArray(selectors.join(',')).forEach((el) =>
    gsap.from(el, { y: 50, autoAlpha: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } }))
}


function countUp(el, tl, scrollTrigger) {
  const o = { v: 0 }
  const { prefix = '', suffix = '', count } = el.dataset
  el.textContent = fmtCount(0, prefix, suffix)
  const vars = { v: +count, duration: tl ? 0.8 : 1.6, ease: 'power1.out', onUpdate: () => { el.textContent = fmtCount(o.v, prefix, suffix) } }
  if (tl) tl.to(o, vars, '<')
  else gsap.to(o, { ...vars, scrollTrigger })
}

// ---- Fog: clouds fill the screen while the next section scrolls in, then clear
function fog(trigger, i) {
  const layer = document.querySelector('.fog')
  if (!layer) return
  gsap.timeline({ scrollTrigger: { trigger, start: 'top 95%', end: 'top 5%', scrub: true } })
    .fromTo(layer, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1, ease: 'sine.in', immediateRender: false })
    .to(layer, { autoAlpha: 0, duration: 1, ease: 'sine.out' })
    .fromTo(layer.children, { xPercent: i % 2 ? 25 : -25, scale: 0.9 },
      { xPercent: i % 2 ? -25 : 25, scale: 1.15, duration: 2, ease: 'none', immediateRender: false }, 0)
}

// Section pinned for `length`; animation begins as soon as it scrolls into view.
function pinned(trigger, length = '+=140%') {
  const pin = ScrollTrigger.create({ trigger, start: 'top top', end: length, pin: true })
  return gsap.timeline({ scrollTrigger: { trigger, start: 'top 75%', end: () => pin.end, scrub: 1 } })
}

function heroIntro() {
  return gsap.timeline({ paused: true })
    .from('#nav-menu li, .nav-toggle', { y: -20, autoAlpha: 0, stagger: 0.06, duration: 0.6, ease: 'power3.out' }, 0)
    .from('.hero .clouds', { autoAlpha: 0, duration: 1.5 }, 0)
    .from('.hero .eyebrow', { y: 20, autoAlpha: 0, duration: 0.6 }, 0.1)
    .from('.hero .line > span', { yPercent: 115, duration: 1.1, stagger: 0.14, ease: 'power4.out' }, 0.15)
    .from('.hero .tagline, .hero .urdu-line, .hero .actions', { y: 24, autoAlpha: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out' }, 0.5)
    .from('.hero-car', { scale: 1.18, autoAlpha: 0, duration: 2.2, ease: 'power3.out' }, 0.2)
    .from('.quick-book', { y: 50, autoAlpha: 0, duration: 0.9, ease: 'power3.out' }, 0.8)
}

function heroScroll() {
  gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
    .to('.hero-text', { yPercent: -35, autoAlpha: 0, ease: 'none' }, 0)
    .to('.hero-car', { yPercent: 12, scale: 1.1, ease: 'none' }, 0)
    .to('.quick-book', { yPercent: -30, autoAlpha: 0, ease: 'none' }, 0)
}

function premiumScene() {
  fog('.premium', 0)
  pinned('.premium')
    .from('.ticker', { yPercent: 60, autoAlpha: 0, duration: 0.5 })
    .from('.premium .split-text > *', { x: -140, autoAlpha: 0, stagger: 0.1, duration: 0.6 }, '-=.2')
    .from('.premium .split-img', { xPercent: 70, autoAlpha: 0, duration: 0.9, ease: 'power2.out' }, '<')
    .to({}, { duration: 0.5 })
    .to('.premium .split-img', { xPercent: 25, yPercent: -45, scale: 0.9, autoAlpha: 0, duration: 0.7, ease: 'power2.in' })
    .to(['.ticker', '.premium .split-text'], { y: -40, autoAlpha: 0, duration: 0.5 }, '<.1')
}

function instantScene() {
  fog('.instant', 1)
  pinned('.instant')
    .from('.instant-img', { xPercent: -70, scale: 1.2, autoAlpha: 0, duration: 1, ease: 'power2.out' })
    .from('.instant-text > *', { x: 140, autoAlpha: 0, stagger: 0.1, duration: 0.6 }, '<.3')
    .to({}, { duration: 0.5 })
    .to('.instant-img', { scale: 1.45, xPercent: 15, autoAlpha: 0, duration: 0.8, ease: 'power2.in' })
    .to('.instant-text', { x: 60, autoAlpha: 0, duration: 0.5 }, '<')
}

function luxuryScene() {
  fog('.luxury', 2)
  const tl = pinned('.luxury')
    .from('.luxury-head h2, .luxury-head .lead, .luxury-head .btn', { y: 40, autoAlpha: 0, stagger: 0.1, duration: 0.5 })
    .from('.luxury-stage .eyebrow', { autoAlpha: 0, duration: 0.3 }, '<.2')
    .from('.mega span', { yPercent: 70, autoAlpha: 0, stagger: 0.06, duration: 0.5 }, '<')
    .from('.luxury-stage .media-ph, .luxury-stage img', { xPercent: 60, autoAlpha: 0, duration: 1, ease: 'power2.out' }, '<.1')
    .from('.lux-stats li', { y: 30, autoAlpha: 0, stagger: 0.1, duration: 0.4 }, '-=.5')
  document.querySelectorAll('.lux-stats [data-count]').forEach((el) => countUp(el, tl))
  tl.to({}, { duration: 0.5 })
}

function featuresScene() {
  fog('.features', 3)
  const grid = document.querySelector('.feature-grid')
  const wide = document.querySelector('.f-wide')
  if (!grid || !wide) return
  const origin = `${wide.offsetLeft + wide.offsetWidth / 2}px ${wide.offsetTop + wide.offsetHeight / 2}px`
  pinned('.features', '+=120%')
    .from(grid, { scale: 1.7, transformOrigin: origin, duration: 1.2, ease: 'power2.inOut' })
    .from('.f-brown, .f-wheel', { y: 80, autoAlpha: 0, stagger: 0.12, duration: 0.6 }, '<.3')
    .from('.f-ghost', { autoAlpha: 0, duration: 0.6 }, '<.2')
    .from('.features .stats li', { y: 30, autoAlpha: 0, stagger: 0.08, duration: 0.4 })
    .to({}, { duration: 0.3 })
}

function faqScene() {
  gsap.from('.faq h2 .w', { yPercent: 100, autoAlpha: 0, stagger: 0.05, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.faq', start: 'top 70%' } })
  gsap.from('.faq details', { y: 30, autoAlpha: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '.faq-list', start: 'top 85%' } })
}

// Typewriter name in the centre -> flies into the header logo -> hero builds in.
function playIntro(hero) {
  const root = document.documentElement
  const loader = document.querySelector('.loader')
  const logo = document.querySelector('.site-header .logo')
  if (!root.classList.contains('intro') || !loader || !logo) {
    root.classList.remove('intro')
    hero.play()
    return
  }

  const finish = () => {
    gsap.set(logo, { autoAlpha: 1 })
    loader.style.display = 'none'
    root.classList.remove('intro')
    root.style.overflow = ''
    activeLenis?.start()
  }

  gsap.set(logo, { autoAlpha: 0 })
  activeLenis?.stop()
  root.style.overflow = 'hidden'

  const text = loader.querySelector('.loader-text')
  const caret = loader.querySelector('.caret')
  const word = 'ThaiSpa'
  const split = 4 // "Thai" | "Spa"
  const o = { n: 0 }
  const render = () => {
    const n = Math.round(o.n)
    text.innerHTML = word.slice(0, Math.min(n, split)) + (n > split ? `<span>${word.slice(split, n)}</span>` : '')
  }

  gsap.timeline({ delay: 0.3 })
    .to(o, { n: word.length, duration: 1.1, ease: 'none', onUpdate: render })
    .to(caret, { autoAlpha: 0, duration: 0.2 }, '+=.35')
    .add(() => {
      const a = text.getBoundingClientRect()
      const b = logo.getBoundingClientRect()
      gsap.timeline({ onComplete: finish })
        .to(text, { x: b.left - a.left, y: b.top - a.top, scale: b.width / a.width, duration: 1, ease: 'power3.inOut' })
        .to(loader, { backgroundColor: 'rgba(246,250,253,0)', duration: 0.8, ease: 'power2.inOut' }, 0.2)
        .add(() => hero.play(), 0.45)
    })
}

// Phones and tablets: the same moves as the desktop scenes (photos sliding in, big word rising, cards zooming
// out), tied to scroll position but without pinning, so scrolling stays natural on touch screens.
function mobileScenes() {
  const scrub = (trigger, start = 'top 92%', end = 'top 42%') => ({ trigger, start, end, scrub: 0.6 })

  gsap.fromTo('.premium .split-img', { xPercent: 38, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, ease: 'none', scrollTrigger: scrub('.premium .split-img') })

  gsap.fromTo('.instant-img', { xPercent: -38, scale: 1.12, autoAlpha: 0 }, { xPercent: 0, scale: 1, autoAlpha: 1, ease: 'none', scrollTrigger: scrub('.instant-img') })
  gsap.from('.instant-text > *', { x: 50, autoAlpha: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.instant-text', start: 'top 88%' } })

  gsap.from('.mega span', { yPercent: 70, autoAlpha: 0, stagger: 0.06, ease: 'none', scrollTrigger: scrub('.luxury-stage', 'top 95%', 'top 55%') })
  gsap.fromTo('.luxury-stage .media-ph, .luxury-stage img', { xPercent: 34, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, ease: 'none', scrollTrigger: scrub('.luxury-stage', 'top 90%', 'top 40%') })
  gsap.from('.lux-stats li', { y: 30, autoAlpha: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: '.luxury-stage', start: 'top 70%' } })

  gsap.from('.feature-grid', { scale: 1.22, transformOrigin: '50% 25%', ease: 'none', scrollTrigger: scrub('.features', 'top 90%', 'top 20%') })
}

// Full homepage choreography. Pinned scenes on desktop, lighter reveals on tablet and phone.
export function initHomeMotion() {
  if (reducedMotion()) return revealWithObserver()

  // 1. The hero + intro start right away.
  const ctx = gsap.context(() => {
    const hero = heroIntro()
    heroScroll()
    playIntro(hero)
  })

  // 2. The scroll scenes are set up as soon as the browser is idle (the intro keeps scrolling locked for ~3s,
  //    and below-the-fold content is hidden by CSS until then, with a 4s failsafe).
  const setupScenes = () => {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.remove('reveal'))
    ctx.add(() => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 961px) and (min-height: 620px)', () => {
        premiumScene()
        instantScene()
        luxuryScene()
        reveal(['.fleet .section-head', '.cat-card', '.sub-head', '.fleet .car-tile', '.fleet .center-cta'])
        reveal(['.why .section-head', '.b', '.steps-wrap .section-head', '.step'])
        featuresScene()
        reveal(['.home-packages .section-head', '.pkg-mini', '.booking-inner'])
        faqScene()
      })
      mm.add('(max-width: 960px), (max-height: 619px)', () => {
        mobileScenes()
        reveal(['.ticker', '.split-text', '.luxury-head',
          '.section-head', '.cat-card', '.car-tile', '.f-card', '.stats', '.pkg-mini', '.booking-inner', '.b', '.step'])
        document.querySelectorAll('.lux-stats [data-count]').forEach((el) => countUp(el, null, { trigger: el, start: 'top 90%' }))
        faqScene()
      })
    })
    ScrollTrigger.refresh()
  }
  const ric = window.requestIdleCallback || ((fn) => setTimeout(fn, 250))
  const cancelRic = window.cancelIdleCallback || clearTimeout
  const idle = ric(setupScenes, { timeout: 800 })

  const onLoad = () => ScrollTrigger.refresh()
  window.addEventListener('load', onLoad)
  return () => {
    cancelRic(idle)
    window.removeEventListener('load', onLoad)
    ctx.revert()
  }
}
