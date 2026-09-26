/**
 * SEO Core Schema
 * @module shared-schemas/platform/seo
 *
 * SEO entity + aggregator।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../../common/base/base-entity.schema';
import { SlugSchema } from '../../common/primitives/slug.schema';
import { SeoStatusSchema } from './seo-status.schema';
import { SeoTypeSchema } from './seo-type.schema';
import { SeoPrioritySchema } from './seo-priority.schema';
import { SeoStrategySchema } from './seo-strategy.schema';
import { SeoScoreSchema } from './seo-score.schema';
import { SeoOpenGraphSchema } from './seo-open-graph.schema';
import { SeoTwitterCardSchema } from './seo-twitter-card.schema';
import { SeoSchemaDataSchema } from './seo-schema.schema';

export const SeoSchema = BaseEntitySchema.extend({
  url: z.string().url(),
  slug: SlugSchema,
  type: SeoTypeSchema,
  status: SeoStatusSchema,
  priority: SeoPrioritySchema,
  strategy: SeoStrategySchema,
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(500),
  keywords: z.array(z.string().min(1).max(100)).max(50),
  canonicalUrl: z.string().url().optional(),
  robots: z.string().max(500).optional(),
  score: SeoScoreSchema.optional(),
  openGraph: SeoOpenGraphSchema.optional(),
  twitterCard: SeoTwitterCardSchema.optional(),
  schema: z.array(SeoSchemaDataSchema).max(20).optional(),
  isIndexable: z.boolean(),
  lastAuditedAt: z.string().datetime().optional(),
});

export const SeoPublicSchema = SeoSchema.pick({
  id: true,
  url: true,
  title: true,
  description: true,
  score: true,
  isIndexable: true,
});

export const SeoSummarySchema = SeoSchema.pick({
  id: true,
  url: true,
  status: true,
  priority: true,
}).extend({
  score: z.number().min(0).max(100).optional(),
});

export const SeoListFilterSchema = z.object({
  type: SeoTypeSchema.optional(),
  status: SeoStatusSchema.optional(),
  priority: SeoPrioritySchema.optional(),
  strategy: SeoStrategySchema.optional(),
  isIndexable: z.boolean().optional(),
  minScore: z.number().min(0).max(100).optional(),
  maxScore: z.number().min(0).max(100).optional(),
  search: z.string().max(200).optional(),
});

export type SeoSchemaType = z.infer<typeof SeoSchema>;
export type SeoPublicSchemaType = z.infer<typeof SeoPublicSchema>;
export type SeoSummarySchemaType = z.infer<typeof SeoSummarySchema>;
export type SeoListFilterSchemaType = z.infer<typeof SeoListFilterSchema>;
