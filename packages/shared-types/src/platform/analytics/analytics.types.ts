/**
 * Analytics Core Types
 * @module shared-types/platform/analytics
 *
 * Analytics entity + aggregator।
 */

import type { BaseEntity } from '../../common/base';
import type { AnalyticsTypeValue } from './analytics-type.types';
import type { AnalyticsCategoryValue } from './analytics-category.types';
import type { AnalyticsStatusValue } from './analytics-status.types';
import type { AnalyticsMetric } from './analytics-metric.types';
import type { AnalyticsPeriod } from './analytics-period.types';

export interface Analytics extends BaseEntity<string> {
  readonly name: string;
  readonly type: AnalyticsTypeValue;
  readonly category: AnalyticsCategoryValue;
  readonly status: AnalyticsStatusValue;
  readonly period: AnalyticsPeriod;
  readonly metrics: readonly AnalyticsMetric[];
  readonly dimensions?: Readonly<Record<string, string | number | boolean>>;
  readonly filters?: Readonly<Record<string, unknown>>;
  readonly generatedAt: string;
  readonly generatedBy?: string;
  readonly cacheKey?: string;
  readonly expiresAt?: string;
}

export interface AnalyticsPublic {
  readonly id: string;
  readonly name: string;
  readonly type: AnalyticsTypeValue;
  readonly category: AnalyticsCategoryValue;
  readonly period: AnalyticsPeriod;
  readonly metrics: readonly AnalyticsMetric[];
}

export interface AnalyticsSummary {
  readonly id: string;
  readonly name: string;
  readonly type: AnalyticsTypeValue;
  readonly category: AnalyticsCategoryValue;
  readonly status: AnalyticsStatusValue;
  readonly generatedAt: string;
}

export interface AnalyticsQueryInput {
  readonly type: AnalyticsTypeValue;
  readonly category: AnalyticsCategoryValue;
  readonly period: AnalyticsPeriod;
  readonly metrics: readonly string[];
  readonly dimensions?: readonly string[];
  readonly filters?: Readonly<Record<string, unknown>>;
}

export interface AnalyticsQueryResult {
  readonly data: readonly Readonly<Record<string, unknown>>[];
  readonly metrics: readonly string[];
  readonly dimensions: readonly string[];
  readonly period: AnalyticsPeriod;
  readonly rowCount: number;
  readonly cached: boolean;
  readonly generatedAt: string;
}

export interface AnalyticsListFilter {
  readonly type?: AnalyticsTypeValue;
  readonly category?: AnalyticsCategoryValue;
  readonly status?: AnalyticsStatusValue;
  readonly period?: AnalyticsPeriod;
  readonly fromDate?: string;
  readonly toDate?: string;
}
