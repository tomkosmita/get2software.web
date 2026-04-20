# IMAGE_ASSET_REGISTER.md

Wewnętrzny rejestr pochodzenia i statusu licencyjnego zdjęć używanych w serwisie.

Cel:
- nie wyświetlać informacji o źródłach na froncie strony,
- mieć wewnętrzny ślad pochodzenia assetów na wypadek pytań, audytu lub wymiany zdjęć,
- rozróżniać zdjęcia własne, kupione, stockowe i grafiki przygotowane wewnętrznie.

To nie jest porada prawna. Plik ma charakter operacyjny i porządkowy.

## Statusy

- `verified` - źródło i podstawa użycia potwierdzone wewnętrznie.
- `needs_verification` - asset jest w repo, ale brakuje pewnego potwierdzenia źródła lub warunków użycia.
- `internal` - asset przygotowany wewnętrznie na potrzeby serwisu.

## Obecny przegląd assetów

| Path | Used on | Looks like stock? | Status | Internal note |
|---|---|---:|---|---|
| `astro-src/public/images/team/hero-team.jpg` | `astro-src/src/pages/pl/zespol/index.astro`, `astro-src/src/pages/en/team/index.astro` | yes | `needs_verification` | Zdjęcie zespołu przy laptopach; wygląda jak klasyczny stock biznesowo-technologiczny. |
| `astro-src/public/images/team/phase-planning.jpg` | `astro-src/src/pages/pl/zespol/index.astro`, `astro-src/src/pages/en/team/index.astro` | yes | `needs_verification` | Warsztat z post-itami; bardzo typowy stock do narracji o planowaniu. |
| `astro-src/public/images/team/delivery-collab.jpg` | `astro-src/src/pages/pl/zespol/index.astro`, `astro-src/src/pages/en/team/index.astro` | yes | `needs_verification` | Uścisk dłoni przy biurku; wygląda jak stock handlowo-korporacyjny. |
| `astro-src/public/images/support/team-collaboration.jpg` | `astro-src/src/pages/pl/wsparcie-systemow/index.astro`, `astro-src/src/pages/en/system-support/index.astro`, `astro-src/src/content/articles/migracja-danych-miedzy-systemami-przewodnik.md` | yes | `needs_verification` | Zespół przy laptopach; wygląda jak stock / editorial stock. |
| `astro-src/public/images/support/server-ops.jpg` | `astro-src/src/pages/pl/wsparcie-systemow/index.astro`, `astro-src/src/pages/en/system-support/index.astro` | yes | `needs_verification` | Szafy serwerowe; wygląda jak stock technologiczny. |
| `astro-src/public/images/support/cloud-globe.jpg` | `astro-src/src/pages/pl/wsparcie-systemow/index.astro`, `astro-src/src/pages/en/system-support/index.astro` | yes | `needs_verification` | Widok Ziemi z orbity; wygląda jak stock / agencyjna fotografia editorial. |
| `astro-src/public/images/articles/data-migration-process.svg` | `astro-src/src/content/articles/migracja-danych-miedzy-systemami-przewodnik.md` | no | `internal` | Diagram przygotowany wewnętrznie w repo jako SVG. |

## Minimalny proces dla nowych zdjęć

1. Zapisać asset do `astro-src/public/images/...`.
2. Dopisać w tym pliku:
   - ścieżkę,
   - miejsca użycia,
   - źródło,
   - status (`verified` / `needs_verification` / `internal`),
   - krótką notatkę o warunkach użycia albo o potrzebie dalszej weryfikacji.
3. Nie wyświetlać informacji o źródle na stronie publicznej, chyba że wymaga tego konkretna licencja.
4. Jeśli źródło nie jest pewne, oznaczyć asset jako `needs_verification` i nie zakładać domyślnie, że wszystko jest w porządku.

## Co warto dopisać później

- oryginalny URL źródła,
- data pobrania,
- osoba, która pobrała asset,
- typ licencji lub numer zakupu,
- decyzja: zostaje / do wymiany / zastąpić zdjęciem własnym.
