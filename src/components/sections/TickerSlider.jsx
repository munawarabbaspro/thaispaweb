import { useCallback, useEffect, useRef, useState } from 'react'

// The four short promises under the hero, as a slider: slides on its own, can be swiped or dragged,
// has dots, and works with the arrow keys. All slides stay in the HTML so the text is always crawlable.
export default function TickerSlider({ items, label = 'Why Thai Spa', interval = 3200 }) {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const [auto, setAuto] = useState(false)
  const start = useRef(null)
  const n = items.length

  const go = useCallback((k) => setI(((k % n) + n) % n), [n])

  useEffect(() => {
    setAuto(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (!auto || paused) return
    const id = setInterval(() => {
      if (!document.hidden) setI((v) => (v + 1) % n)
    }, interval)
    return () => clearInterval(id)
  }, [auto, paused, interval, n])

  const down = (e) => { start.current = e.clientX }
  const up = (e) => {
    if (start.current == null) return
    const dx = e.clientX - start.current
    start.current = null
    if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1))
  }
  const key = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1) }
  }

  return (
    <div
      className="ticker reveal"
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={key}
      onPointerDown={down}
      onPointerUp={up}
      onPointerCancel={() => { start.current = null }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <ul className="ticker-track" aria-live={auto && !paused ? 'off' : 'polite'}>
        {items.map((t, k) => (
          <li key={t} className={k === i ? 'is-active' : k < i ? 'is-past' : ''} aria-hidden={k === i ? undefined : 'true'}>
            {t}
          </li>
        ))}
      </ul>
      <div className="ticker-dots">
        {items.map((t, k) => (
          <button key={t} type="button" className={k === i ? 'is-active' : ''} aria-label={`Show message ${k + 1} of ${n}`} aria-current={k === i} onClick={() => go(k)} />
        ))}
      </div>
    </div>
  )
}
