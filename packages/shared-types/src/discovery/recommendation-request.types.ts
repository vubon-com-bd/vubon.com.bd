/**
 * Recommendation Request Types
 * Type definitions for recommendation requests based on shared-constants
 * @module RecommendationRequestTypes
 */

import { Metadata } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants discovery
// ============================================================
import {
  // Discovery Core
  DiscoveryType,
  DiscoveryCategory,
  DiscoverySource,
  // Recommendation
  DiscoveryRecommendationType,
  DiscoveryRecommendationCategory,
  DiscoveryRecommendationScore,
  // Recommendation Type
  DiscoveryRecommendationCategoryType,
  DiscoveryRecommendationSubType,
  DiscoveryRecommendationScope,
  DiscoveryRecommendationContext,
  DiscoveryRecommendationPriority,
  // Recommendation Strategy
  DiscoveryRecommendationStrategyType,
  DiscoveryRecommendationStrategyWeight,
  DiscoveryRecommendationStrategyGoal,
  DiscoveryRecommendationStrategyMetric,
  // Personalization
  DiscoveryPersonalizationType,
  DiscoveryPersonalizationCategory,
  DiscoveryPersonalizationDataSource,
  DiscoveryPersonalizationStrategy,
  // Trending
  DiscoveryTrendingType,
  DiscoveryTrendingPeriod,
  // Popular
  DiscoveryPopularType,
  DiscoveryPopularMetric,
} from '@vubon/shared-constants';

// ============================================================
// Recommendation Request Types
// ============================================================

/**
 * Base recommendation request
 */
export interface RecommendationRequest {
  /** Recommendation type */
  type: DiscoveryRecommendationType;
  /** Recommendation category */
  category?: DiscoveryRecommendationCategory;
  /** Recommendation scope */
  scope?: DiscoveryRecommendationScope;
  /** Recommendation context */
  context?: DiscoveryRecommendationContext;
  /** Priority */
  priority?: DiscoveryRecommendationPriority;
  /** Limit */
  limit?: number;
  /** Minimum score */
  minScore?: number;
  /** User ID (for personalized recommendations) */
  userId?: string;
  /** Session ID */
  sessionId?: string;
  /** Exclude items */
  excludeItemIds?: string[];
  /** Include items */
  includeItemIds?: string[];
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Personalized recommendation request
 */
export interface PersonalizedRecommendationRequest extends RecommendationRequest {
  /** User ID */
  userId: string;
  /** Personalization type */
  personalizationType?: DiscoveryPersonalizationType;
  /** Personalization strategy */
  strategy?: DiscoveryPersonalizationStrategy;
  /** Data source */
  dataSource?: DiscoveryPersonalizationDataSource;
  /** User history */
  userHistory?: {
    viewedItems?: string[];
    purchasedItems?: string[];
    favoritedItems?: string[];
    ratedItems?: { itemId: string; rating: number }[];
  };
}

/**
 * Trending recommendation request
 */
export interface TrendingRecommendationRequest extends RecommendationRequest {
  /** Trending type */
  trendingType: DiscoveryTrendingType;
  /** Trending period */
  period: DiscoveryTrendingPeriod;
  /** Min trending score */
  minTrendingScore?: number;
}

/**
 * Popular recommendation request
 */
export interface PopularRecommendationRequest extends RecommendationRequest {
  /** Popular type */
  popularType: DiscoveryPopularType;
  /** Popular metric */
  metric: DiscoveryPopularMetric;
  /** Min popular value */
  minPopularValue?: number;
}

/**
 * Strategy-based recommendation request
 */
export interface StrategyRecommendationRequest extends RecommendationRequest {
  /** Strategy type */
  strategyType: DiscoveryRecommendationStrategyType;
  /** Strategy goal */
  goal?: DiscoveryRecommendationStrategyGoal;
  /** Strategy metric */
  metric?: DiscoveryRecommendationStrategyMetric;
  /** Strategy weight */
  weight?: DiscoveryRecommendationStrategyWeight;
  /** Diversity factor */
  diversityFactor?: number;
  /** Novelty factor */
  noveltyFactor?: number;
}

/**
 * Batch recommendation request
 */
export interface BatchRecommendationRequest {
  /** Array of recommendation requests */
  requests: RecommendationRequest[];
  /** Batch strategy */
  strategy?: 'parallel' | 'sequential' | 'weighted';
  /** Max concurrent requests */
  maxConcurrent?: number;
  /** Timeout in milliseconds */
  timeout?: number;
}

/**
 * Recommendation request validation
 */
export interface RecommendationRequestValidation {
  /** Whether the request is valid */
  isValid: boolean;
  /** Request type */
  type: DiscoveryRecommendationType;
  /** Validation errors */
  errors?: string[];
  /** Validation warnings */
  warnings?: string[];
  /** Suggestions */
  suggestions?: string[];
}

/**
 * Recommendation request options
 */
export interface RecommendationRequestOptions {
  /** Timeout in milliseconds */
  timeout?: number;
  /** Retry count */
  retries?: number;
  /** Cache TTL in seconds */
  cacheTTL?: number;
  /** Real-time flag */
  realTime?: boolean;
  /** Debug mode */
  debug?: boolean;
  /** Metadata */
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Discovery Core
  DiscoveryType,
  DiscoveryCategory,
  DiscoverySource,
  // Recommendation
  DiscoveryRecommendationType,
  DiscoveryRecommendationCategory,
  DiscoveryRecommendationScore,
  // Recommendation Type
  DiscoveryRecommendationCategoryType,
  DiscoveryRecommendationSubType,
  DiscoveryRecommendationScope,
  DiscoveryRecommendationContext,
  DiscoveryRecommendationPriority,
  // Recommendation Strategy
  DiscoveryRecommendationStrategyType,
  DiscoveryRecommendationStrategyWeight,
  DiscoveryRecommendationStrategyGoal,
  DiscoveryRecommendationStrategyMetric,
  // Personalization
  DiscoveryPersonalizationType,
  DiscoveryPersonalizationCategory,
  DiscoveryPersonalizationDataSource,
  DiscoveryPersonalizationStrategy,
  // Trending
  DiscoveryTrendingType,
  DiscoveryTrendingPeriod,
  // Popular
  DiscoveryPopularType,
  DiscoveryPopularMetric,
};
