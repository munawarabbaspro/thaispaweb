// Runs after `vite-react-ssg build`:
//  1. moves <meta charset> + viewport to the very top of <head> (browsers need charset in the first 1024 bytes)
//  2. loads the Google Fonts stylesheet without blocking first paint
//  3. writes sitemap.xml
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

const dist = path.resolve('dist')
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith('.html') ? [path.join(d, e.name)] : []))

// Inline the site stylesheet into every page (one fewer request in the critical path; ~13 KB gzipped per page).
const cssFiles = fs.readdirSync(path.join(dist, 'assets')).filter((n) => n.endsWith('.css'))
const cssByName = Object.fromEntries(cssFiles.map((n) => [n, fs.readFileSync(path.join(dist, 'assets', n), 'utf8')]))
const inlineCss = (html) =>
  html.replace(/<link\s+rel="stylesheet"[^>]*?href="\/assets\/([^"]+\.css)"[^>]*>/g, (tag, name) =>
    cssByName[name] && !cssByName[name].includes('</style') ? `<style data-inlined="${name}">${cssByName[name]}</style>` : tag,
  )

for (const f of walk(dist)) {
  let h = fs.readFileSync(f, 'utf8')
  const charset = /<meta charset="UTF-8"\s*\/?>/i
  const viewport = /<meta name="viewport"[^>]*>/i
  const c = h.match(charset)?.[0] || '<meta charset="UTF-8">'
  const v = h.match(viewport)?.[0] || '<meta name="viewport" content="width=device-width, initial-scale=1">'
  h = h.replace(charset, '').replace(viewport, '').replace(/<head([^>]*)>/i, `<head$1>${c}${v}`)
  // non-blocking Google Fonts
  h = h.replace(/<link\s+href="(https:\/\/fonts\.googleapis\.com\/css2[^"]+)"\s+rel="stylesheet"\s*\/?>/gi, (_, href) =>
    `<link rel="preload" as="style" href="${href}" onload="this.onload=null;this.rel='stylesheet'"><noscript><link rel="stylesheet" href="${href}"></noscript>`)
  h = inlineCss(h)
  fs.writeFileSync(f, h)
}
// One URL form for Netlify: /about serves the page (200), /about/ redirects to /about, so canonical, sitemap and links all agree.
const routes = walk(dist).map((f) => path.relative(dist, path.dirname(f)).split(path.sep).join('/')).filter((r) => r && r !== '404')
const rules = routes.map((r) => `/${r}/ /${r} 301!\n/${r} /${r}/index.html 200!`)
fs.writeFileSync(path.join(dist, '_redirects'), rules.join('\n') + '\n')
console.log(`postbuild: processed ${walk(dist).length} html files`)
execFileSync(process.execPath, ['scripts/generate-sitemap.mjs'], { stdio: 'inherit' })
