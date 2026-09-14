/**
 * Search Analytics Types
 * @module shared-types/platform/search
 */

import type {
  SEARCH_ANALYTICS_METRIC,
  SEARCH_ANALYTICS_PERIOD,
} from '@vubon/shared-constants/platform';

export type SearchAnalyticsMetricValue =
  (typeof SEARCH_ANALYTICS_METRIC)[keyof typeof SEARCH_ANALYTICS_METRIC];

export type SearchAnalyticsPeriodValue =
  (typeof SEARCH_ANALYTICS_PERIOD)[keyof typeof SEARCH_ANALYTICS_PERIOD];

export interface SearchAnalytics {
  readonly metric: SearchAnalyticsMetricValue;
  readonly period: SearchAnalyticsPeriodValue;
  readonly value: number;
  readonly previousValue?: number;
  readonly changePercent?: number;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly capturedAt: string;
}

export interface SearchQueryStats {
  readonly query: string;
  readonly count: number;
  readonly zeroResultCount: number;
  readonly averageResultsCount: number;
  readonly clickThroughRate: number;
  readonly conversionRate: number;
  readonly lastSearchedAt: string;
}
