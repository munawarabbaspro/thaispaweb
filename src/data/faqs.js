import { business, formatHours, hoursLabel } from './business'
import { fullBodyRates, formatPrice, minPrice } from './services'

// Only facts the owner has confirmed. Policies not yet confirmed (cancellation window,
// tax, tipping, walk-ins) are deliberately NOT answered here — add them once known.
const hours = business.hours.map((b) => `${hoursLabel(b)} ${formatHours(b)}`).join(', ')
const rate60 = fullBodyRates.find((r) => r.minutes === 60).price

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
    a: `We are open seven days: ${hours}.`,
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
