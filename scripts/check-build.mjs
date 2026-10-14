// Audits dist/ from the files on disk: titles, descriptions, canonicals, headings, JSON-LD, images.
//   node scripts/check-build.mjs
import fs from 'node:fs'
import path from 'node:path'

const dist = path.resolve('dist')
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : e.name === 'index.html' ? [path.join(d, e.name)] : []))
const problems = []
const rows = []
for (const f of walk(dist)) {
  const rel = '/' + path.relative(dist, path.dirname(f)).split(path.sep).join('/')
  const url = rel === '/.' ? '/' : rel
  const h = fs.readFileSync(f, 'utf8')
  const bad = (m) => problems.push(`${url}: ${m}`)
  const title = (h.match(/<title[^>]*>([^<]*)/) || [])[1]?.replace(/&amp;/g, '&')
  const desc = (h.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/) || h.match(/<meta[^>]*content="([^"]*)"[^>]*name="description"/) || [])[1]
  if (!title) bad('no <title>')
  else if (title.length > 70) bad(`title is ${title.length} chars`)
  if (!desc) bad('no meta description')
  else if (desc.length < 70 || desc.length > 170) bad(`description is ${desc.length} chars`)
  if (!/<link[^>]*rel="canonical"[^>]*href="https:\/\/www\.thaispa\.pk/.test(h)) bad('canonical missing or not absolute')
  if (!/<meta[^>]*property="og:image"/.test(h)) bad('og:image missing')
  const h1s = (h.match(/<h1[\s>]/g) || []).length
  if (h1s !== 1) bad(`${h1s} <h1> tags`)
  const levels = [...h.matchAll(/<h([1-6])[\s>]/g)].map((m) => +m[1])
  levels.forEach((l, i) => { if (i && l - levels[i - 1] > 1) bad(`heading jump h${levels[i - 1]} to h${l}`) })
  // JSON-LD
  const blocks = [...h.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1])
  const types = []
  blocks.forEach((b, i) => {
    try {
      const j = JSON.parse(b)
      const t = [].concat(j['@type'])
      types.push(t.join('+'))
      if (!j['@context']) bad(`ld+json #${i} has no @context`)
      if (/AggregateRating|"Review"/.test(b)) bad('AggregateRating/Review found')
    } catch (e) { bad(`ld+json #${i} is not valid JSON`) }
  })
  if (!types.some((t) => t.includes('HealthAndBeautyBusiness'))) bad('no business schema')
  // images
  for (const m of h.matchAll(/<img\b[^>]*>/g)) {
    const tag = m[0]
    if (!/\balt=/.test(tag)) bad(`img without alt: ${tag.slice(0, 80)}`)
    if (!/\bwidth=/.test(tag) || !/\bheight=/.test(tag)) bad(`img without width/height: ${tag.slice(0, 80)}`)
  }
  if (/\{\{|undefined|\[object Object\]/.test(h.replace(/<script[\s\S]*?<\/script>/g, ''))) bad('stray template text in body')
  const bodyWords = h.match(/<main[\s\S]*?<\/main>/)?.[0].replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length || 0
  if (bodyWords < 150) bad(`only ${bodyWords} words in <main>`)
  rows.push(`${url.padEnd(44)} ${String(bodyWords).padStart(5)}w  ${types.join(', ')}`)
}
const big = fs.readdirSync('public/images').map((n) => [n, fs.statSync(path.join('public/images', n)).size]).filter(([, s]) => s > 200 * 1024)
big.forEach(([n, s]) => problems.push(`image ${n} is ${Math.round(s / 1024)} KB (>200)`))
console.log(rows.join('\n'))
console.log(problems.length ? `\n${problems.length} PROBLEMS:\n- ` + problems.join('\n- ') : '\nAll checks passed.')
process.exit(problems.length ? 1 : 0)
