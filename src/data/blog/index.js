import whichMassageForBackPain from './which-massage-for-back-pain'
import deskJob from './desk-job-shoulder-pain-islamabad'
import howOften from './how-often-should-you-get-a-massage'
import whichMassage from './which-massage-should-i-choose'
import sleep from './massage-and-sleep'
import firstMassage from './first-massage-what-to-expect'

// Posts are structured block arrays (h2, h3, p, ul, callout) — never raw HTML.
export const posts = [whichMassage, whichMassageForBackPain, deskJob, howOften, sleep, firstMassage]

export const getPost = (slug) => posts.find((p) => p.slug === slug)

export const wordCount = (post) =>
  post.blocks.reduce((n, b) => n + (Array.isArray(b.v) ? b.v.join(' ') : b.v).split(/\s+/).filter(Boolean).length, 0)

export const readMinutes = (post) => Math.max(1, Math.round(wordCount(post) / 200))
