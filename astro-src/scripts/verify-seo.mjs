/**
 * Weryfikacja SEO po `npm run build` - title, meta description, canonical, OG, Twitter, JSON-LD.
 * Lista PATHNAMES musi być zsynchronizowana z routingiem w `src/pages`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '..', 'dist');
const SITE = process.env.SEO_SITE_ORIGIN || 'https://get2software.com';

const PATHNAMES = [
  '/pl/',
  '/en/',
  '/pl/o-nas/',
  '/en/about/',
  '/pl/zespol/',
  '/en/team/',
  '/pl/produkty/',
  '/en/products/',
  '/pl/produkty/get2-bhp-rent/',
  '/en/products/get2-bhp-rent/',
  '/pl/produkty/get2-fsm/',
  '/en/products/get2-fsm/',
  '/pl/produkty/get2-commissioning/',
  '/en/products/get2-commissioning/',
  '/pl/produkty/get2-maintenance/',
  '/en/products/get2-maintenance/',
  '/pl/integracje/',
  '/en/integrations/',
  '/pl/wsparcie-systemow/',
  '/en/system-support/',
  '/pl/kariera/',
  '/en/careers/',
  '/pl/kontakt/',
  '/en/contact/',
  '/pl/polityka-prywatnosci/',
  '/en/privacy-policy/',
  '/pl/artykuly/',
  '/pl/artykuly/enova365-integracje-przewodnik/',
  '/pl/artykuly/proces-zdawczo-odbiorczy-linia-produkcyjna-get2-commissioning/',
  '/pl/artykuly/migracja-danych-miedzy-systemami-przewodnik/'
];

function pathnameToFile(pathname) {
  if (pathname === '/' || pathname === '') return 'index.html';
  const segment = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  return path.join(segment, 'index.html');
}

function readHtml(pathname) {
  const file = path.join(DIST, pathnameToFile(pathname));
  try {
    return fs.readFileSync(file, 'utf8');
  } catch {
    return null;
  }
}

function check(html) {
  const errors = [];
  if (!html || html.length === 0) {
    errors.push('Brak pliku lub pusty HTML');
    return errors;
  }

  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) {
    errors.push('Brak lub pusty <title>');
  }

  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  if (!descMatch || !descMatch[1].trim()) {
    errors.push('Brak lub pusty meta name="description"');
  }

  const canonMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
  if (!canonMatch || !canonMatch[1].startsWith(SITE)) {
    errors.push(`Brak lub niepoprawny canonical (oczekiwany prefix ${SITE})`);
  }

  if (!/<meta\s+property=["']og:title["']\s+content=/i.test(html)) errors.push('Brak og:title');
  if (!/<meta\s+property=["']og:description["']\s+content=/i.test(html)) errors.push('Brak og:description');
  if (!/<meta\s+property=["']og:url["']\s+content=/i.test(html)) errors.push('Brak og:url');
  if (!/<meta\s+property=["']og:type["']\s+content=/i.test(html)) errors.push('Brak og:type');
  if (!/<meta\s+property=["']og:locale["']\s+content=/i.test(html)) errors.push('Brak og:locale');
  if (!/<meta\s+property=["']og:image["']\s+content=/i.test(html)) errors.push('Brak og:image');

  if (!/<meta\s+name=["']twitter:card["']\s+content=["']summary_large_image["']/i.test(html)) {
    errors.push('Brak twitter:card (summary_large_image)');
  }
  if (!/<meta\s+name=["']twitter:title["']\s+content=/i.test(html)) errors.push('Brak twitter:title');
  if (!/<meta\s+name=["']twitter:description["']\s+content=/i.test(html)) errors.push('Brak twitter:description');
  if (!/<meta\s+name=["']twitter:image["']\s+content=/i.test(html)) errors.push('Brak twitter:image');

  const jsonLdBlocks = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
  const hasValidJsonLd =
    jsonLdBlocks &&
    jsonLdBlocks.some((block) => {
      const m = block.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
      if (!m) return false;
      try {
        JSON.parse(m[1].trim());
        return true;
      } catch {
        return false;
      }
    });
  if (!hasValidJsonLd) {
    errors.push('Brak poprawnego JSON-LD');
  }

  return errors;
}

function main() {
  if (!fs.existsSync(DIST)) {
    console.error('Brak katalogu dist. Uruchom: npm run build');
    process.exit(1);
  }

  const failed = [];
  for (const pathname of PATHNAMES) {
    const html = readHtml(pathname);
    const errors = check(html);
    if (errors.length > 0) {
      failed.push({ pathname, errors });
    }
  }

  if (failed.length > 0) {
    for (const { pathname, errors } of failed) {
      console.error(`\n${pathname}`);
      errors.forEach((e) => console.error(`  - ${e}`));
    }
    process.exit(1);
  }
  console.log(`verify-seo: OK (${PATHNAMES.length} stron)`);
}

main();
