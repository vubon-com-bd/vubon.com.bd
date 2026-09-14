/**
 * Analytics Metric Types
 * @module shared-types/platform/analytics
 */

import type { ANALYTICS_METRIC, ANALYTICS_METRIC_UNIT } from '@vubon/shared-constants/platform';

export type AnalyticsMetricValue = (typeof ANALYTICS_METRIC)[keyof typeof ANALYTICS_METRIC];

export type AnalyticsMetricUnitValue =
  (typeof ANALYTICS_METRIC_UNIT)[keyof typeof ANALYTICS_METRIC_UNIT];

export interface AnalyticsMetric {
  readonly name: AnalyticsMetricValue;
  readonly value: number;
  readonly unit: AnalyticsMetricUnitValue;
  readonly previousValue?: number;
  readonly changePercent?: number;
}

export interface AnalyticsMetricMetadata {
  readonly value: AnalyticsMetricValue;
  readonly label: string;
  readonly unit: AnalyticsMetricUnitValue;
  readonly isHigherBetter: boolean;
}
