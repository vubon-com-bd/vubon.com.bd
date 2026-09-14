/**
 * SEO Content Schema
 * @module shared-schemas/platform/seo
 *
 * Values আসে shared-constants/platform থেকে:
 * - seo-content.constants
 * - seo-keyword.constants
 */

import { z } from 'zod';
import { SEO_CONTENT_TYPE, SEO_META_TAG, SEO_CONTENT } from '@vubon/shared-constants/platform';
import { SEO_KEYWORD } from '@vubon/shared-constants/platform';

export const SeoContentTypeSchema = z.enum(
  Object.values(SEO_CONTENT_TYPE) as [string, ...string[]]
);

export const SeoMetaTagNameSchema = z.enum(Object.values(SEO_META_TAG) as [string, ...string[]]);

export const SeoHeadingSchema = z.object({
  level: z.number().int().min(1).max(6),
  text: z.string().min(1).max(200),
});

export const SeoMetaTagSchema = z.object({
  name: SeoMetaTagNameSchema,
  value: z.string().min(1).max(500),
});

export const SeoContentSchema = z.object({
  id: z.string().min(1),
  url: z.string().url(),
  type: SeoContentTypeSchema,
  title: z.string().trim().min(SEO_CONTENT.TITLE_MIN_LENGTH).max(SEO_CONTENT.TITLE_MAX_LENGTH),
  description: z
    .string()
    .trim()
    .min(SEO_CONTENT.DESCRIPTION_MIN_LENGTH)
    .max(SEO_CONTENT.DESCRIPTION_MAX_LENGTH),
  keywords: z.array(z.string().min(1).max(100)).max(SEO_KEYWORD.MAX_KEYWORDS_PER_PAGE),
  canonicalUrl: z.string().url().optional(),
  headings: z.array(SeoHeadingSchema).max(100),
  wordCount: z.number().int().nonnegative(),
  readabilityScore: z.number().min(0).max(100).optional(),
  language: z.string().min(2).max(10),
  metaTags: z.array(SeoMetaTagSchema).max(50),
  updatedAt: z.string().datetime(),
});

export type SeoContentTypeSchemaType = z.infer<typeof SeoContentTypeSchema>;
export type SeoMetaTagNameSchemaType = z.infer<typeof SeoMetaTagNameSchema>;
export type SeoContentSchemaType = z.infer<typeof SeoContentSchema>;
