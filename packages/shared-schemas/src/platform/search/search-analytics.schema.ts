/**
 * Search Analytics Schema
 * @module shared-schemas/platform/search
 *
 * Values আসে shared-constants/platform/search-analytics.constants থেকে।
 */

import { z } from 'zod';
import { SEARCH_ANALYTICS_METRIC, SEARCH_ANALYTICS_PERIOD } from '@vubon/shared-constants/platform';

export const SearchAnalyticsMetricSchema = z.enum(
  Object.values(SEARCH_ANALYTICS_METRIC) as [string, ...string[]]
);

export const SearchAnalyticsPeriodSchema = z.enum(
  Object.values(SEARCH_ANALYTICS_PERIOD) as [string, ...string[]]
);

export const SearchAnalyticsSchema = z.object({
  metric: SearchAnalyticsMetricSchema,
  period: SearchAnalyticsPeriodSchema,
  value: z.number(),
  previousValue: z.number().optional(),
  changePercent: z.number().optional(),
  periodStart: z.string().datetime(),
  periodEnd: z.string().datetime(),
  capturedAt: z.string().datetime(),
});

export const SearchQueryStatsSchema = z.object({
  query: z.string().min(1).max(200),
  count: z.number().int().nonnegative(),
  zeroResultCount: z.number().int().nonnegative(),
  averageResultsCount: z.number().nonnegative(),
  clickThroughRate: z.number().min(0).max(1),
  conversionRate: z.number().min(0).max(1),
  lastSearchedAt: z.string().datetime(),
});

export type SearchAnalyticsMetricSchemaType = z.infer<typeof SearchAnalyticsMetricSchema>;
export type SearchAnalyticsPeriodSchemaType = z.infer<typeof SearchAnalyticsPeriodSchema>;
export type SearchAnalyticsSchemaType = z.infer<typeof SearchAnalyticsSchema>;
export type SearchQueryStatsSchemaType = z.infer<typeof SearchQueryStatsSchema>;
