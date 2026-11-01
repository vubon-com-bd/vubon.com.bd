/**
 * Marketing Analytics Types
 * @module shared-types/marketing
 */

import type {
  MARKETING_ANALYTICS_METRIC,
  MARKETING_ANALYTICS_PERIOD,
  MARKETING_ANALYTICS_ATTRIBUTION,
} from '@vubon/shared-constants/marketing';

export type MarketingAnalyticsMetricValue =
  (typeof MARKETING_ANALYTICS_METRIC)[keyof typeof MARKETING_ANALYTICS_METRIC];

export type MarketingAnalyticsPeriodValue =
  (typeof MARKETING_ANALYTICS_PERIOD)[keyof typeof MARKETING_ANALYTICS_PERIOD];

export type MarketingAnalyticsAttributionValue =
  (typeof MARKETING_ANALYTICS_ATTRIBUTION)[keyof typeof MARKETING_ANALYTICS_ATTRIBUTION];

export interface MarketingAnalytics {
  readonly metric: MarketingAnalyticsMetricValue;
  readonly period: MarketingAnalyticsPeriodValue;
  readonly value: number;
  readonly previousValue?: number;
  readonly changePercent?: number;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly capturedAt: string;
}

export interface MarketingAttribution {
  readonly channel: string;
  readonly source: string;
  readonly campaignId?: string;
  readonly conversions: number;
  readonly revenue: number;
  readonly currency: string;
  readonly attributionModel: MarketingAnalyticsAttributionValue;
}
