import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { SEO_KEYWORD_RESEARCH } from '@vubon/shared-constants/src/platform/seo/seo-keyword-research.constants';
import { SEOKeywordSchema } from './seo-keyword.schema';

const researchTypeKeys = Object.keys(SEO_KEYWORD_RESEARCH.TYPES) as [string, ...string[]];
const researchToolKeys = Object.keys(SEO_KEYWORD_RESEARCH.RESEARCH_TOOLS) as [string, ...string[]];

export const SEOKeywordResearchSchema = BaseSchema.extend({
  researchId: z.string().uuid(),
  keywordId: z.string().uuid(),
  keyword: SEOKeywordSchema,
  type: z.enum(researchTypeKeys),
  tool: z.enum(researchToolKeys),
  metrics: z.object({
    searchVolume: z.number().int().min(0),
    keywordDifficulty: z.number().min(0).max(1),
    cpc: z.number().min(0),
    trend: z.number(),
    competition: z.number().min(0).max(1),
  }),
  isActive: z.boolean().default(true),
  timestamp: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
