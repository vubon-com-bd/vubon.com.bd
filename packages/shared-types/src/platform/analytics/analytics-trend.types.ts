/**
 * Analytics Trend Types
 * @module shared-types/platform/analytics
 */

import type {
  ANALYTICS_TREND_TYPE,
  ANALYTICS_TREND_STRENGTH,
} from '@vubon/shared-constants/platform';

export type AnalyticsTrendTypeValue =
  (typeof ANALYTICS_TREND_TYPE)[keyof typeof ANALYTICS_TREND_TYPE];

export type AnalyticsTrendStrengthValue =
  (typeof ANALYTICS_TREND_STRENGTH)[keyof typeof ANALYTICS_TREND_STRENGTH];

export interface AnalyticsTrend {
  readonly metric: string;
  readonly trend: AnalyticsTrendTypeValue;
  readonly strength: AnalyticsTrendStrengthValue;
  readonly slope: number;
  readonly startValue: number;
  readonly endValue: number;
  readonly dataPoints: number;
}
