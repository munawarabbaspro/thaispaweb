// The Urdu web font (Noto Nastaliq Urdu) is huge (~150 KB), so index.html asks Google Fonts for ONLY the
// letters the site actually uses. If you add new Urdu words, run this and paste the output over the
// `&text=...` part of the Urdu <link> in index.html:
//   node scripts/urdu-font-text.mjs
import fs from 'node:fs'
import path from 'node:path'

const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(d, e.name)) : /\.(jsx?|html)$/.test(e.name) ? [path.join(d, e.name)] : [],
  )
const set = new Set()
for (const f of [...walk('src'), 'index.html']) {
  for (const ch of fs.readFileSync(f, 'utf8')) {
    const c = ch.codePointAt(0)
    if ((c >= 0x600 && c <= 0x6ff) || (c >= 0xfb50 && c <= 0xfdff) || (c >= 0xfe70 && c <= 0xfeff) || c === 0x200c || c === 0x200d) set.add(ch)
  }
}
const text = [...set].join('') + ' '
console.log(`${set.size} Urdu letters in use:\n${[...set].join(' ')}\n`)
console.log(`&text=${encodeURIComponent(text)}`)
