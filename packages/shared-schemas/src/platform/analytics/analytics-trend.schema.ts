/**
 * Analytics Trend Schema
 * @module shared-schemas/platform/analytics
 *
 * Values আসে shared-constants/platform/analytics-trend.constants থেকে।
 */

import { z } from 'zod';
import { ANALYTICS_TREND_TYPE, ANALYTICS_TREND_STRENGTH } from '@vubon/shared-constants/platform';

export const AnalyticsTrendTypeSchema = z.enum(
  Object.values(ANALYTICS_TREND_TYPE) as [string, ...string[]]
);

export const AnalyticsTrendStrengthSchema = z.enum(
  Object.values(ANALYTICS_TREND_STRENGTH) as [string, ...string[]]
);

export const AnalyticsTrendSchema = z.object({
  metric: z.string().min(1).max(100),
  trend: AnalyticsTrendTypeSchema,
  strength: AnalyticsTrendStrengthSchema,
  slope: z.number(),
  startValue: z.number(),
  endValue: z.number(),
  dataPoints: z.number().int().nonnegative(),
});

export type AnalyticsTrendTypeSchemaType = z.infer<typeof AnalyticsTrendTypeSchema>;
export type AnalyticsTrendStrengthSchemaType = z.infer<typeof AnalyticsTrendStrengthSchema>;
export type AnalyticsTrendSchemaType = z.infer<typeof AnalyticsTrendSchema>;
