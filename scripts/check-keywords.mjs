// Checks the built pages against src/data/keywords.js.   npm run keywords
//  - primary keyword is in the <title>, the <h1> and the first 100 words
//  - lists which secondary keywords were woven in and which were left out
//  - fails if a doNotTarget phrase, "home service" or any physiotherapy word is on the site
import fs from 'node:fs'
import path from 'node:path'
import { keywordMap, doNotTarget, physiotherapy } from '../src/data/keywords.js'

const norm = (s) =>
  s.toLowerCase().replace(/&amp;|&/g, ' and ').replace(/[^a-z0-9؀-ۿ\s]/g, ' ').replace(/\b(in|a|the)\b/g, ' ').replace(/\s+/g, ' ').trim()
const strip = (h) => h.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/\s+/g, ' ')

const problems = []
for (const [route, k] of Object.entries(keywordMap)) {
  const file = path.join('dist', route === '/' ? '' : route, 'index.html')
  const html = fs.readFileSync(file, 'utf8')
  const title = (html.match(/<title[^>]*>([^<]*)/) || [])[1] || ''
  const h1 = strip((html.match(/<h1[\s\S]*?<\/h1>/) || [''])[0])
  const main = strip((html.match(/<main[\s\S]*?<\/main>/) || [''])[0])
  const first100 = main.split(' ').filter(Boolean).slice(0, 100).join(' ')
  const p = norm(k.primary)
  const inTitle = norm(title).includes(p)
  const inH1 = norm(h1).includes(p)
  const in100 = norm(first100).includes(p)
  const body = norm(main)
  const used = k.secondary.filter((s) => body.includes(norm(s)))
  const left = k.secondary.filter((s) => !body.includes(norm(s)))
  const count = body.split(p).length - 1
  console.log(`\n${route}\n  primary: "${k.primary}"  title:${inTitle ? 'yes' : 'NO'}  h1:${inH1 ? 'yes' : 'NO'}  first100:${in100 ? 'yes' : 'NO'}  uses:${count}`)
  console.log(`  title : ${title.replace(/&amp;/g, '&')}\n  h1    : ${h1}\n  used  : ${used.join(' | ') || '-'}\n  left  : ${left.join(' | ') || '-'}`)
  if (!inTitle) problems.push(`${route}: primary missing from title`)
  if (!inH1) problems.push(`${route}: primary missing from H1`)
  if (!in100) problems.push(`${route}: primary missing from first 100 words`)
  if (count > 6) problems.push(`${route}: primary used ${count} times (stuffing risk)`)
}

// banned phrases anywhere in the built site
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith('.html') ? [path.join(d, e.name)] : []))
const banned = [...doNotTarget, 'home service', 'physiotherap', 'physio ', 'roomy']
for (const f of walk('dist')) {
  // the nav legitimately reads "Home" next to "Services", so header/nav are excluded from this scan
  const raw = fs.readFileSync(f, 'utf8').replace(/<header[\s\S]*?<\/header>/g, ' ').replace(/<nav[\s\S]*?<\/nav>/g, ' ')
  const text = norm(strip(raw))
  for (const b of banned) if (text.includes(norm(b))) problems.push(`${path.relative('dist', f)}: contains banned phrase "${b}"`)
}
if (physiotherapy.enabled) problems.push('physiotherapy cluster is enabled but the menu is massage only')

console.log(problems.length ? `\n${problems.length} PROBLEMS:\n- ${problems.join('\n- ')}` : '\nAll keyword rules satisfied. No banned phrases anywhere on the site.')
process.exit(problems.length ? 1 : 0)
