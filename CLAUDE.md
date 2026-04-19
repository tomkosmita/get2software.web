# CLAUDE.md - get2software.web

## Komendy (katalog `astro-src/`)

```bash
npm run dev          # port 3000 (strictPort)
npm run build
npm run verify-seo   # po buildzie - brama SEO
npm run preview
```

## Architektura

- **Statyczny Astro** (`output: static`), `trailingSlash: 'always'`.
- **i18n:** ścieżki `/pl/...` i `/en/...` (osobne slugi legalne, np. polityka).
- **Treść produktów:** kolekcja `productBundles` - plik `*.json` na produkt, pola `pl` i `en`.
- **Artykuły (PL-only):** kolekcja `articles` — pliki `*.md` w `astro-src/src/content/articles/`, routing `/pl/artykuly/` i `/pl/artykuly/[slug]/` (bez odpowiednika EN; przełącznik języka ukryty na tych stronach).
- **SEO:** `MarketingLayout` dokleja JSON-LD `WebPage`; strony produktów dodają `SoftwareApplication`.
- **Formularz kontaktowy:** wymaga `PUBLIC_CONTACT_FORM_WORKER_URL` + `PUBLIC_TURNSTILE_SITE_KEY` (Worker + Resend - wzorzec jak w projekcie wroclaw-psychoterapia).

## Obowiązkowo przed commitem

`npm run build` oraz `npm run verify-seo` muszą przejść bez błędów.

## Cloudflare (później)

Wdrożenie Pages + Worker (e-mail) nie blokuje developmentu - opis w `astro-src/README.md`. Formularz bez zmiennych `PUBLIC_*` pokazuje `mailto:`.
