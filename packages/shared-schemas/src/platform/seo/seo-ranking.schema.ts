import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { SEO_RANKING } from '@vubon/shared-constants/src/platform/seo/seo-ranking.constants';
import { SEOKeywordSchema } from './seo-keyword.schema';
import { SEOScoreSchema } from './seo-score.schema';

const rankingTypeKeys = Object.keys(SEO_RANKING.TYPES) as [string, ...string[]];

export const SEORankingSchema = BaseSchema.extend({
  rankingId: z.string().uuid(),
  keywordId: z.string().uuid(),
  keyword: SEOKeywordSchema,
  type: z.enum(rankingTypeKeys),
  position: z.number().int().min(1),
  previousPosition: z.number().int().min(1).optional(),
  change: z.number().int(),
  url: z.string().url(),
  score: SEOScoreSchema,
  isTop3: z.boolean().default(false),
  isTop10: z.boolean().default(false),
  isTop20: z.boolean().default(false),
  isTop50: z.boolean().default(false),
  isTop100: z.boolean().default(false),
  timestamp: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
