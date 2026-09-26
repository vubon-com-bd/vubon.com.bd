/**
 * Popular Types
 * @module shared-types/platform/discovery
 */

import type {
  POPULAR_TYPE,
  POPULAR_PERIOD,
  POPULAR_METRIC,
} from '@vubon/shared-constants/platform';

export type PopularTypeValue = (typeof POPULAR_TYPE)[keyof typeof POPULAR_TYPE];

export type PopularPeriodValue = (typeof POPULAR_PERIOD)[keyof typeof POPULAR_PERIOD];

export type PopularMetricValue = (typeof POPULAR_METRIC)[keyof typeof POPULAR_METRIC];

export interface PopularItem {
  readonly id: string;
  readonly type: PopularTypeValue;
  readonly referenceId: string;
  readonly period: PopularPeriodValue;
  readonly metric: PopularMetricValue;
  readonly value: number;
  readonly rank: number;
  readonly capturedAt: string;
}

export interface PopularList {
  readonly type: PopularTypeValue;
  readonly period: PopularPeriodValue;
  readonly items: readonly PopularItem[];
  readonly generatedAt: string;
}
