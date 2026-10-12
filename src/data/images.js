// Every photograph on the site. Files live in public/images (made by scripts/process-images.mjs).
// To swap a photo, replace the file with the same name. alt text is descriptive, not keyword-stuffed.
const spec = {
  'hero': [1600, 1000, 'Massage therapist applying oil to the back of a client in a bright treatment room'],
  'premium': [1100, 760, 'Spa host standing in a bright private treatment room with a made massage bed'],
  'instant': [1100, 800, 'Spa host at the desk holding a phone, with a folded towel and oil bottle beside her'],
  'luxury': [1400, 700, 'Female massage therapist massaging the back of a relaxed client in a bright treatment room'],
  'problem-shoulders': [900, 600, 'Massage therapist easing the neck and shoulder of a client resting under a towel'],
  'problem-back': [900, 600, 'Massage therapist working along the back of a client resting under a towel'],
  'problem-sleep': [900, 600, 'Client asleep on a white pillow with lavender and an aroma oil bottle beside her'],
  'problem-legs': [900, 600, 'Massage therapist massaging the lower leg of a client lying on a treatment bed'],
  'tile-back-neck': [720, 460, 'Therapist working on the upper back and neck of a client'],
  'tile-foot': [720, 460, 'Therapist massaging the foot of a client resting under a towel'],
  'tile-head-shoulder': [720, 460, 'Therapist with her hands on the shoulders of a seated client'],
  'feature-wide': [800, 560, 'Spa host holding a small sand timer beside a folded towel and a dark stone'],
  'feature-back-neck': [700, 520, 'Therapist massaging the back and neck of a client'],
  'feature-week': [700, 480, 'Spa host writing in an appointment book beside a folded towel and a dark stone'],
  'thai-massage': [1600, 1000, 'Therapist gently stretching the leg of a client lying on a mat in loose cotton clothes'],
  'deep-tissue-massage': [1600, 1000, 'Therapist using her forearm with slow, firm pressure on the back of a client'],
  'swedish-massage': [1600, 1000, 'Massage therapist using long oil strokes along the back of a relaxed client'],
  'aromatherapy-massage': [1600, 1000, 'Therapist massaging a client beside an aroma diffuser, lavender and oil dropper'],
  'hot-stone-massage': [1600, 1000, 'Therapist placing warm dark stones along the back of a client'],
  'sports-massage': [1600, 1000, 'Therapist massaging the calf of a client lying face down in athletic shorts'],
  'full-body-massage': [1600, 1000, 'Massage therapist applying oil to the back of a client covered with a towel'],
  'head-shoulder-massage': [1600, 1000, 'Massage therapist working on the shoulders of a seated client'],
  'back-neck-massage': [1600, 1000, 'Therapist spreading oil across the back and neck of a client'],
  'sleep-male': [1100, 760, 'Client asleep on a white pillow with lavender sprigs and an aroma oil bottle beside him'],
  'foot-massage': [1600, 1000, 'Massage therapist massaging the foot of a smiling, relaxed client'],
}

// Spread into <Media {...img('hero')} />. Unknown names fall back to the drawn graphic.
export const img = (name) => {
  const s = spec[name]
  if (!s) return {}
  return { src: `/images/${name}.webp`, width: s[0], height: s[1], alt: s[2] }
}
