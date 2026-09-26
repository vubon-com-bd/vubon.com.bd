/**
 * Support Analytics Schema
 * @module shared-schemas/support
 *
 * Values আসে shared-constants/support/support-analytics.constants থেকে।
 */

import { z } from 'zod';
import {
  SUPPORT_ANALYTICS_METRIC,
  SUPPORT_ANALYTICS_PERIOD,
} from '@vubon/shared-constants/support';

export const SupportAnalyticsMetricSchema = z.enum(
  Object.values(SUPPORT_ANALYTICS_METRIC) as [string, ...string[]]
);

export const SupportAnalyticsPeriodSchema = z.enum(
  Object.values(SUPPORT_ANALYTICS_PERIOD) as [string, ...string[]]
);

export const SupportAnalyticsSchema = z.object({
  metric: SupportAnalyticsMetricSchema,
  period: SupportAnalyticsPeriodSchema,
  value: z.number(),
  previousValue: z.number().optional(),
  changePercent: z.number().optional(),
  periodStart: z.string().datetime(),
  periodEnd: z.string().datetime(),
  capturedAt: z.string().datetime(),
});

export const SupportMetricsSchema = z.object({
  period: z.string().min(1).max(50),
  ticketsCreated: z.number().int().nonnegative(),
  ticketsResolved: z.number().int().nonnegative(),
  ticketsOpen: z.number().int().nonnegative(),
  ticketsEscalated: z.number().int().nonnegative(),
  averageFirstResponseMinutes: z.number().nonnegative(),
  averageResolutionMinutes: z.number().nonnegative(),
  firstContactResolutionRate: z.number().min(0).max(1),
  csatScore: z.number().min(0).max(100),
  npsScore: z.number().min(-100).max(100),
  slaComplianceRate: z.number().min(0).max(1),
  reopenRate: z.number().min(0).max(1),
  byStatus: z.record(z.string(), z.number().int().nonnegative()),
  byPriority: z.record(z.string(), z.number().int().nonnegative()),
});

export type SupportAnalyticsMetricSchemaType = z.infer<typeof SupportAnalyticsMetricSchema>;
export type SupportAnalyticsPeriodSchemaType = z.infer<typeof SupportAnalyticsPeriodSchema>;
export type SupportAnalyticsSchemaType = z.infer<typeof SupportAnalyticsSchema>;
export type SupportMetricsSchemaType = z.infer<typeof SupportMetricsSchema>;
