/**
 * Analytics Core Schema
 * @module shared-schemas/platform/analytics
 *
 * Analytics entity + aggregator।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../../common/base/base-entity.schema';
import { AnalyticsTypeSchema } from './analytics-type.schema';
import { AnalyticsCategorySchema } from './analytics-category.schema';
import { AnalyticsStatusSchema } from './analytics-status.schema';
import { AnalyticsMetricSchema } from './analytics-metric.schema';
import { AnalyticsPeriodSchema } from './analytics-period.schema';

export const AnalyticsSchema = BaseEntitySchema.extend({
  name: z.string().min(1).max(200),
  type: AnalyticsTypeSchema,
  category: AnalyticsCategorySchema,
  status: AnalyticsStatusSchema,
  period: AnalyticsPeriodSchema,
  metrics: z.array(AnalyticsMetricSchema).max(100),
  dimensions: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).optional(),
  filters: z.record(z.string(), z.unknown()).optional(),
  generatedAt: z.string().datetime(),
  generatedBy: z.string().optional(),
  cacheKey: z.string().max(500).optional(),
  expiresAt: z.string().datetime().optional(),
});

export const AnalyticsPublicSchema = AnalyticsSchema.pick({
  id: true,
  name: true,
  type: true,
  category: true,
  period: true,
  metrics: true,
});

export const AnalyticsSummarySchema = AnalyticsSchema.pick({
  id: true,
  name: true,
  type: true,
  category: true,
  status: true,
  generatedAt: true,
});

export const AnalyticsQueryInputSchema = z.object({
  type: AnalyticsTypeSchema,
  category: AnalyticsCategorySchema,
  period: AnalyticsPeriodSchema,
  metrics: z.array(z.string().min(1).max(100)).min(1).max(50),
  dimensions: z.array(z.string().min(1).max(100)).max(10).optional(),
  filters: z.record(z.string(), z.unknown()).optional(),
});

export const AnalyticsQueryResultSchema = z.object({
  data: z.array(z.record(z.string(), z.unknown())).max(100000),
  metrics: z.array(z.string()).max(50),
  dimensions: z.array(z.string()).max(10),
  period: AnalyticsPeriodSchema,
  rowCount: z.number().int().nonnegative(),
  cached: z.boolean(),
  generatedAt: z.string().datetime(),
});

export const AnalyticsListFilterSchema = z.object({
  type: AnalyticsTypeSchema.optional(),
  category: AnalyticsCategorySchema.optional(),
  status: AnalyticsStatusSchema.optional(),
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
});

export type AnalyticsSchemaType = z.infer<typeof AnalyticsSchema>;
export type AnalyticsPublicSchemaType = z.infer<typeof AnalyticsPublicSchema>;
export type AnalyticsSummarySchemaType = z.infer<typeof AnalyticsSummarySchema>;
export type AnalyticsQueryInputSchemaType = z.infer<typeof AnalyticsQueryInputSchema>;
export type AnalyticsQueryResultSchemaType = z.infer<typeof AnalyticsQueryResultSchema>;
export type AnalyticsListFilterSchemaType = z.infer<typeof AnalyticsListFilterSchema>;
