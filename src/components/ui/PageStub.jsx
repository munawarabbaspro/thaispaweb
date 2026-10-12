import Seo from '../seo/Seo'
import BreadcrumbSchema from '../seo/BreadcrumbSchema'
import PageHero from './PageHero'

// Temporary shell for routes built in later phases. Real title/meta/H1 already in place.
export default function PageStub({ title, description, path, h1, crumb, children }) {
  const words = h1.split(' ')
  const cut = Math.ceil(words.length / 2)
  return (
    <div className="page">
      <Seo title={title} description={description} path={path} />
      <BreadcrumbSchema items={crumb} />
      <PageHero crumbs={crumb} light={words.slice(0, cut).join(' ')} bold={words.slice(cut).join(' ')} />
      {children}
    </div>
  )
}
