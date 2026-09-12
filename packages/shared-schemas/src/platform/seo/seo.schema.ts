import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { ContentSchema } from '../../content/content.schema';
import { SEOStrategySchema } from './seo-strategy.schema';
import { SEOKeywordSchema } from './seo-keyword.schema';
import { SEOContentSchema } from './seo-content.schema';
import { SEOAuditSchema } from './seo-audit.schema';
import { SEOScoreSchema } from './seo-score.schema';
import { SEO } from '@vubon/shared-constants/src/platform/seo/seo.constants';

const seoStatusKeys = Object.keys(SEO.STATUS) as [string, ...string[]];
const seoTypeKeys = Object.keys(SEO.SEO_TYPES) as [string, ...string[]];

export const SEOSchema = BaseSchema.extend({
  seoId: z.string().uuid(),
  contentId: z.string().uuid(),
  content: ContentSchema,
  status: z.enum(seoStatusKeys),
  type: z.enum(seoTypeKeys),
  strategy: SEOStrategySchema,
  keywords: z.array(SEOKeywordSchema),
  seoContent: SEOContentSchema,
  audit: SEOAuditSchema,
  score: SEOScoreSchema,
  isActive: z.boolean().default(true),
  isIndexed: z.boolean().default(false),
  isOptimized: z.boolean().default(false),
  metadata: z.object({
    title: z.string().max(60),
    description: z.string().max(160),
    keywords: z.array(z.string()),
    canonicalUrl: z.string().url().optional(),
    noindex: z.boolean().default(false),
    nofollow: z.boolean().default(false),
    lastCrawledAt: z.date().optional(),
    lastIndexedAt: z.date().optional(),
  }),
});

export const SEOCreateSchema = SEOSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  isIndexed: true,
  isOptimized: true,
});

export const SEOUpdateSchema = SEOCreateSchema.partial();
