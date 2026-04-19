/**
 * Konfiguracja kolekcji treści Astro dla produktów (productBundles) i artykułów (articles).
 * Produkty: JSON PL+EN. Artykuły: Markdown PL-only (frontmatter + treść w body) - łatwy redakcyjny workflow i render przez `render()`.
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const moduleSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1)
});

const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1)
});

/** Jedna wersja językowa produktu (PL lub EN) - bez pola locale (jest w kluczu nadrzędnym). */
const productLocaleSchema = z.object({
  seoTitle: z.string().min(1),
  seoDescription: z.string().min(1),
  /** Krótki lead na kartach strony głównej i /produkty - jeden spójny teaser z podstroną produktu (DRY). */
  listingTeaser: z.string().min(1),
  heroTitle: z.string().min(1),
  heroLead: z.string().min(1),
  personas: z.array(z.string().min(1)).min(1),
  modules: z.array(moduleSchema).min(1),
  integrationsText: z.string().min(1),
  faqs: z.array(faqSchema).optional(),
  heroIllustration: z.enum(['bhp', 'fsm', 'commissioning', 'maintenance', 'fcm', 'fcmrent']),
  /** Drugi mikro-diagram na stronie produktu: nagłówek i podpis (PL/EN) - treść biznesowa obok SVG bez tekstu w grafice. */
  focusDiagram: z.object({
    title: z.string().min(1),
    caption: z.string().min(1)
  })
});

/**
 * Jeden plik JSON na produkt: `slug` + treść PL + EN.
 * Eliminuje kolizję ID kolekcji przy zduplikowanym `slug` w osobnych plikach.
 */
const productBundles = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/products' }),
  schema: z.object({
    slug: z.string().min(1),
    pl: productLocaleSchema,
    en: productLocaleSchema
  })
});

/** Wariant wizualny karty na liście / nagłówka - bez uploadu grafik na start (CSS + tokeny). */
const articleCoverVariantSchema = z.enum(['integrations', 'commissioning', 'default']);

/**
 * Artykuły blogowe (PL-only): jeden plik `.md` = jeden URL pod `/pl/artykuly/[slug]/`.
 * Pola frontmatter walidujemy Zod-em; treść artykułu jest w Markdown (body), żeby uniknąć escapowania HTML w JSON.
 */
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    slug: z.string().min(1),
    title: z.string().min(1),
    seoTitle: z.string().min(1),
    seoDescription: z.string().min(1),
    /** Lead pod tytułem H1 na stronie wpisu - krótszy niż pełny lead w treści. */
    lead: z.string().min(1),
    /** Krótki opis na karty listy / meta pomocnicze. */
    excerpt: z.string().min(1),
    /** Filar tematyczny (jak „filary” na stronie referencyjnej artykułów). */
    category: z.string().min(1),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    coverVariant: articleCoverVariantSchema.default('default'),
    /** Opcjonalne powiązanie z produktem - link w szablonie i JSON-LD. */
    relatedProductSlug: z.string().min(1).optional(),
    /** Źródła zewnętrzne użyte przy researchu - transparentność i SEO E-E-A-T. */
    sources: z
      .array(
        z.object({
          label: z.string().min(1),
          url: z.string().url()
        })
      )
      .optional()
  })
});

export const collections = { productBundles, articles };
