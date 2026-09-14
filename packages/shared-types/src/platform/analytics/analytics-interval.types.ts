/**
 * Analytics Interval Types
 * @module shared-types/platform/analytics
 */

import type {
  ANALYTICS_INTERVAL,
  ANALYTICS_INTERVAL_SECONDS,
} from '@vubon/shared-constants/platform';

export type AnalyticsIntervalValue = (typeof ANALYTICS_INTERVAL)[keyof typeof ANALYTICS_INTERVAL];

export type AnalyticsIntervalSeconds =
  (typeof ANALYTICS_INTERVAL_SECONDS)[keyof typeof ANALYTICS_INTERVAL_SECONDS];

export interface AnalyticsIntervalMetadata {
  readonly value: AnalyticsIntervalValue;
  readonly label: string;
  readonly seconds: AnalyticsIntervalSeconds;
}
