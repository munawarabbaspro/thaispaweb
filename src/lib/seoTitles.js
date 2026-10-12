import { keywordMap } from '../data/keywords'

const cap = (s) => s.replace(/\b[a-z]/g, (c) => c.toUpperCase())

// Title tag for a service page, built from its primary keyword. Under 70 characters.
export const serviceTitle = (slug) => {
  const p = keywordMap[`/services/${slug}`].primary
  const tail = p.includes('islamabad') ? 'Thai Spa, Bahria Town Phase 4' : 'Thai Spa, Islamabad'
  return `${cap(p)} | ${tail}`
}

// Natural-language H1 for a service page: "Thai Massage in Islamabad".
export const serviceLocation = (slug) => (keywordMap[`/services/${slug}`].primary.includes('islamabad') ? 'Islamabad' : 'Bahria Town')
