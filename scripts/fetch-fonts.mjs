// One-off: download the exact web fonts the site already uses (Inter, Sora, Noto Nastaliq Urdu subset) from Google Fonts
// and write them to public/fonts/, so the site serves them itself (no third-party connections, no CSS->font chain).
// All three are SIL Open Font License fonts (free to self-host).
import fs from 'node:fs'
import path from 'node:path'

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
const get = async (url) => (await fetch(url, { headers: { 'User-Agent': UA } })).text()
const getBin = async (url) => Buffer.from(await (await fetch(url, { headers: { 'User-Agent': UA } })).arrayBuffer())

const blocks = (css) =>
  [...css.matchAll(/\/\*\s*([\w-]+)\s*\*\/\s*@font-face\s*\{([\s\S]*?)\}/g)].map((m) => ({
    subset: m[1],
    family: (m[2].match(/font-family:\s*'([^']+)'/) || [])[1],
    weight: (m[2].match(/font-weight:\s*([^;]+);/) || [])[1],
    url: (m[2].match(/url\((https:[^)]+)\)/) || [])[1],
    range: (m[2].match(/unicode-range:\s*([^;]+);/) || [])[1],
  }))

fs.mkdirSync('public/fonts', { recursive: true })
const out = []

// Inter + Sora: latin subset only
const css = await get('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Sora:wght@300;600;700;800&display=swap')
for (const fam of ['Inter', 'Sora']) {
  const latin = blocks(css).filter((b) => b.family === fam && b.subset === 'latin')
  if (!latin.length) throw new Error('no latin block for ' + fam)
  const urls = [...new Set(latin.map((b) => b.url))]
  console.log(fam, 'latin urls:', urls.length, latin.map((b) => b.weight).join(','))
  if (urls.length !== 1) throw new Error(fam + ' is not a single variable file; handle each weight')
  const file = `${fam.toLowerCase()}-latin.woff2`
  fs.writeFileSync(path.join('public/fonts', file), await getBin(urls[0]))
  out.push({ fam, file, range: latin[0].range, weights: latin.map((b) => Number(b.weight)) })
}

// Urdu: only the letters the site actually uses (found by scanning src/ and index.html)
const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(d, e.name)) : /\.(jsx?|html)$/.test(e.name) ? [path.join(d, e.name)] : [],
  )
const letters = new Set()
for (const f of [...walk('src'), 'index.html']) {
  for (const ch of fs.readFileSync(f, 'utf8')) {
    const c = ch.codePointAt(0)
    if ((c >= 0x600 && c <= 0x6ff) || (c >= 0xfb50 && c <= 0xfdff) || (c >= 0xfe70 && c <= 0xfeff) || c === 0x200c || c === 0x200d) letters.add(ch)
  }
}
console.log('Urdu letters in use:', letters.size)
const href = 'https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400&display=swap&text=' + encodeURIComponent([...letters].join('') + ' ')
const ucss = await get(href.replace(/&amp;/g, '&'))
const ub = [...ucss.matchAll(/@font-face\s*\{([\s\S]*?)\}/g)].map((m) => (m[1].match(/url\((https:[^)]+)\)/) || [])[1]).filter(Boolean)
if (ub.length !== 1) throw new Error('expected one Urdu font file, got ' + ub.length)
fs.writeFileSync('public/fonts/urdu-subset.woff2', await getBin(ub[0]))
out.push({ fam: 'Noto Nastaliq Urdu', file: 'urdu-subset.woff2' })

for (const f of fs.readdirSync('public/fonts')) console.log(f.padEnd(24), Math.round(fs.statSync(path.join('public/fonts', f)).size / 1024) + ' KB')
fs.writeFileSync(path.join(process.env.TEMP, 'fonts-meta.json'), JSON.stringify(out, null, 2))
