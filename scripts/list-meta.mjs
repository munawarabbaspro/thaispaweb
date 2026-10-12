// Prints every page's title and meta description (read from dist/) and flags duplicates.  npm run meta
import fs from 'node:fs'
import path from 'node:path'

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : e.name === 'index.html' ? [path.join(d, e.name)] : []))
const rows = walk('dist').map((f) => {
  const h = fs.readFileSync(f, 'utf8')
  const url = '/' + path.relative('dist', path.dirname(f)).split(path.sep).join('/')
  return {
    url: url === '/.' || url === '/' ? '/' : url,
    title: h.match(/<title[^>]*>([^<]*)/)[1].replace(/&amp;/g, '&'),
    desc: (h.match(/name="description" content="([^"]*)/) || [])[1]?.replace(/&amp;/g, '&') || '',
  }
})
const seen = new Map()
let dups = 0
for (const r of rows) {
  for (const key of [r.title, r.desc]) {
    if (seen.has(key)) { dups++; console.log('DUPLICATE:', r.url, 'same as', seen.get(key)) }
    else seen.set(key, r.url)
  }
  console.log(`${r.url}\n  title (${r.title.length}): ${r.title}\n  meta  (${r.desc.length}): ${r.desc}`)
}
console.log(`\n${rows.length} pages, ${dups} duplicate titles/descriptions`)
