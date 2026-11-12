import { business, formatHours, hoursLabel, isAllDay } from './business'
import { fullBodyRates, formatPrice, minPrice } from './services'

// Only facts the owner has confirmed. Policies not yet confirmed (cancellation window,
// tax, tipping, walk-ins) are deliberately NOT answered here — add them once known.
const hours = business.hours.map((b) => `${hoursLabel(b)} ${formatHours(b)}`).join(', ')
const rate60 = fullBodyRates.find((r) => r.minutes === 60).price
const rate30 = fullBodyRates.find((r) => r.minutes === 30).price

export const faqs = [
  {
    q: 'How much does a massage cost?',
    a: `A 60-minute full-body massage is ${formatPrice(rate60)}. Shorter sessions start at ${formatPrice(minPrice)} for 30 minutes of back and neck or foot massage. Every price is on the prices page.`,
  },
  {
    q: 'Where is Thai Spa?',
    a: `${business.address.street}, ${business.address.landmark}, ${business.address.city}. We welcome clients from across Bahria Town, DHA, Rawalpindi and Islamabad. Call ${business.phone} if you need directions.`,
  },
  {
    q: 'What are your opening hours?',
    a: business.hours.every(isAllDay) ? 'We are open 24 hours a day, seven days a week.' : `We are open seven days: ${hours}.`,
  },
  {
    q: 'Is there a massage centre in Bahria Town Phase 4?',
    a: `Yes. Thai Spa is at ${business.address.street}, ${business.address.landmark}. We offer Thai, deep tissue, Swedish, aromatherapy, hot stone, sports and full body massage in private rooms, plus shorter back and neck, head and shoulder, and foot massage.`,
  },
  {
    q: 'What is the price of a 30 minute massage in Islamabad?',
    a: `At Thai Spa a 30-minute full-body massage is ${formatPrice(rate30)}, and a 30-minute back and neck or foot massage is ${formatPrice(minPrice)}. Every price is on the prices page.`,
  },
  {
    q: 'Do all your full-body massages cost the same?',
    a: `Yes. Thai, deep tissue, Swedish, aromatherapy, hot stone, sports, full body and the full body massage for men all share one rate card: ${fullBodyRates.map((r) => `${r.minutes} minutes ${formatPrice(r.price)}`).join(', ')}.`,
  },
  {
    q: 'Thai massage or deep tissue massage: which one should I book?',
    a: 'Book Thai massage if you feel stiff and tight; it is done on a mat in loose cotton clothes with gentle stretches. Book deep tissue if you have knots that keep coming back; it uses slow, firm pressure on one area at a time. They cost the same.',
  },
  {
    q: "I don't know which massage to choose. What should I book?",
    a: 'Tell us where it hurts and what your week looks like. If you are still unsure, book the Full Body Massage — our standard oil massage — or start with thirty minutes of back and neck.',
  },
  {
    q: 'Is this my first massage? What should I expect?',
    a: 'Every session starts with a couple of minutes of questions, in a private room with fresh linen. You are covered with a towel throughout and can ask for more or less pressure at any time.',
  },
  {
    q: 'Who should not book a massage?',
    a: 'Please check with your doctor first if you are pregnant, have had a recent fracture or surgery, have a fever or infection, have uncontrolled blood pressure, or are being treated by a doctor for the problem. If a doctor is treating you for it, ask them first.',
  },
]
