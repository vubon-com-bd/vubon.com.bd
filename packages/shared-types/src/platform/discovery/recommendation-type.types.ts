/**
 * Recommendation Type Value Types
 * @module shared-types/platform/discovery
 */

import type { RECOMMENDATION_TYPE } from '@vubon/shared-constants/platform';

export type RecommendationTypeValue =
  (typeof RECOMMENDATION_TYPE)[keyof typeof RECOMMENDATION_TYPE];

export interface RecommendationTypeMetadata {
  readonly value: RecommendationTypeValue;
  readonly label: string;
  readonly isPersonalized: boolean;
  readonly requiresUserContext: boolean;
}
