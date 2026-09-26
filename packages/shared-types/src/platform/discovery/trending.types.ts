/**
 * Trending Types
 * @module shared-types/platform/discovery
 */

import type {
  TRENDING_TYPE,
  TRENDING_PERIOD,
  TRENDING_STATUS,
} from '@vubon/shared-constants/platform';

export type TrendingTypeValue = (typeof TRENDING_TYPE)[keyof typeof TRENDING_TYPE];

export type TrendingPeriodValue = (typeof TRENDING_PERIOD)[keyof typeof TRENDING_PERIOD];

export type TrendingStatusValue = (typeof TRENDING_STATUS)[keyof typeof TRENDING_STATUS];

export interface TrendingItem {
  readonly id: string;
  readonly type: TrendingTypeValue;
  readonly referenceId: string;
  readonly period: TrendingPeriodValue;
  readonly status: TrendingStatusValue;
  readonly score: number;
  readonly rank: number;
  readonly viewCount: number;
  readonly purchaseCount: number;
  readonly trend: 'rising' | 'stable' | 'falling';
  readonly capturedAt: string;
}

export interface TrendingList {
  readonly type: TrendingTypeValue;
  readonly period: TrendingPeriodValue;
  readonly items: readonly TrendingItem[];
  readonly generatedAt: string;
}
