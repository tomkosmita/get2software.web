/**
 * Mapowanie tras PL ↔ EN dla hreflang i przełącznika języka.
 * Komentarz: jedna tablica par - łatwo rozszerzyć o nowe podstrony bez rozjechania SEO.
 */
export type Locale = 'pl' | 'en';

export const routeMap: Record<
  string,
  {
    pl: string;
    en: string;
  }
> = {
  home: { pl: '/pl/', en: '/en/' },
  about: { pl: '/pl/o-nas/', en: '/en/about/' },
  /** Zespół: kompetencje i model współpracy z klientem (wdrożenie punktowe lub end-to-end). */
  team: { pl: '/pl/zespol/', en: '/en/team/' },
  products: { pl: '/pl/produkty/', en: '/en/products/' },
  integrations: { pl: '/pl/integracje/', en: '/en/integrations/' },
  /** Wsparcie utrzymaniowe systemów po wdrożeniu (PL/EN) - hreflang i przełącznik języka. */
  support: { pl: '/pl/wsparcie-systemow/', en: '/en/system-support/' },
  /**
   * Artykuły / blog - na start treść wyłącznie po polsku; EN menu linkuje do tego samego URL,
   * żeby nie budować „pustej” podstrony `/en/...` bez treści.
   */
  articles: { pl: '/pl/artykuly/', en: '/pl/artykuly/' },
  careers: { pl: '/pl/kariera/', en: '/en/careers/' },
  contact: { pl: '/pl/kontakt/', en: '/en/contact/' },
  privacy: { pl: '/pl/polityka-prywatnosci/', en: '/en/privacy-policy/' },
  productBhp: { pl: '/pl/produkty/get2-bhp-rent/', en: '/en/products/get2-bhp-rent/' },
  productFsm: { pl: '/pl/produkty/get2-fsm/', en: '/en/products/get2-fsm/' },
  productComm: { pl: '/pl/produkty/get2-commissioning/', en: '/en/products/get2-commissioning/' },
  productMaint: { pl: '/pl/produkty/get2-maintenance/', en: '/en/products/get2-maintenance/' },
  productFcm: { pl: '/pl/produkty/get2-fcm/', en: '/en/products/get2-fcm/' },
  productFcmRent: { pl: '/pl/produkty/get2-fcm-rent/', en: '/en/products/get2-fcm-rent/' }
};

export function alternatePath(currentLocale: Locale, key: keyof typeof routeMap): string {
  return routeMap[key][currentLocale];
}

export function otherLocalePath(currentLocale: Locale, key: keyof typeof routeMap): string {
  const other: Locale = currentLocale === 'pl' ? 'en' : 'pl';
  return routeMap[key][other];
}

/** Mapowanie sluga produktu na klucz tras (hreflang / przełącznik języka na podstronie produktu). */
export function productSlugToRouteKey(
  slug: string
): 'productBhp' | 'productFsm' | 'productComm' | 'productMaint' | 'productFcm' | 'productFcmRent' | null {
  const map: Record<string, 'productBhp' | 'productFsm' | 'productComm' | 'productMaint' | 'productFcm' | 'productFcmRent'> = {
    'get2-bhp-rent': 'productBhp',
    'get2-fsm': 'productFsm',
    'get2-commissioning': 'productComm',
    'get2-maintenance': 'productMaint',
    'get2-fcm': 'productFcm',
    'get2-fcm-rent': 'productFcmRent'
  };
  return map[slug] ?? null;
}
