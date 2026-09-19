/**
 * SEO Sitemap Schema
 * @module shared-schemas/platform/seo
 *
 * Values আসে shared-constants/platform/seo-sitemap.constants থেকে।
 */

import { z } from 'zod';
import { SEO_SITEMAP_TYPE, SEO_SITEMAP_CHANGEFREQ } from '@vubon/shared-constants/platform';

export const SeoSitemapTypeSchema = z.enum(
  Object.values(SEO_SITEMAP_TYPE) as [string, ...string[]]
);

export const SeoSitemapChangefreqSchema = z.enum(
  Object.values(SEO_SITEMAP_CHANGEFREQ) as [string, ...string[]]
);

export const SeoSitemapEntrySchema = z.object({
  loc: z.string().url(),
  lastmod: z.string().datetime().optional(),
  changefreq: SeoSitemapChangefreqSchema.optional(),
  priority: z.number().min(0).max(1).optional(),
});

export const SeoSitemapSchema = z.object({
  id: z.string().min(1),
  url: z.string().url(),
  type: SeoSitemapTypeSchema,
  urlCount: z.number().int().nonnegative(),
  fileSize: z.number().int().nonnegative(),
  isIndex: z.boolean(),
  childSitemaps: z.array(z.string().url()).max(1000).optional(),
  generatedAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type SeoSitemapTypeSchemaType = z.infer<typeof SeoSitemapTypeSchema>;
export type SeoSitemapChangefreqSchemaType = z.infer<typeof SeoSitemapChangefreqSchema>;
export type SeoSitemapSchemaType = z.infer<typeof SeoSitemapSchema>;
