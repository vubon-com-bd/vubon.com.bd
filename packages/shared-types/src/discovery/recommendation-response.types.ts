/**
 * Recommendation Response Types
 * Type definitions for recommendation responses based on shared-constants
 * @module RecommendationResponseTypes
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
  DiscoveryRecommendationStatus,
  DiscoveryRecommendationScore,
  // Recommendation Type
  DiscoveryRecommendationCategoryType,
  DiscoveryRecommendationSubType,
  DiscoveryRecommendationScope,
  DiscoveryRecommendationContext,
  DiscoveryRecommendationPriority,
  // Recommendation Strategy
  DiscoveryRecommendationStrategyType,
  DiscoveryRecommendationStrategyGoal,
  DiscoveryRecommendationStrategyMetric,
  // Personalization
  DiscoveryPersonalizationType,
  DiscoveryPersonalizationCategory,
  DiscoveryPersonalizationStrategy,
  // Trending
  DiscoveryTrendingType,
  DiscoveryTrendingPeriod,
  // Popular
  DiscoveryPopularType,
  DiscoveryPopularMetric,
  // Discovery Error
  DiscoveryErrorType,
  DiscoveryErrorSeverity,
  DiscoveryErrorCode,
} from '@vubon/shared-constants';

// ============================================================
// Recommendation Response Types
// ============================================================

/**
 * Recommendation item
 */
export interface RecommendationItem {
  /** Item ID */
  id: string;
  /** Item type */
  type: DiscoveryRecommendationType;
  /** Item category */
  category: DiscoveryRecommendationCategory;
  /** Score */
  score: number;
  /** Reason for recommendation */
  reason?: string;
  /** Position in results */
  position: number;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Base recommendation response
 */
export interface RecommendationResponse {
  /** Recommendations */
  items: RecommendationItem[];
  /** Total count */
  total: number;
  /** Requested limit */
  limit: number;
  /** Offset */
  offset: number;
  /** Has more */
  hasMore: boolean;
  /** Request ID */
  requestId: string;
  /** Response timestamp */
  timestamp: Date;
  /** Processing time in milliseconds */
  processingTimeMs: number;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Personalized recommendation response
 */
export interface PersonalizedRecommendationResponse extends RecommendationResponse {
  /** User ID */
  userId: string;
  /** Personalization type */
  personalizationType: DiscoveryPersonalizationType;
  /** Strategy used */
  strategy: DiscoveryPersonalizationStrategy;
  /** Confidence score */
  confidenceScore: number;
}

/**
 * Trending recommendation response
 */
export interface TrendingRecommendationResponse extends RecommendationResponse {
  /** Trending type */
  trendingType: DiscoveryTrendingType;
  /** Period */
  period: DiscoveryTrendingPeriod;
  /** Trending scores */
  scores: Record<string, number>;
}

/**
 * Popular recommendation response
 */
export interface PopularRecommendationResponse extends RecommendationResponse {
  /** Popular type */
  popularType: DiscoveryPopularType;
  /** Metric used */
  metric: DiscoveryPopularMetric;
  /** Values */
  values: Record<string, number>;
}

/**
 * Strategy recommendation response
 */
export interface StrategyRecommendationResponse extends RecommendationResponse {
  /** Strategy type */
  strategyType: DiscoveryRecommendationStrategyType;
  /** Goal */
  goal: DiscoveryRecommendationStrategyGoal;
  /** Metric */
  metric: DiscoveryRecommendationStrategyMetric;
  /** Strategy metrics */
  metrics: {
    diversityScore: number;
    noveltyScore: number;
    coverageScore: number;
    relevanceScore: number;
  };
}

/**
 * Batch recommendation response
 */
export interface BatchRecommendationResponse {
  /** Responses */
  responses: RecommendationResponse[];
  /** Total requests */
  totalRequests: number;
  /** Successful requests */
  successCount: number;
  /** Failed requests */
  failedCount: number;
  /** Total processing time */
  totalProcessingTimeMs: number;
  /** Batch metadata */
  metadata?: {
    strategy: string;
    maxConcurrent: number;
    timeout: number;
  };
}

/**
 * Recommendation error response
 */
export interface RecommendationErrorResponse {
  /** Error type */
  type: DiscoveryErrorType;
  /** Error code */
  code: DiscoveryErrorCode;
  /** Error severity */
  severity: DiscoveryErrorSeverity;
  /** Error message */
  message: string;
  /** Error details */
  details?: Record<string, unknown>;
  /** Error timestamp */
  timestamp: Date;
  /** Request ID */
  requestId?: string;
  /** Retryable */
  retryable: boolean;
  /** Retry after (seconds) */
  retryAfter?: number;
}

/**
 * Recommendation response validation
 */
export interface RecommendationResponseValidation {
  /** Whether the response is valid */
  isValid: boolean;
  /** Response type */
  type: DiscoveryRecommendationType;
  /** Validation errors */
  errors?: string[];
  /** Validation warnings */
  warnings?: string[];
  /** Suggestions */
  suggestions?: string[];
}

/**
 * Recommendation response metadata
 */
export interface RecommendationResponseMetadata {
  /** Request ID */
  requestId: string;
  /** Response timestamp */
  timestamp: Date;
  /** Processing time in milliseconds */
  processingTimeMs: number;
  /** Cache hit */
  cacheHit: boolean;
  /** Cache TTL */
  cacheTTL?: number;
  /** Version */
  version?: string;
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
  DiscoveryRecommendationStatus,
  DiscoveryRecommendationScore,
  // Recommendation Type
  DiscoveryRecommendationCategoryType,
  DiscoveryRecommendationSubType,
  DiscoveryRecommendationScope,
  DiscoveryRecommendationContext,
  DiscoveryRecommendationPriority,
  // Recommendation Strategy
  DiscoveryRecommendationStrategyType,
  DiscoveryRecommendationStrategyGoal,
  DiscoveryRecommendationStrategyMetric,
  // Personalization
  DiscoveryPersonalizationType,
  DiscoveryPersonalizationCategory,
  DiscoveryPersonalizationStrategy,
  // Trending
  DiscoveryTrendingType,
  DiscoveryTrendingPeriod,
  // Popular
  DiscoveryPopularType,
  DiscoveryPopularMetric,
  // Discovery Error
  DiscoveryErrorType,
  DiscoveryErrorSeverity,
  DiscoveryErrorCode,
};
