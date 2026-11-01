/**
 * Analytics Aggregation Schema
 * @module shared-schemas/platform/analytics
 *
 * Values আসে shared-constants/platform/analytics-aggregation.constants থেকে।
 */

import { z } from 'zod';
import { ANALYTICS_AGGREGATION, ANALYTICS_PERCENTILE } from '@vubon/shared-constants/platform';

export const AnalyticsAggregationSchema = z.enum(
  Object.values(ANALYTICS_AGGREGATION) as [string, ...string[]]
);

// Numeric enum — z.union with literals
const percentileValues = Object.values(ANALYTICS_PERCENTILE) as number[];

export const AnalyticsPercentileSchema = z.union([
  z.literal(percentileValues[0] as 25),
  z.literal(percentileValues[1] as 50),
  z.literal(percentileValues[2] as 75),
  z.literal(percentileValues[3] as 90),
  z.literal(percentileValues[4] as 95),
  z.literal(percentileValues[5] as 99),
]);

export const AnalyticsAggregationValueSchema = z.object({
  metric: z.string().min(1).max(100),
  aggregation: AnalyticsAggregationSchema,
  value: z.number(),
});

export type AnalyticsAggregationSchemaType = z.infer<typeof AnalyticsAggregationSchema>;
export type AnalyticsPercentileSchemaType = z.infer<typeof AnalyticsPercentileSchema>;
export type AnalyticsAggregationValueSchemaType = z.infer<typeof AnalyticsAggregationValueSchema>;
