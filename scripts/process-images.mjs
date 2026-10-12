// Turns the 24 Gemini PNGs (input_file_0..23, in prompt order) into site-ready WebP files in public/images/.
//   node scripts/process-images.mjs "C:/Users/w/Downloads/massage_spa_website_images"
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const src = process.argv[2] || 'C:/Users/w/Downloads/massage_spa_website_images'
const out = path.resolve('public/images')
const HERO = [1600, 1000], TILE = [720, 460]
const slots = [
  ['hero', HERO, 'right'], ['premium', [1100, 760]], ['instant', [1100, 800]], ['luxury', [1400, 700]],
  ['problem-shoulders', [900, 600]], ['problem-back', [900, 600]], ['problem-sleep', [900, 600]], ['problem-legs', [900, 600]],
  ['tile-back-neck', TILE], ['tile-foot', TILE], ['tile-head-shoulder', TILE],
  ['feature-wide', [800, 560]], ['feature-back-neck', [700, 520]], ['feature-week', [700, 480]],
  ['thai-massage', HERO], ['deep-tissue-massage', HERO], ['swedish-massage', HERO], ['aromatherapy-massage', HERO],
  ['hot-stone-massage', HERO], ['sports-massage', HERO], ['full-body-massage', HERO],
  ['head-shoulder-massage', HERO], ['back-neck-massage', HERO], ['foot-massage', HERO],
]
await fs.mkdir(out, { recursive: true })
for (const [i, [name, [w, h], pos]] of slots.entries()) {
  let q = 80, buf
  do {
    buf = await sharp(path.join(src, `input_file_${i}.png`)).resize(w, h, { fit: 'cover', position: pos || 'centre' }).webp({ quality: q }).toBuffer()
    q -= 6
  } while (buf.length > 200 * 1024 && q > 40)
  await fs.writeFile(path.join(out, `${name}.webp`), buf)
  console.log(name.padEnd(24), `${w}x${h}`, `${Math.round(buf.length / 1024)} KB`)
}
