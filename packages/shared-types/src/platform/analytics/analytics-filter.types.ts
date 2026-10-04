/**
 * Analytics Filter Types
 * @module shared-types/platform/analytics
 */

import type {
  ANALYTICS_FILTER_OPERATOR,
  ANALYTICS_FILTER_LOGIC,
} from '@vubon/shared-constants/platform';

export type AnalyticsFilterOperatorValue =
  (typeof ANALYTICS_FILTER_OPERATOR)[keyof typeof ANALYTICS_FILTER_OPERATOR];

export type AnalyticsFilterLogicValue =
  (typeof ANALYTICS_FILTER_LOGIC)[keyof typeof ANALYTICS_FILTER_LOGIC];

export interface AnalyticsFilter {
  readonly field: string;
  readonly operator: AnalyticsFilterOperatorValue;
  readonly value: unknown;
}

export interface AnalyticsFilterGroup {
  readonly logic: AnalyticsFilterLogicValue;
  readonly filters: readonly (AnalyticsFilter | AnalyticsFilterGroup)[];
}
