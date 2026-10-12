import { Link } from 'react-router-dom'
import { getService, formatPrice } from '../data/services'

// Inline syntax inside post text:
//   [label](/path)             internal link
//   {{price:slug:minutes}}     live price from services.js, e.g. {{price:back-neck-massage:30}}
export function priceToken(slug, minutes) {
  const rate = getService(slug)?.rates.find((r) => r.minutes === Number(minutes))
  return rate ? formatPrice(rate.price) : ''
}

export const plain = (text) =>
  text
    .replace(/\{\{price:([a-z-]+):(\d+)\}\}/g, (_, s, m) => priceToken(s, m))
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')

export function RichText({ text }) {
  const withPrices = text.replace(/\{\{price:([a-z-]+):(\d+)\}\}/g, (_, s, m) => priceToken(s, m))
  const parts = []
  const re = /\[([^\]]+)\]\((\/[^)]*)\)/g
  let last = 0
  let m
  while ((m = re.exec(withPrices))) {
    if (m.index > last) parts.push(withPrices.slice(last, m.index))
    parts.push(<Link key={m.index} to={m[2]}>{m[1]}</Link>)
    last = m.index + m[0].length
  }
  if (last < withPrices.length) parts.push(withPrices.slice(last))
  return <>{parts}</>
}
