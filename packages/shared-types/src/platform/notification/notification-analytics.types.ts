/**
 * Notification Analytics Types
 * @module shared-types/platform/notification
 */

import type {
  NOTIFICATION_ANALYTICS_METRIC,
  NOTIFICATION_ANALYTICS_PERIOD,
} from '@vubon/shared-constants/platform';

export type NotificationAnalyticsMetricValue =
  (typeof NOTIFICATION_ANALYTICS_METRIC)[keyof typeof NOTIFICATION_ANALYTICS_METRIC];

export type NotificationAnalyticsPeriodValue =
  (typeof NOTIFICATION_ANALYTICS_PERIOD)[keyof typeof NOTIFICATION_ANALYTICS_PERIOD];

export interface NotificationAnalytics {
  readonly metric: NotificationAnalyticsMetricValue;
  readonly period: NotificationAnalyticsPeriodValue;
  readonly value: number;
  readonly previousValue?: number;
  readonly changePercent?: number;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly capturedAt: string;
}

export interface NotificationChannelStats {
  readonly channel: string;
  readonly sent: number;
  readonly delivered: number;
  readonly opened: number;
  readonly clicked: number;
  readonly failed: number;
  readonly deliveryRate: number;
  readonly openRate: number;
  readonly clickRate: number;
}
