// Broken-link check over the built site (dist/). Run after `npm run build`:  npm run links
// Checks every <a href>, <img src>, <script src>, <link href> that points inside the site, plus #anchors.
import fs from 'node:fs'
import path from 'node:path'

const dist = path.resolve('dist')
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]))
const files = walk(dist)
const htmlFiles = files.filter((f) => f.endsWith('.html') && !f.endsWith('404.html'))

const exists = (urlPath) => {
  const p = decodeURIComponent(urlPath).replace(/\/+$/, '') || '/'
  const abs = path.join(dist, p)
  return fs.existsSync(abs) && (fs.statSync(abs).isFile() || fs.existsSync(path.join(abs, 'index.html')))
}

const problems = []
const external = new Map()
let checked = 0

for (const f of htmlFiles) {
  const page = '/' + path.relative(dist, path.dirname(f)).split(path.sep).join('/')
  const pageUrl = page === '/.' ? '/' : page
  const html = fs.readFileSync(f, 'utf8')
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))
  const bad = (m) => problems.push(`${pageUrl}: ${m}`)

  for (const m of html.matchAll(/<(a|img|script|link)\b[^>]*?\s(href|src)="([^"]*)"/g)) {
    let url = m[3].replace(/&amp;/g, '&')
    if (!url || /^(tel:|mailto:|data:|javascript:)/.test(url)) continue
    checked++
    if (/^https?:\/\//.test(url)) {
      if (!url.startsWith('https://thaispas.pk')) {
        const host = new URL(url).host
        external.set(host, (external.get(host) || 0) + 1)
        if (url.startsWith('http://')) bad(`insecure http link: ${url.slice(0, 70)}`)
        continue
      }
      url = url.replace('https://thaispas.pk', '') || '/'
    }
    if (url.startsWith('#')) {
      if (url !== '#' && !ids.has(url.slice(1))) bad(`anchor ${url} has no matching id`)
      continue
    }
    const [pathname, hash] = url.split('#')
    const clean = pathname.split('?')[0]
    const target = clean.startsWith('/') ? clean : path.posix.join(pageUrl, clean)
    if (!exists(target)) bad(`broken ${m[1]} ${m[2]}: ${url}`)
    else if (hash && /\.html$|\/$/.test(target + '') === false) {
      const tf = fs.existsSync(path.join(dist, target, 'index.html')) ? path.join(dist, target, 'index.html') : null
      if (tf && !new RegExp(`\\sid="${hash}"`).test(fs.readFileSync(tf, 'utf8'))) bad(`anchor #${hash} missing on ${target}`)
    }
  }
}

console.log(`${htmlFiles.length} pages, ${checked} links/assets checked.`)
console.log('External hosts linked:', [...external].map(([h, n]) => `${h} (${n})`).join(', ') || 'none')
console.log(problems.length ? `\n${problems.length} PROBLEMS:\n- ` + [...new Set(problems)].join('\n- ') : '\nNo broken links or anchors.')
process.exit(problems.length ? 1 : 0)
