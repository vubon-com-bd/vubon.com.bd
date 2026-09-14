/**
 * SEO Analytics Types
 * @module shared-types/platform/seo
 */

import type { SEO_ANALYTICS_METRIC, SEO_ANALYTICS_PERIOD } from '@vubon/shared-constants/platform';

export type SeoAnalyticsMetricValue =
  (typeof SEO_ANALYTICS_METRIC)[keyof typeof SEO_ANALYTICS_METRIC];

export type SeoAnalyticsPeriodValue =
  (typeof SEO_ANALYTICS_PERIOD)[keyof typeof SEO_ANALYTICS_PERIOD];

export interface SeoAnalytics {
  readonly metric: SeoAnalyticsMetricValue;
  readonly period: SeoAnalyticsPeriodValue;
  readonly value: number;
  readonly previousValue?: number;
  readonly changePercent?: number;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly capturedAt: string;
}

export interface SeoAnalyticsSnapshot {
  readonly period: SeoAnalyticsPeriodValue;
  readonly metrics: readonly SeoAnalytics[];
  readonly capturedAt: string;
}
