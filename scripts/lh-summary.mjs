import fs from 'node:fs'
for (const f of process.argv.slice(2)) {
  const j = JSON.parse(fs.readFileSync(f, 'utf8'))
  const a = j.audits
  console.log(f.split(/[\/]/).pop(), Object.entries(j.categories).map(([k, v]) => `${k}:${Math.round(v.score * 100)}`).join(' '),
    '| LCP', a['largest-contentful-paint'].displayValue, 'CLS', a['cumulative-layout-shift'].displayValue, 'TBT', a['total-blocking-time'].displayValue, 'FCP', a['first-contentful-paint'].displayValue)
  for (const [k, v] of Object.entries(a)) if (v.score !== null && v.score < 0.9 && !['informative', 'notApplicable', 'manual'].includes(v.scoreDisplayMode)) console.log('  -', k, v.score, v.displayValue || '')
}
