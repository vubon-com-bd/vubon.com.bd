/**
 * SEO Score Schema
 * @module shared-schemas/platform/seo
 *
 * Values আসে shared-constants/platform/seo-score.constants থেকে।
 */

import { z } from 'zod';
import { SEO_SCORE_GRADE } from '@vubon/shared-constants/platform';

export const SeoScoreGradeSchema = z.enum(Object.values(SEO_SCORE_GRADE) as [string, ...string[]]);

export const SeoScoreSchema = z.object({
  overall: z.number().min(0).max(100),
  grade: SeoScoreGradeSchema,
  content: z.number().min(0).max(100),
  technical: z.number().min(0).max(100),
  performance: z.number().min(0).max(100),
  mobile: z.number().min(0).max(100),
  backlinks: z.number().min(0).max(100),
  calculatedAt: z.string().datetime(),
});

export type SeoScoreGradeSchemaType = z.infer<typeof SeoScoreGradeSchema>;
export type SeoScoreSchemaType = z.infer<typeof SeoScoreSchema>;
