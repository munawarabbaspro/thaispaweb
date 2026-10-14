// Prints the LCP element/breakdown and the biggest requests from a Lighthouse JSON report.
//   node scripts/lh-detail.mjs <report.json>
import fs from 'node:fs'

const j = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'))
const a = j.audits
const out = (...x) => console.log(...x)

const items = a['largest-contentful-paint-element']?.details?.items || []
const node = items.flatMap((i) => i.items || []).map((i) => i.node).find(Boolean)
out('LCP element:', node?.snippet?.slice(0, 160) || '(not reported)')

for (const k of ['lcp-breakdown-insight', 'render-blocking-insight']) {
  out('\n' + k, a[k]?.displayValue || '')
  for (const i of a[k]?.details?.items || []) {
    if (i.subpart) out('  ', i.subpart, Math.round(i.duration) + 'ms')
    else if (i.url) out('  ', i.url.split('/').slice(-1)[0], i.wastedMs + 'ms')
  }
}

out('\nBiggest requests:')
for (const r of (a['network-requests']?.details?.items || [])
  .filter((i) => i.transferSize > 15000)
  .sort((x, y) => y.transferSize - x.transferSize)
  .slice(0, 8)) {
  out('  ', Math.round(r.transferSize / 1024) + 'KB', r.url.split('/').slice(-1)[0].slice(0, 60))
}
out('\nmain thread:', a['mainthread-work-breakdown']?.displayValue, ' JS execution:', a['bootup-time']?.displayValue)
