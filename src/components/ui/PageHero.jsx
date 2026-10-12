import { Link } from 'react-router-dom'

// Inner-page header: breadcrumb, display H1 (light + bold line), optional intro.
export default function PageHero({ crumbs = [], light, bold, intro, children }) {
  return (
    <section className="page-hero">
      <div className="clouds" aria-hidden="true"><i className="c c1" /><i className="c c3" /></div>
      <nav className="crumbs" aria-label="Breadcrumb">
        <ol>
          <li><Link to="/">Home</Link></li>
          {crumbs.map((c, i) => (
            <li key={c.to || c.name} {...(i === crumbs.length - 1 ? { 'aria-current': 'page' } : {})}>
              {c.to && i < crumbs.length - 1 ? <Link to={c.to}>{c.name}</Link> : c.name}
            </li>
          ))}
        </ol>
      </nav>
      <h1 className="display">
        <span className="light">{light}</span> <span className="bold">{bold}</span>
      </h1>
      {intro && <p className="page-intro">{intro}</p>}
      {children}
    </section>
  )
}
