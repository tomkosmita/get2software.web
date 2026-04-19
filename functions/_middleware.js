/**
 * Cloudflare Pages - edge middleware: `robots.txt` dynamiczny.
 * Produkcja (get2software.com): Allow + Sitemap.
 * Preview (*.pages.dev): Disallow + X-Robots-Tag noindex (jak w wzorcu wroclaw-psychoterapia).
 */
export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.pathname !== '/robots.txt') {
    return context.next();
  }

  const host = url.hostname || '';
  const isPagesDev = host.endsWith('.pages.dev');
  const siteOrigin = 'https://get2software.com';

  if (isPagesDev) {
    const body = ['User-agent: *', 'Disallow: /', '', `# Preview host: ${host}`, ''].join('\n');
    return new Response(body, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Robots-Tag': 'noindex, nofollow'
      }
    });
  }

  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${siteOrigin}/sitemap-index.xml`,
    ''
  ].join('\n');

  return new Response(body, {
    status: 200,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}
