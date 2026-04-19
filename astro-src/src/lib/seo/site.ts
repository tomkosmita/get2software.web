/** Domena kanoniczna - zsynchronizowana z `astro.config.mjs` `site`. */
export const SITE_ORIGIN =
  (typeof import.meta.env.PUBLIC_SITE_URL === 'string' && import.meta.env.PUBLIC_SITE_URL) ||
  'https://get2software.com';

/** Skleja origin + ścieżkę (trailing slash jak w `trailingSlash: always`, z wyjątkiem plików `.html` np. 404). */
export function canonicalUrl(pathname: string): string {
  const base = SITE_ORIGIN.replace(/\/$/, '');
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (path.endsWith('.html')) {
    return `${base}${path}`;
  }
  return `${base}${path.endsWith('/') ? path : `${path}/`}`;
}
