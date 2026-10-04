/**
 * Analytics Aggregation Types
 * @module shared-types/platform/analytics
 */

import type { ANALYTICS_AGGREGATION, ANALYTICS_PERCENTILE } from '@vubon/shared-constants/platform';

export type AnalyticsAggregationValue =
  (typeof ANALYTICS_AGGREGATION)[keyof typeof ANALYTICS_AGGREGATION];

export type AnalyticsPercentileValue =
  (typeof ANALYTICS_PERCENTILE)[keyof typeof ANALYTICS_PERCENTILE];

export interface AnalyticsAggregation {
  readonly metric: string;
  readonly aggregation: AnalyticsAggregationValue;
  readonly value: number;
}

export interface AnalyticsAggregationMetadata {
  readonly value: AnalyticsAggregationValue;
  readonly label: string;
  readonly requiresNumeric: boolean;
}
