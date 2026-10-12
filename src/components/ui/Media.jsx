// Photo slot. Until a real photograph is supplied it draws the contour graphic,
// so the page looks finished with zero images. Never fill a slot with unrelated stock.
function Contours({ dark, seed = 0 }) {
  const stroke = dark ? 'rgba(255,255,255,.38)' : 'rgba(10,125,175,.30)'
  const dot = dark ? '#fff' : '#0a79ad'
  const cx = 250 + ((seed * 47) % 120) - 40
  const cy = 120 + ((seed * 31) % 50) - 20
  const rings = [210, 178, 148, 120, 94, 70, 48]
  return (
    <svg viewBox="0 0 500 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g transform={`rotate(${-18 - seed * 7} ${cx} ${cy})`} fill="none" stroke={stroke} strokeWidth="1.2">
        {rings.map((rx) => (
          <ellipse key={rx} cx={cx} cy={cy} rx={rx} ry={rx * 0.58} />
        ))}
      </g>
      <circle cx={cx} cy={cy} r="13" fill="none" stroke={dot} strokeWidth="1.3" />
      <circle cx={cx} cy={cy} r="3.6" fill={dot} />
    </svg>
  )
}

export default function Media({ src, alt = '', width, height, dark = false, eager = false, seed = 0 }) {
  if (src) {
    // Use <picture> to serve WebP when supported and provide srcSet for responsive sizes.
    const srcSet = `${src} 1x, ${src.replace(/(\.[^.]+)$/, '@2x$1')} 2x`
    const webpSrcSet = srcSet.replace(/(\.[^.]+)$/, '.webp')
    return (
      <picture>
        <source type="image/webp" srcSet={webpSrcSet} />
        <img
          src={src}
          srcSet={srcSet}
          alt={alt}
          width={width}
          height={height}
          loading={eager ? undefined : 'lazy'}
          fetchpriority={eager ? 'high' : undefined}
          decoding="async"
        />
      </picture>
    )
  }
  return (
    <div className={`media-ph${dark ? ' dark' : ''}`} aria-hidden="true">
      <Contours dark={dark} seed={seed} />
    </div>
  )
}
