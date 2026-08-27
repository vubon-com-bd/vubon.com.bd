/**
 * AI Recommendation Response Types
 * Type definitions for AI recommendation responses based on shared-constants
 * @module AIRecommendationResponseTypes
 */

import { Metadata } from '../common/core-primitives.types';

// ============================================================
// Import AIRecommendationResponse from ai-recommendation.types
// ============================================================
import type { AIRecommendationResponse } from './ai-recommendation.types';

// ============================================================
// Import from shared-constants ai recommendation
// ============================================================
import {
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
  DiscoveryRecommendationStrategyWeight,
} from '@vubon/shared-constants';

// ============================================================
// AI Recommendation Response Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Recommendation item
 */
export interface AIRecommendationItem {
  /** Item ID */
  id: string;
  /** Item type */
  type: DiscoveryRecommendationType;
  /** Item category */
  category: DiscoveryRecommendationCategory;
  /** Score (0-1) */
  score: number;
  /** Reason for recommendation */
  reason?: string;
  /** Position in results */
  position: number;
  /** Strategy used for this recommendation */
  strategy: DiscoveryRecommendationStrategyType;
  /** Priority level */
  priority: DiscoveryRecommendationPriority;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Personalized recommendation response
 */
export interface AIPersonalizedRecommendationResponse extends AIRecommendationResponse {
  /** User ID */
  userId: string;
  /** Strategy type */
  strategy: 'personalized';
  /** Confidence score */
  confidenceScore: number;
  /** User segments used */
  userSegments?: string[];
}

/**
 * Popularity recommendation response
 */
export interface AIPopularityRecommendationResponse extends AIRecommendationResponse {
  /** Strategy type */
  strategy: 'popularity';
  /** Time window used */
  timeWindow: 'day' | 'week' | 'month' | 'quarter' | 'year';
  /** Popularity scores */
  scores: Record<string, number>;
}

/**
 * Diversity recommendation response
 */
export interface AIDiversityRecommendationResponse extends AIRecommendationResponse {
  /** Strategy type */
  strategy: 'diversity';
  /** Diversity score (0-1) */
  diversityScore: number;
  /** Categories covered */
  categoriesCovered: string[];
  /** Category distribution */
  categoryDistribution: Record<string, number>;
}

/**
 * Hybrid recommendation response
 */
export interface AIHybridRecommendationResponse extends AIRecommendationResponse {
  /** Strategy type */
  strategy: 'hybrid';
  /** Strategy weights used */
  weights: {
    personalized: number;
    popularity: number;
    diversity: number;
    contentBased: number;
    collaborative: number;
  };
  /** Contribution by strategy */
  contributions: Record<string, number>;
}

/**
 * Batch recommendation response
 */
export interface AIBatchRecommendationResponse {
  /** Responses */
  responses: AIRecommendationResponse[];
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
export interface AIRecommendationErrorResponse {
  /** Error type */
  type: 'validation' | 'processing' | 'model' | 'timeout' | 'rate_limit' | 'system';
  /** Error code */
  code: string;
  /** Error severity */
  severity: 'low' | 'medium' | 'high' | 'critical';
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
export interface AIRecommendationResponseValidation {
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
export interface AIRecommendationResponseMetadata {
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
  /** Model used */
  modelUsed?: string;
  /** Features used */
  featuresUsed?: string[];
  /** Metadata */
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
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
  DiscoveryRecommendationStrategyWeight,
};
