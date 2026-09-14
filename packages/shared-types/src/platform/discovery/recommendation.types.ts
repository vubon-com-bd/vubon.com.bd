/**
 * Recommendation Core Types
 * @module shared-types/platform/discovery
 */

import type { UserId } from '../../common/primitives';
import type { BaseEntity } from '../../common/base';
import type { RecommendationTypeValue } from './recommendation-type.types';
import type { RecommendationStrategyValue } from './recommendation-strategy.types';

export interface Recommendation {
  readonly id: string;
  readonly userId?: UserId;
  readonly sessionId?: string;
  readonly type: RecommendationTypeValue;
  readonly strategy: RecommendationStrategyValue;
  readonly items: readonly RecommendationItem[];
  readonly context?: RecommendationContext;
  readonly generatedAt: string;
  readonly expiresAt?: string;
  readonly score?: number;
}

export interface RecommendationItem {
  readonly productId: string;
  readonly score: number;
  readonly rank: number;
  readonly reason?: string;
  readonly strategy?: RecommendationStrategyValue;
}

export interface RecommendationContext {
  readonly sourceProductId?: string;
  readonly sourceCategoryId?: string;
  readonly sourceBrandId?: string;
  readonly cartItems?: readonly string[];
  readonly lastViewedAt?: string;
}

export interface RecommendationPublic {
  readonly id: string;
  readonly type: RecommendationTypeValue;
  readonly items: readonly RecommendationItem[];
  readonly generatedAt: string;
}

export interface RecommendationRequest {
  readonly userId?: UserId;
  readonly sessionId?: string;
  readonly type: RecommendationTypeValue;
  readonly context?: RecommendationContext;
  readonly limit?: number;
  readonly excludePurchased?: boolean;
}

export interface RecommendationResult {
  readonly items: readonly RecommendationItem[];
  readonly total: number;
  readonly strategy: RecommendationStrategyValue;
  readonly took: number;
  readonly cached: boolean;
}

export interface Recommendation extends BaseEntity<string> {
  readonly recommendationId: string;
  readonly userId?: UserId;
  readonly type: RecommendationTypeValue;
  readonly itemCount: number;
  readonly generatedAt: string;
  readonly servedCount: number;
  readonly clickedCount: number;
  readonly convertedCount: number;
}
