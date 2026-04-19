# get2software.com (Astro)

## Build lokalny

```bash
npm install
npm run build
npm run verify-seo
npm run preview
```

## Cloudflare - na później (nowy projekt + domena)

Wdrożenie **Cloudflare Pages**, **middleware** (`functions/_middleware.js` w root repo) oraz **Workera** do e-maili (Resend + Turnstile) możesz zrobić po skonfigurowaniu projektu i domeny w panelu Cloudflare. Strona działa statycznie (`astro build` → `dist`); formularz kontaktowy pokazuje wtedy fallback `mailto:` dopóki nie ustawisz zmiennych.

### Kiedy będziesz gotów: Pages

1. Połącz repozytorium lub wrzuć `dist` z CI.
2. **Build command:** `npm run build` (root projektu: `astro-src` albo repo z `cd astro-src && …` - jedna konwencja).
3. **Output:** `dist` (jeśli root = `astro-src`) lub `astro-src/dist`.
4. **Functions:** katalog `functions` z repozytorium (middleware `robots.txt`).

### Zmienne środowiskowe (po podłączeniu workera)

| Zmienna | Opis |
|---------|------|
| `PUBLIC_SITE_URL` | Kanoniczny origin (np. `https://get2software.com`) - dopasuj do finalnej domeny. |
| `PUBLIC_CONTACT_FORM_WORKER_URL` | URL Workera przyjmującego POST JSON z formularza. |
| `PUBLIC_TURNSTILE_SITE_KEY` | Klucz publiczny Turnstile (widget). |

Sekrety (`RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`) tylko w Workerze, nie w repo. Model jak w projekcie `wroclaw-psychoterapia`.

Bez tych zmiennych przycisk „Wyślij” w formularzu pozostaje nieaktywny; użytkownik ma **link mailto** do `kontakt@get2software.com`.

## Artykuły (blog)

- Treść: `src/content/articles/*.md` (frontmatter + Markdown), kolekcja `articles` w `src/content.config.ts`.
- Strony: `src/pages/pl/artykuly/index.astro`, `src/pages/pl/artykuly/[slug].astro`.
- Po dodaniu nowego wpisu dopisz ścieżkę do `scripts/verify-seo.mjs` (`PATHNAMES`).

## Plik `.env`

Skopiuj `.env.example` → `.env` i uzupełnij po przygotowaniu workera.
