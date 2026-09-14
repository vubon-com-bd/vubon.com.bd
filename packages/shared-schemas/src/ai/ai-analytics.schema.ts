/**
 * AI Analytics Schema
 * @module shared-schemas/ai
 *
 * Values আসে shared-constants/ai/ai-analytics.constants থেকে।
 */

import { z } from 'zod';
import { AI_ANALYTICS_METRIC, AI_ANALYTICS_PERIOD } from '@vubon/shared-constants/ai';

export const AiAnalyticsMetricSchema = z.enum(
  Object.values(AI_ANALYTICS_METRIC) as [string, ...string[]]
);

export const AiAnalyticsPeriodSchema = z.enum(
  Object.values(AI_ANALYTICS_PERIOD) as [string, ...string[]]
);

export const AiAnalyticsSchema = z.object({
  metric: AiAnalyticsMetricSchema,
  period: AiAnalyticsPeriodSchema,
  value: z.number(),
  previousValue: z.number().optional(),
  changePercent: z.number().optional(),
  periodStart: z.string().datetime(),
  periodEnd: z.string().datetime(),
  capturedAt: z.string().datetime(),
});

export const AiModelUsageSchema = z.object({
  model: z.string().min(1).max(100),
  requestCount: z.number().int().nonnegative(),
  tokenCount: z.number().int().nonnegative(),
  cost: z.number().nonnegative(),
  currency: z.string().length(3),
  averageLatencyMs: z.number().nonnegative(),
  errorCount: z.number().int().nonnegative(),
  periodStart: z.string().datetime(),
  periodEnd: z.string().datetime(),
});

export type AiAnalyticsMetricSchemaType = z.infer<typeof AiAnalyticsMetricSchema>;
export type AiAnalyticsPeriodSchemaType = z.infer<typeof AiAnalyticsPeriodSchema>;
export type AiAnalyticsSchemaType = z.infer<typeof AiAnalyticsSchema>;
export type AiModelUsageSchemaType = z.infer<typeof AiModelUsageSchema>;
