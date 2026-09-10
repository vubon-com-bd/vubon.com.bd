import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { ContentSchema } from '../../content/content.schema';
import { SEOKeywordSchema } from './seo-keyword.schema';
import { SEO_CONTENT } from '@vubon/shared-constants/src/platform/seo/seo-content.constants';

const seoContentTypeKeys = Object.keys(SEO_CONTENT.TYPES) as [string, ...string[]];
const contentLengthKeys = Object.keys(SEO_CONTENT.CONTENT_LENGTH) as [string, ...string[]];

export const SEOContentSchema = BaseSchema.extend({
  seoContentId: z.string().uuid(),
  seoId: z.string().uuid(),
  type: z.enum(seoContentTypeKeys),
  content: ContentSchema,
  keywords: z.array(SEOKeywordSchema),
  wordCount: z.number().int().min(0),
  readabilityScore: z.number().min(0).max(100),
  length: z.enum(contentLengthKeys),
  isActive: z.boolean().default(true),
  isOptimized: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
