/**
 * Marketing Analytics Schema
 * @module shared-schemas/marketing
 *
 * Values আসে shared-constants/marketing/marketing-analytics.constants থেকে।
 */

import { z } from 'zod';
import {
  MARKETING_ANALYTICS_METRIC,
  MARKETING_ANALYTICS_PERIOD,
  MARKETING_ANALYTICS_ATTRIBUTION,
} from '@vubon/shared-constants/marketing';

export const MarketingAnalyticsMetricSchema = z.enum(
  Object.values(MARKETING_ANALYTICS_METRIC) as [string, ...string[]]
);

export const MarketingAnalyticsPeriodSchema = z.enum(
  Object.values(MARKETING_ANALYTICS_PERIOD) as [string, ...string[]]
);

export const MarketingAnalyticsAttributionSchema = z.enum(
  Object.values(MARKETING_ANALYTICS_ATTRIBUTION) as [string, ...string[]]
);

export const MarketingAnalyticsSchema = z.object({
  metric: MarketingAnalyticsMetricSchema,
  period: MarketingAnalyticsPeriodSchema,
  value: z.number(),
  previousValue: z.number().optional(),
  changePercent: z.number().optional(),
  periodStart: z.string().datetime(),
  periodEnd: z.string().datetime(),
  capturedAt: z.string().datetime(),
});

export const MarketingAttributionSchema = z.object({
  channel: z.string().min(1).max(100),
  source: z.string().min(1).max(100),
  campaignId: z.string().max(100).optional(),
  conversions: z.number().int().nonnegative(),
  revenue: z.number().nonnegative(),
  currency: z.string().length(3),
  attributionModel: MarketingAnalyticsAttributionSchema,
});

export type MarketingAnalyticsMetricSchemaType = z.infer<typeof MarketingAnalyticsMetricSchema>;
export type MarketingAnalyticsPeriodSchemaType = z.infer<typeof MarketingAnalyticsPeriodSchema>;
export type MarketingAnalyticsSchemaType = z.infer<typeof MarketingAnalyticsSchema>;
export type MarketingAttributionSchemaType = z.infer<typeof MarketingAttributionSchema>;
