/**
 * Recommendation Strategy Value Types
 * @module shared-types/platform/discovery
 */

import type {
  RECOMMENDATION_STRATEGY,
  RECOMMENDATION_STRATEGY_WEIGHT,
  RECOMMENDATION_STRATEGY_STATUS,
} from '@vubon/shared-constants/platform';

export type RecommendationStrategyValue =
  (typeof RECOMMENDATION_STRATEGY)[keyof typeof RECOMMENDATION_STRATEGY];

export type RecommendationStrategyWeight = typeof RECOMMENDATION_STRATEGY_WEIGHT;

export type RecommendationStrategyStatusValue =
  (typeof RECOMMENDATION_STRATEGY_STATUS)[keyof typeof RECOMMENDATION_STRATEGY_STATUS];

export interface RecommendationStrategyMetadata {
  readonly value: RecommendationStrategyValue;
  readonly label: string;
  readonly weight: number;
  readonly status: RecommendationStrategyStatusValue;
}
