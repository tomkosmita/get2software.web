/**
 * Konfiguracja kolekcji treści Astro dla produktów (productBundles).
 * Jedna definicja schematu - typy generowane dla szablonów i spójność pól PL/EN.
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
  heroIllustration: z.enum(['bhp', 'fsm', 'commissioning', 'maintenance', 'fcm', 'fcmrent'])
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

export const collections = { productBundles };
