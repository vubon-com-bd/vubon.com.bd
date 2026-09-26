/**
 * Logistics Analytics Schema
 * @module shared-schemas/logistics
 *
 * Values আসে shared-constants/logistics/logistics-analytics.constants থেকে।
 */

import { z } from 'zod';
import {
  LOGISTICS_ANALYTICS_METRIC,
  LOGISTICS_ANALYTICS_PERIOD,
} from '@vubon/shared-constants/logistics';

export const LogisticsAnalyticsMetricSchema = z.enum(
  Object.values(LOGISTICS_ANALYTICS_METRIC) as [string, ...string[]]
);

export const LogisticsAnalyticsPeriodSchema = z.enum(
  Object.values(LOGISTICS_ANALYTICS_PERIOD) as [string, ...string[]]
);

export const LogisticsAnalyticsSchema = z.object({
  metric: LogisticsAnalyticsMetricSchema,
  period: LogisticsAnalyticsPeriodSchema,
  value: z.number(),
  previousValue: z.number().optional(),
  changePercent: z.number().optional(),
  periodStart: z.string().datetime(),
  periodEnd: z.string().datetime(),
  capturedAt: z.string().datetime(),
});

export const LogisticsMetricsSchema = z.object({
  period: z.string().min(1).max(50),
  shipmentsCreated: z.number().int().nonnegative(),
  shipmentsDelivered: z.number().int().nonnegative(),
  shipmentsInTransit: z.number().int().nonnegative(),
  shipmentsFailed: z.number().int().nonnegative(),
  onTimeDeliveryRate: z.number().min(0).max(1),
  averageDeliveryMinutes: z.number().nonnegative(),
  averageTransitMinutes: z.number().nonnegative(),
  firstAttemptSuccessRate: z.number().min(0).max(1),
  returnRate: z.number().min(0).max(1),
  damageRate: z.number().min(0).max(1),
  lossRate: z.number().min(0).max(1),
  costPerShipment: z.number().nonnegative(),
  currency: z.string().length(3),
  byStatus: z.record(z.string(), z.number().int().nonnegative()),
  byPriority: z.record(z.string(), z.number().int().nonnegative()),
});

export type LogisticsAnalyticsMetricSchemaType = z.infer<typeof LogisticsAnalyticsMetricSchema>;
export type LogisticsAnalyticsPeriodSchemaType = z.infer<typeof LogisticsAnalyticsPeriodSchema>;
export type LogisticsAnalyticsSchemaType = z.infer<typeof LogisticsAnalyticsSchema>;
export type LogisticsMetricsSchemaType = z.infer<typeof LogisticsMetricsSchema>;
