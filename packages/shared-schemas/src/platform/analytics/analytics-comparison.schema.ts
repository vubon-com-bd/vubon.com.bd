/**
 * Analytics Comparison Schema
 * @module shared-schemas/platform/analytics
 *
 * Values আসে shared-constants/platform/analytics-comparison.constants থেকে।
 */

import { z } from 'zod';
import { ANALYTICS_COMPARISON, ANALYTICS_CHANGE_TYPE } from '@vubon/shared-constants/platform';

export const AnalyticsComparisonSchema = z.enum(
  Object.values(ANALYTICS_COMPARISON) as [string, ...string[]]
);

export const AnalyticsChangeTypeSchema = z.enum(
  Object.values(ANALYTICS_CHANGE_TYPE) as [string, ...string[]]
);

export const AnalyticsComparisonValueSchema = z.object({
  comparison: AnalyticsComparisonSchema,
  currentValue: z.number(),
  previousValue: z.number(),
  change: z.number(),
  changePercent: z.number(),
  changeType: AnalyticsChangeTypeSchema,
});

export type AnalyticsComparisonSchemaType = z.infer<typeof AnalyticsComparisonSchema>;
export type AnalyticsChangeTypeSchemaType = z.infer<typeof AnalyticsChangeTypeSchema>;
export type AnalyticsComparisonValueSchemaType = z.infer<typeof AnalyticsComparisonValueSchema>;
