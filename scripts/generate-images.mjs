// One command makes every site image and saves it, resized to WebP (<200 KB), in ./images-to-add
//
//   PowerShell:  $env:OPENAI_API_KEY="sk-..."; node scripts/generate-images.mjs
//   Test run:    node scripts/generate-images.mjs --only hero,problem-back
//   Redo one:    delete its file from images-to-add and run the command again (existing files are skipped)
//
// Uses OpenAI's image API (gpt-image-1). You pay OpenAI per image; "medium" quality is roughly a few US cents each.
// Your key stays on your computer. Never paste it into chat or commit it.

import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const KEY = process.env.OPENAI_API_KEY
const MODEL = process.env.IMAGE_MODEL || 'gpt-image-1'
const QUALITY = process.env.IMAGE_QUALITY || 'medium' // low | medium | high
const OUT = path.resolve('images-to-add')
const onlyArg = process.argv.find((a) => a.startsWith('--only'))
const only = onlyArg ? (onlyArg.includes('=') ? onlyArg.split('=')[1] : process.argv[process.argv.indexOf(onlyArg) + 1]).split(',') : null

const STYLE =
  'Bright airy lifestyle photography for a massage spa website. Soft natural window light, pale white and very light blue ' +
  'background, smooth dark basalt stones, white cotton linen, clear massage oil, subtle teal accents, shallow depth of ' +
  'field, 85mm lens, clean modern premium look, cool colour grade, high-key. Strict rules: never show any face, client is ' +
  'always covered with a towel, no text, no logos, no watermark, no signage, natural hands with exactly five fingers, no jewellery. '

// name, final pixel size, subject, optional crop position
const HERO = [1600, 1000]
const TILE = [720, 460]
const images = [
  ['hero', HERO, "Close photo of a therapist's hands massaging a shoulder of a client covered with a white towel, subject on the right third of the frame, the left half is empty pale white-blue space.", 'right'],
  ['premium', [1100, 760], 'Calm empty massage room, white linen bed, folded towels, dark stones on a tray, small green plant, large window light, symmetrical, no people.'],
  ['instant', [1100, 800], 'Flat-lay on a pale surface: smartphone with a blank chat screen, folded white towel, clear oil bottle, a dark stone, top view.'],
  ['luxury', [1400, 700], 'Wide panoramic row of five smooth dark basalt stones spaced on white linen, a little steam, bright high-key, empty space above.'],
  ['problem-shoulders', [900, 600], 'Tight crop of a bare shoulder and neck with two hands applying pressure, towel edge visible.'],
  ['problem-back', [900, 600], 'Tight crop of a bare back with hands spreading clear oil, towel at the hips.'],
  ['problem-sleep', [900, 600], 'Still life: white pillow, sprigs of lavender, a small glass aroma oil bottle, soft cool light, no people.'],
  ['problem-legs', [900, 600], "Tight crop of a client's feet resting on a white towel, therapist hands massaging the ankle."],
  ['tile-back-neck', TILE, 'Hands working the upper back and neck, tight crop, towel-covered client.'],
  ['tile-foot', TILE, 'Foot massage close-up, thumbs pressing the sole, oil sheen, white towel.'],
  ['tile-head-shoulder', TILE, 'View from behind of hands on shoulders and the base of the neck, towel-covered client.'],
  ['feature-wide', [800, 560], 'Minimal still life: a small sand timer beside a folded towel and a dark stone on a pale background.'],
  ['feature-back-neck', [700, 520], 'Back and neck close crop with a cool blue-white tone, soft shadows, towel edge.'],
  ['feature-week', [700, 480], 'Flat-lay of a paper appointment book (no readable text) and a pen next to a folded towel and a dark stone, pale background.'],
  ['thai-massage', HERO, 'Thai massage: client in loose cotton clothes lying on a mat, therapist leaning to gently stretch a leg.'],
  ['deep-tissue-massage', HERO, "Deep tissue massage: a therapist's forearm pressing slowly into a towel-covered client's back."],
  ['swedish-massage', HERO, 'Swedish massage: long gliding strokes with oil on a bare back, towel at the hips.'],
  ['aromatherapy-massage', HERO, 'Aromatherapy massage: diffuser with light mist, lavender, glass oil dropper bottle and a made bed with white linen, no people.'],
  ['hot-stone-massage', HERO, 'Hot stone massage: warm dark basalt stones lined along a towel-covered back, light steam.'],
  ['sports-massage', HERO, 'Sports massage: therapist hands working on a calf and hamstring of an athletic client, white towel.'],
  ['full-body-massage', HERO, 'Full body oil massage: calm room with a bed and white linen, hands applying oil on a covered client\'s back.'],
  ['head-shoulder-massage', HERO, 'Head and shoulder massage: hands on shoulders and neck from behind, towel-covered client.'],
  ['back-neck-massage', HERO, 'Back and neck massage: hands on the neck and upper back, towel-covered client.'],
  ['foot-massage', HERO, 'Foot massage: hands massaging a foot resting on a white towel, oil sheen.'],
]

if (!KEY) {
  console.error('\nOPENAI_API_KEY is not set.\nPowerShell:  $env:OPENAI_API_KEY="sk-..."; node scripts/generate-images.mjs\n')
  process.exit(1)
}

async function generate(prompt) {
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${KEY}` },
    body: JSON.stringify({ model: MODEL, prompt: STYLE + prompt, size: '1536x1024', quality: QUALITY, n: 1 }),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error?.message || `HTTP ${res.status}`)
  return Buffer.from(json.data[0].b64_json, 'base64')
}

// Crop to the slot's aspect ratio, resize, and lower quality until the file is under 200 KB.
async function toWebp(buf, [w, h], position = 'centre') {
  let q = 82
  let out
  do {
    out = await sharp(buf).resize(w, h, { fit: 'cover', position }).webp({ quality: q }).toBuffer()
    q -= 6
  } while (out.length > 200 * 1024 && q > 40)
  return out
}

await fs.mkdir(OUT, { recursive: true })
let done = 0
let failed = []
for (const [name, size, subject, position] of images) {
  if (only && !only.includes(name)) continue
  const file = path.join(OUT, `${name}.webp`)
  try {
    await fs.access(file)
    console.log(`skip   ${name} (already exists)`)
    continue
  } catch {}
  try {
    process.stdout.write(`make   ${name} ... `)
    const png = await generate(subject)
    const webp = await toWebp(png, size, position)
    await fs.writeFile(file, webp)
    console.log(`ok (${Math.round(webp.length / 1024)} KB)`)
    done++
  } catch (e) {
    console.log(`FAILED: ${e.message}`)
    failed.push(name)
  }
}
console.log(`\nFinished. ${done} created in ${OUT}${failed.length ? `\nFailed (run the command again to retry): ${failed.join(', ')}` : ''}`)
