// Makes smaller copies of every photo in public/images (name-480.webp, name-800.webp, name-1200.webp) so phones
// download a small file instead of the 1600px one. Run after adding or replacing a photo:
//   node scripts/make-responsive-images.mjs
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const dir = 'public/images'
const WIDTHS = [480, 800, 1200]
let made = 0
let saved = 0

for (const file of fs.readdirSync(dir)) {
  if (!file.endsWith('.webp') || /-\d+\.webp$/.test(file)) continue // originals only
  const src = path.join(dir, file)
  const meta = await sharp(src).metadata()
  for (const w of WIDTHS) {
    if (w >= meta.width) continue
    const out = path.join(dir, file.replace(/\.webp$/, `-${w}.webp`))
    const buf = await sharp(src).resize({ width: w }).webp({ quality: 76 }).toBuffer()
    fs.writeFileSync(out, buf)
    made++
    if (w === 800) saved += fs.statSync(src).size - buf.length
  }
}
console.log(`${made} smaller images written to ${dir} (an 800px phone image is on average ${Math.round(saved / 1024 / 22)} KB lighter than the original)`)
