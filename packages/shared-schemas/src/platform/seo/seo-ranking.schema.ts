/**
 * SEO Ranking Schema
 * @module shared-schemas/platform/seo
 *
 * Values আসে shared-constants/platform/seo-ranking.constants থেকে।
 */

import { z } from 'zod';
import { SEO_RANKING_TYPE } from '@vubon/shared-constants/platform';

export const SeoRankingTypeSchema = z.enum(
  Object.values(SEO_RANKING_TYPE) as [string, ...string[]]
);

export const SeoRankingSchema = z.object({
  id: z.string().min(1),
  keywordId: z.string().min(1),
  keyword: z.string().min(1).max(100),
  type: SeoRankingTypeSchema,
  position: z.number().int().positive(),
  previousPosition: z.number().int().positive().optional(),
  change: z.number().int().optional(),
  url: z.string().url().optional(),
  searchEngine: z.string().min(1).max(50),
  location: z.string().max(100).optional(),
  device: z.string().max(50).optional(),
  checkedAt: z.string().datetime(),
});

export type SeoRankingTypeSchemaType = z.infer<typeof SeoRankingTypeSchema>;
export type SeoRankingSchemaType = z.infer<typeof SeoRankingSchema>;
