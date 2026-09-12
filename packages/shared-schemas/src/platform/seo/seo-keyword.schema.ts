import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { SEO_KEYWORD } from '@vubon/shared-constants/src/platform/seo/seo-keyword.constants';

const keywordTypeKeys = Object.keys(SEO_KEYWORD.TYPES) as [string, ...string[]];
const keywordLengthKeys = Object.keys(SEO_KEYWORD.KEYWORD_LENGTHS) as [string, ...string[]];
const keywordDifficultyKeys = Object.keys(SEO_KEYWORD.KEYWORD_DIFFICULTY) as [string, ...string[]];

export const SEOKeywordSchema = BaseSchema.extend({
  keywordId: z.string().uuid(),
  seoId: z.string().uuid(),
  type: z.enum(keywordTypeKeys),
  keyword: z.string().min(1).max(100),
  length: z.enum(keywordLengthKeys),
  difficulty: z.enum(keywordDifficultyKeys),
  searchVolume: z.number().int().min(0),
  cpc: z.number().min(0),
  competition: z.number().min(0).max(1),
  isActive: z.boolean().default(true),
  isTracking: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
