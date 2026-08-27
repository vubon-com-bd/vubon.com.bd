/**
 * AI Ranking Response Types
 * Type definitions for AI ranking responses based on shared-constants
 * @module AIRankingResponseTypes
 */

import { Metadata } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants ai ranking
// ============================================================
import {
  // Ranking
  AIRankingType,
  AIRankingStrategy,
  AIRankingMetric,
  AIRankingFactor,
  AIRankingMode,
  AIRankingLimit,
} from '@vubon/shared-constants';

// ============================================================
// AI Ranking Response Types
// ============================================================

/**
 * Ranking result item
 */
export interface AIRankingResultItem<T = unknown> {
  /** Item ID */
  id: string;
  /** Item data */
  data: T;
  /** Ranking score */
  score: number;
  /** Position in ranking */
  position: number;
  /** Ranking explanation */
  explanation?: string;
  /** Feature scores */
  featureScores?: Record<string, number>;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Base ranking response (strategy প্রপার্টি সরানো হয়েছে)
 */
export interface AIRankingResponse<T = unknown> {
  /** Ranking results */
  items: AIRankingResultItem<T>[];
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
  /** Mode used */
  mode: AIRankingMode;
  /** Type used */
  type: AIRankingType;
  /** Metric used */
  metric: AIRankingMetric;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Personalized ranking response
 */
export interface AIPersonalizedRankingResponse<T = unknown> extends AIRankingResponse<T> {
  /** Strategy used */
  strategy: 'personalized';
  /** User ID */
  userId: string;
  /** Confidence score */
  confidenceScore: number;
  /** User segments used */
  userSegments?: string[];
}

/**
 * Popularity ranking response
 */
export interface AIPopularityRankingResponse<T = unknown> extends AIRankingResponse<T> {
  /** Strategy used */
  strategy: 'popularity';
  /** Time window used */
  timeWindow: 'day' | 'week' | 'month' | 'quarter' | 'year';
  /** Popularity scores */
  scores: Record<string, number>;
}

/**
 * Feature-based ranking response
 */
export interface AIFeatureRankingResponse<T = unknown> extends AIRankingResponse<T> {
  /** Strategy used */
  strategy: 'feature';
  /** Features used */
  featuresUsed: AIRankingFactor[];
  /** Feature weights used */
  featureWeights: Record<string, number>;
  /** Feature statistics */
  featureStats: {
    min: number;
    max: number;
    avg: number;
    stdDev: number;
  };
}

/**
 * Hybrid ranking response
 */
export interface AIHybridRankingResponse<T = unknown> extends AIRankingResponse<T> {
  /** Strategy used */
  strategy: 'hybrid';
  /** Weights used */
  weights: {
    personalized: number;
    popularity: number;
    feature: number;
    collaborative: number;
  };
  /** Contributions by strategy */
  contributions: Record<string, number>;
  /** Minimum score threshold */
  minScore: number;
}

/**
 * Batch ranking response
 */
export interface AIBatchRankingResponse<T = unknown> {
  /** Responses */
  responses: AIRankingResponse<T>[];
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
 * Ranking error response
 */
export interface AIRankingErrorResponse {
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
 * Ranking response validation
 */
export interface AIRankingResponseValidation {
  /** Whether the response is valid */
  isValid: boolean;
  /** Response type */
  type: AIRankingType;
  /** Validation errors */
  errors?: string[];
  /** Validation warnings */
  warnings?: string[];
  /** Suggestions */
  suggestions?: string[];
}

/**
 * Ranking response metadata
 */
export interface AIRankingResponseMetadata {
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
  /** Tokens used */
  tokensUsed?: number;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Ranking explanation
 */
export interface AIRankingExplanation {
  /** Item ID */
  itemId: string;
  /** Feature contributions */
  featureContributions: {
    feature: string;
    value: number;
    contribution: number;
  }[];
  /** Total score */
  totalScore: number;
  /** Explanation text */
  text?: string;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Ranking
  AIRankingType,
  AIRankingStrategy,
  AIRankingMetric,
  AIRankingFactor,
  AIRankingMode,
  AIRankingLimit,
};
