import { Link } from 'react-router-dom'

// variants: dark (blue gradient), light (glass), soft (glass), wa (WhatsApp green)
export default function Button({ variant = 'dark', size, to, href, className = '', children, ...rest }) {
  const cls = `btn btn-${variant}${size === 'lg' ? ' btn-lg' : ''} ${className}`.trim()
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>
  if (href) {
    const external = href.startsWith('http')
    return (
      <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {children}
      </a>
    )
  }
  return <button className={cls} {...rest}>{children}</button>
}
