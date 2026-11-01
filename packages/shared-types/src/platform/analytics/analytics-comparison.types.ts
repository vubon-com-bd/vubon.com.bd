/**
 * Analytics Comparison Types
 * @module shared-types/platform/analytics
 */

import type { ANALYTICS_COMPARISON, ANALYTICS_CHANGE_TYPE } from '@vubon/shared-constants/platform';

export type AnalyticsComparisonValue =
  (typeof ANALYTICS_COMPARISON)[keyof typeof ANALYTICS_COMPARISON];

export type AnalyticsChangeTypeValue =
  (typeof ANALYTICS_CHANGE_TYPE)[keyof typeof ANALYTICS_CHANGE_TYPE];

export interface AnalyticsComparison {
  readonly comparison: AnalyticsComparisonValue;
  readonly currentValue: number;
  readonly previousValue: number;
  readonly change: number;
  readonly changePercent: number;
  readonly changeType: AnalyticsChangeTypeValue;
}
