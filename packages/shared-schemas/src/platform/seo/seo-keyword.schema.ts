/**
 * SEO Keyword Schema
 * @module shared-schemas/platform/seo
 *
 * Values আসে shared-constants/platform/seo-keyword.constants থেকে।
 */

import { z } from 'zod';
import {
  SEO_KEYWORD_TYPE,
  SEO_KEYWORD_DIFFICULTY,
  SEO_KEYWORD_INTENT,
  SEO_KEYWORD,
} from '@vubon/shared-constants/platform';

export const SeoKeywordTypeSchema = z.enum(
  Object.values(SEO_KEYWORD_TYPE) as [string, ...string[]]
);

export const SeoKeywordDifficultySchema = z.enum(
  Object.values(SEO_KEYWORD_DIFFICULTY) as [string, ...string[]]
);

export const SeoKeywordIntentSchema = z.enum(
  Object.values(SEO_KEYWORD_INTENT) as [string, ...string[]]
);

export const SeoKeywordSchema = z.object({
  id: z.string().min(1),
  keyword: z.string().trim().min(SEO_KEYWORD.MIN_LENGTH).max(SEO_KEYWORD.MAX_LENGTH),
  type: SeoKeywordTypeSchema,
  difficulty: SeoKeywordDifficultySchema,
  intent: SeoKeywordIntentSchema,
  searchVolume: z.number().int().nonnegative().optional(),
  competition: z.number().min(0).max(1).optional(),
  cpc: z.number().nonnegative().optional(),
  currentRank: z.number().int().positive().optional(),
  targetRank: z.number().int().positive().optional(),
  pageUrl: z.string().url().optional(),
  lastCheckedAt: z.string().datetime().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const SeoKeywordPublicSchema = SeoKeywordSchema.pick({
  id: true,
  keyword: true,
  type: true,
  searchVolume: true,
  currentRank: true,
});

export type SeoKeywordTypeSchemaType = z.infer<typeof SeoKeywordTypeSchema>;
export type SeoKeywordDifficultySchemaType = z.infer<typeof SeoKeywordDifficultySchema>;
export type SeoKeywordIntentSchemaType = z.infer<typeof SeoKeywordIntentSchema>;
export type SeoKeywordSchemaType = z.infer<typeof SeoKeywordSchema>;
export type SeoKeywordPublicSchemaType = z.infer<typeof SeoKeywordPublicSchema>;
