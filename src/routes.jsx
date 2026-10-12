import App from './App'
import Home from './pages/Home'
import Services from './pages/Services'
import Prices from './pages/Prices'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import { services } from './data/services'

export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, Component: Home },
      { path: 'services', Component: Services },
      {
        path: 'services/:slug',
        lazy: () => import('./pages/ServiceDetail').then((m) => ({ Component: m.default })),
        getStaticPaths: () => services.map((s) => `services/${s.slug}`),
      },
      { path: 'prices', Component: Prices },
      { path: 'about', Component: About },
      { path: 'sitemap', lazy: () => import('./pages/SitemapPage').then((m) => ({ Component: m.default })) },
      { path: 'contact', Component: Contact },
      { path: 'blog', lazy: () => import('./pages/Blog').then((m) => ({ Component: m.default })) },
      {
        path: 'blog/:slug',
        lazy: () => import('./pages/BlogPost').then((m) => ({ Component: m.default })),
        // dynamic import keeps the post text out of the main bundle (only needed at build time here)
        getStaticPaths: async () => (await import('./data/blog')).posts.map((p) => `blog/${p.slug}`),
      },
      { path: '*', Component: NotFound },
    ],
  },
]
