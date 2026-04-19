// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

/** Domena produkcyjna - canonical, OG, sitemap (zmienna środowiskowa pod preview). */
const siteUrl = process.env.PUBLIC_SITE_URL || 'https://get2software.com';

/** W dev serwujemy `/robots.txt` z Vite (na Pages generuje go `functions/_middleware.js`). */
function devRobotsTxtPlugin() {
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    '# Lokalny dev - pełna treść na produkcji z middleware Cloudflare.',
    `Sitemap: ${siteUrl.replace(/\/$/, '')}/sitemap-index.xml`,
    ''
  ].join('\n');

  return {
    name: 'dev-robots-txt',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathOnly = req.url?.split('?')[0] ?? '';
        if (pathOnly === '/robots.txt') {
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.end(body);
          return;
        }
        next();
      });
    }
  };
}

/** Dev: 302 `/slug` → `/slug/` zgodnie z `trailingSlash: 'always'`. */
function devTrailingSlashRedirectPlugin() {
  return {
    name: 'dev-trailing-slash-redirect',
    enforce: 'post',
    configureServer(server) {
      const handler = (req, res, next) => {
        const url = req.url ?? '';
        const pathOnly = url.split('?')[0] ?? '';
        if (req.method !== 'GET' && req.method !== 'HEAD') {
          next();
          return;
        }
        if (pathOnly === '/' || pathOnly === '') {
          next();
          return;
        }
        if (pathOnly.endsWith('/')) {
          next();
          return;
        }
        if (
          pathOnly.startsWith('/@') ||
          pathOnly.startsWith('/_astro') ||
          pathOnly.startsWith('/node_modules') ||
          pathOnly.startsWith('/@fs') ||
          pathOnly.startsWith('/@id') ||
          pathOnly.startsWith('/__') ||
          pathOnly.startsWith('/.well-known') ||
          pathOnly === '/src' ||
          pathOnly.startsWith('/src/')
        ) {
          next();
          return;
        }
        const lastSegment = pathOnly.split('/').pop() ?? '';
        if (lastSegment.includes('.') || lastSegment.startsWith('__')) {
          next();
          return;
        }
        const search = url.includes('?') ? `?${url.split('?').slice(1).join('?')}` : '';
        const location = `${pathOnly}/${search}`;
        res.statusCode = 302;
        res.setHeader('Location', location);
        res.end();
      };
      return () => {
        const stack = server.middlewares?.stack;
        if (Array.isArray(stack)) {
          stack.unshift({ route: '', handle: handler });
        } else {
          server.middlewares.use(handler);
        }
      };
    }
  };
}

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  trailingSlash: 'always',
  server: {
    port: 3000,
    strictPort: true
  },
  vite: {
    plugins: [devTrailingSlashRedirectPlugin(), tailwindcss(), devRobotsTxtPlugin()]
  },
  integrations: [sitemap()]
});
