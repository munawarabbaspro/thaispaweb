// Runs after the build. Reads every pre-rendered page in dist/ and writes dist/sitemap.xml (+ a copy in public/).
//
// SEO details:
//  - <lastmod> is honest: it only changes when a page's real content changes. A fingerprint of each
//    page's text is kept in scripts/sitemap-lastmod.json (commit that file). Google ignores sitemaps
//    that claim every page changed today.
//  - Blog posts use their datePublished/dateModified; /prices uses the "prices updated" date.
//  - Each URL lists the photographs on that page (<image:image>), which helps Google Images.
//  - URLs use ONE form (no trailing slash), matching canonicals and the _redirects rules.
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

const DOMAIN = 'https://www.thaispa.pk'
const dist = path.resolve('dist')
const stateFile = path.resolve('scripts/sitemap-lastmod.json')
const today = new Date().toISOString().slice(0, 10)
const state = fs.existsSync(stateFile) ? JSON.parse(fs.readFileSync(stateFile, 'utf8')) : {}

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name)
    return e.isDirectory() ? walk(p) : e.name === 'index.html' ? [p] : []
  })

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const textOf = (h) =>
  (h.match(/<main[\s\S]*?<\/main>/) || [''])[0].replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()

const pages = walk(dist)
  .map((f) => {
    const rel = path.relative(dist, path.dirname(f)).split(path.sep).join('/')
    const url = rel ? `/${rel}` : '/'
    const html = fs.readFileSync(f, 'utf8')
    return { url, html }
  })
  .filter((p) => p.url !== '/404')
  .sort((a, b) => a.url.length - b.url.length || a.url.localeCompare(b.url))

const newState = {}
const entries = pages.map(({ url, html }) => {
  // content fingerprint -> lastmod only moves when the text changes
  const hash = crypto.createHash('sha1').update(textOf(html)).digest('hex').slice(0, 12)
  let lastmod = state[url]?.hash === hash ? state[url].lastmod : today
  // explicit dates beat the fingerprint where the site knows them
  const modified = html.match(/"dateModified":"(\d{4}-\d{2}-\d{2})/)
  if (modified) lastmod = modified[1]
  newState[url] = { hash, lastmod }

  const images = [...new Set([...(html.match(/<main[\s\S]*?<\/main>/) || [''])[0].matchAll(/<img\b[^>]*\ssrc="(\/images\/[^"]+)"/g)].map((m) => m[1]))]
  const priority = url === '/' ? '1.0' : ['/services', '/prices', '/contact'].includes(url) || url.startsWith('/services/') ? '0.9' : url === '/sitemap' ? '0.3' : '0.7'
  return (
    `  <url>\n    <loc>${DOMAIN}${url === '/' ? '/' : url}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>` +
    images.map((i) => `\n    <image:image><image:loc>${DOMAIN}${esc(i)}</image:loc></image:image>`).join('') +
    '\n  </url>'
  )
})

const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n' +
  entries.join('\n') +
  '\n</urlset>\n'

fs.writeFileSync(path.join(dist, 'sitemap.xml'), xml)
fs.mkdirSync('public', { recursive: true })
fs.writeFileSync('public/sitemap.xml', xml)
fs.writeFileSync(stateFile, JSON.stringify(newState, null, 2) + '\n')
const imgCount = (xml.match(/<image:image>/g) || []).length
console.log(`sitemap.xml: ${pages.length} URLs, ${imgCount} image entries`)
