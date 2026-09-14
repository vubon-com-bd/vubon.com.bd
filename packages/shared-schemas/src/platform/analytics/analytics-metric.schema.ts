/**
 * Analytics Metric Schema
 * @module shared-schemas/platform/analytics
 *
 * Values আসে shared-constants/platform/analytics-metric.constants থেকে।
 */

import { z } from 'zod';
import { ANALYTICS_METRIC, ANALYTICS_METRIC_UNIT } from '@vubon/shared-constants/platform';

export const AnalyticsMetricNameSchema = z.enum(
  Object.values(ANALYTICS_METRIC) as [string, ...string[]]
);

export const AnalyticsMetricUnitSchema = z.enum(
  Object.values(ANALYTICS_METRIC_UNIT) as [string, ...string[]]
);

export const AnalyticsMetricSchema = z.object({
  name: AnalyticsMetricNameSchema,
  value: z.number(),
  unit: AnalyticsMetricUnitSchema,
  previousValue: z.number().optional(),
  changePercent: z.number().optional(),
});

export type AnalyticsMetricNameSchemaType = z.infer<typeof AnalyticsMetricNameSchema>;
export type AnalyticsMetricUnitSchemaType = z.infer<typeof AnalyticsMetricUnitSchema>;
export type AnalyticsMetricSchemaType = z.infer<typeof AnalyticsMetricSchema>;
