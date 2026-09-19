/**
 * SEO Analytics Schema
 * @module shared-schemas/platform/seo
 *
 * Values আসে shared-constants/platform/seo-analytics.constants থেকে।
 */

import { z } from 'zod';
import { SEO_ANALYTICS_METRIC, SEO_ANALYTICS_PERIOD } from '@vubon/shared-constants/platform';

export const SeoAnalyticsMetricSchema = z.enum(
  Object.values(SEO_ANALYTICS_METRIC) as [string, ...string[]]
);

export const SeoAnalyticsPeriodSchema = z.enum(
  Object.values(SEO_ANALYTICS_PERIOD) as [string, ...string[]]
);

export const SeoAnalyticsSchema = z.object({
  metric: SeoAnalyticsMetricSchema,
  period: SeoAnalyticsPeriodSchema,
  value: z.number(),
  previousValue: z.number().optional(),
  changePercent: z.number().optional(),
  periodStart: z.string().datetime(),
  periodEnd: z.string().datetime(),
  capturedAt: z.string().datetime(),
});

export const SeoAnalyticsSnapshotSchema = z.object({
  period: SeoAnalyticsPeriodSchema,
  metrics: z.array(SeoAnalyticsSchema).max(50),
  capturedAt: z.string().datetime(),
});

export type SeoAnalyticsMetricSchemaType = z.infer<typeof SeoAnalyticsMetricSchema>;
export type SeoAnalyticsPeriodSchemaType = z.infer<typeof SeoAnalyticsPeriodSchema>;
export type SeoAnalyticsSchemaType = z.infer<typeof SeoAnalyticsSchema>;
export type SeoAnalyticsSnapshotSchemaType = z.infer<typeof SeoAnalyticsSnapshotSchema>;
