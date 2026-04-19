# get2software.web

Marketingowy serwis **get2software.com** (PL + EN): Astro 5/6, Tailwind 4, Cloudflare Pages, bramka `verify-seo`.

## Struktura

- `astro-src/` - aplikacja Astro (build → `astro-src/dist/`).
- `functions/_middleware.js` - `robots.txt` na Cloudflare Pages (preview `noindex`).

## Dev

```bash
cd astro-src
npm install
npm run dev -- --port 3000
```

## Build i SEO

```bash
cd astro-src
npm run build
npm run verify-seo
```

## Deploy (Cloudflare Pages) - po konfiguracji projektu i domeny

Szczegóły: [`astro-src/README.md`](astro-src/README.md). **Worker e-mail i Turnstile** podłączysz później; do tego czasu strona jest w pełni statyczna, a kontakt ma fallback `mailto:`.

1. **Root directory:** zwykle `astro-src` *lub* jeden build w CI z `cd astro-src`.
2. **Build command:** `npm run build`
3. **Output directory:** `dist` (gdy root = `astro-src`) lub `astro-src/dist`.
4. **Functions:** katalog `functions/` (middleware `robots.txt`).
5. Zmienne środowiskowe - gdy będzie Worker: `astro-src/README.md`.

## Katalogi

- Treść produktów: `astro-src/src/content/products/*.json` (jeden plik na produkt: `slug` + `pl` + `en`).
