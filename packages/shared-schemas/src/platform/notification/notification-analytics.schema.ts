/**
 * Notification Analytics Schema
 * @module shared-schemas/platform/notification
 *
 * Values আসে shared-constants/platform/notification-analytics.constants থেকে।
 */

import { z } from 'zod';
import {
  NOTIFICATION_ANALYTICS_METRIC,
  NOTIFICATION_ANALYTICS_PERIOD,
} from '@vubon/shared-constants/platform';

export const NotificationAnalyticsMetricSchema = z.enum(
  Object.values(NOTIFICATION_ANALYTICS_METRIC) as [string, ...string[]]
);

export const NotificationAnalyticsPeriodSchema = z.enum(
  Object.values(NOTIFICATION_ANALYTICS_PERIOD) as [string, ...string[]]
);

export const NotificationAnalyticsSchema = z.object({
  metric: NotificationAnalyticsMetricSchema,
  period: NotificationAnalyticsPeriodSchema,
  value: z.number(),
  previousValue: z.number().optional(),
  changePercent: z.number().optional(),
  periodStart: z.string().datetime(),
  periodEnd: z.string().datetime(),
  capturedAt: z.string().datetime(),
});

export const NotificationChannelStatsSchema = z.object({
  channel: z.string().min(1).max(50),
  sent: z.number().int().nonnegative(),
  delivered: z.number().int().nonnegative(),
  opened: z.number().int().nonnegative(),
  clicked: z.number().int().nonnegative(),
  failed: z.number().int().nonnegative(),
  deliveryRate: z.number().min(0).max(1),
  openRate: z.number().min(0).max(1),
  clickRate: z.number().min(0).max(1),
});

export type NotificationAnalyticsMetricSchemaType = z.infer<
  typeof NotificationAnalyticsMetricSchema
>;
export type NotificationAnalyticsPeriodSchemaType = z.infer<
  typeof NotificationAnalyticsPeriodSchema
>;
export type NotificationAnalyticsSchemaType = z.infer<typeof NotificationAnalyticsSchema>;
