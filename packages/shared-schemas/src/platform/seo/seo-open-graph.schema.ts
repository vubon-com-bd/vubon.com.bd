/**
 * SEO Open Graph Schema
 * @module shared-schemas/platform/seo
 *
 * Values আসে shared-constants/platform/seo-open-graph.constants থেকে।
 */

import { z } from 'zod';
import { SEO_OPEN_GRAPH_TYPE } from '@vubon/shared-constants/platform';

export const SeoOpenGraphTypeSchema = z.enum(
  Object.values(SEO_OPEN_GRAPH_TYPE) as [string, ...string[]]
);

export const OpenGraphArticleSchema = z.object({
  publishedTime: z.string().datetime().optional(),
  modifiedTime: z.string().datetime().optional(),
  expirationTime: z.string().datetime().optional(),
  author: z.string().max(200).optional(),
  section: z.string().max(100).optional(),
  tags: z.array(z.string().max(50)).max(20).optional(),
});

export const SeoOpenGraphSchema = z.object({
  type: SeoOpenGraphTypeSchema,
  title: z.string().min(1).max(200),
  description: z.string().max(500).optional(),
  url: z.string().url().optional(),
  image: z.string().url().optional(),
  imageAlt: z.string().max(200).optional(),
  siteName: z.string().max(100).optional(),
  locale: z.string().max(10).optional(),
  article: OpenGraphArticleSchema.optional(),
});

export type SeoOpenGraphTypeSchemaType = z.infer<typeof SeoOpenGraphTypeSchema>;
export type SeoOpenGraphSchemaType = z.infer<typeof SeoOpenGraphSchema>;
