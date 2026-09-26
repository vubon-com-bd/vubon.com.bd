/**
 * AI Analytics Types
 * @module shared-types/ai
 *
 * Values আসে shared-constants/ai/ai-analytics.constants থেকে।
 */

import type { AI_ANALYTICS_METRIC, AI_ANALYTICS_PERIOD } from '@vubon/shared-constants/ai';

export type AiAnalyticsMetricValue = (typeof AI_ANALYTICS_METRIC)[keyof typeof AI_ANALYTICS_METRIC];

export type AiAnalyticsPeriodValue = (typeof AI_ANALYTICS_PERIOD)[keyof typeof AI_ANALYTICS_PERIOD];

export interface AiAnalytics {
  readonly metric: AiAnalyticsMetricValue;
  readonly period: AiAnalyticsPeriodValue;
  readonly value: number;
  readonly previousValue?: number;
  readonly changePercent?: number;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly capturedAt: string;
}

export interface AiModelUsage {
  readonly model: string;
  readonly requestCount: number;
  readonly tokenCount: number;
  readonly cost: number;
  readonly currency: string;
  readonly averageLatencyMs: number;
  readonly errorCount: number;
  readonly periodStart: string;
  readonly periodEnd: string;
}
