import { z } from 'zod';
import { SEO_SCORE } from '@vubon/shared-constants/src/platform/seo/seo-score.constants';

const scoreTypeKeys = Object.keys(SEO_SCORE.TYPES) as [string, ...string[]];
const scoreRangeKeys = Object.keys(SEO_SCORE.SCORE_RANGES) as [string, ...string[]];
const scoreWeightKeys = Object.keys(SEO_SCORE.SCORE_WEIGHTS) as [string, ...string[]];

export const SEOScoreSchema = z.object({
  scoreId: z.string().uuid(),
  seoId: z.string().uuid(),
  type: z.enum(scoreTypeKeys),
  value: z.number().min(0).max(100),
  range: z.enum(scoreRangeKeys),
  weight: z.enum(scoreWeightKeys),
  isGood: z.boolean().default(false),
  isExcellent: z.boolean().default(false),
  isPoor: z.boolean().default(false),
  timestamp: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
