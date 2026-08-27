/**
 * AI Ranking Request Types
 * Type definitions for AI ranking requests based on shared-constants
 * @module AIRankingRequestTypes
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
// AI Ranking Request Types
// ============================================================

/**
 * Base ranking request (strategy প্রপার্টি সরানো হয়েছে)
 */
export interface AIRankingRequest {
  /** User ID */
  userId: string;
  /** Ranking type */
  type?: AIRankingType;
  /** Ranking metric */
  metric?: AIRankingMetric;
  /** Ranking mode */
  mode?: AIRankingMode;
  /** Items to rank */
  itemIds?: string[];
  /** Features to use */
  features?: AIRankingFactor[];
  /** Maximum number of results */
  limit?: AIRankingLimit;
  /** Request metadata */
  metadata?: Metadata;
}

/**
 * Personalized ranking request
 */
export interface AIPersonalizedRankingRequest extends AIRankingRequest {
  /** Strategy must be personalized */
  strategy: 'personalized';
  /** User history */
  userHistory?: {
    viewedItems?: string[];
    purchasedItems?: string[];
    favoritedItems?: string[];
    ratedItems?: { itemId: string; rating: number }[];
  };
  /** Confidence threshold */
  confidenceThreshold?: number;
}

/**
 * Popularity ranking request
 */
export interface AIPopularityRankingRequest extends AIRankingRequest {
  /** Strategy must be popularity */
  strategy: 'popularity';
  /** Time window for popularity calculation */
  timeWindow?: 'day' | 'week' | 'month' | 'quarter' | 'year';
  /** Minimum popularity score */
  minScore?: number;
}

/**
 * Feature-based ranking request
 */
export interface AIFeatureRankingRequest extends AIRankingRequest {
  /** Strategy must be feature */
  strategy: 'feature';
  /** Features to rank by */
  features: AIRankingFactor[];
  /** Feature weights */
  featureWeights?: Record<string, number>;
}

/**
 * Hybrid ranking request
 */
export interface AIHybridRankingRequest extends AIRankingRequest {
  /** Strategy must be hybrid */
  strategy: 'hybrid';
  /** Weights for different strategies */
  weights?: {
    personalized?: number;
    popularity?: number;
    feature?: number;
    collaborative?: number;
  };
  /** Minimum score threshold */
  minScore?: number;
}

/**
 * Batch ranking request
 */
export interface AIBatchRankingRequest {
  /** Array of ranking requests */
  requests: AIRankingRequest[];
  /** Batch strategy */
  strategy?: 'parallel' | 'sequential' | 'weighted';
  /** Maximum concurrent requests */
  maxConcurrent?: number;
  /** Timeout in milliseconds */
  timeout?: number;
}

/**
 * Ranking request validation
 */
export interface AIRankingRequestValidation {
  /** Whether the request is valid */
  isValid: boolean;
  /** Request type */
  type: AIRankingType;
  /** Validation errors */
  errors?: string[];
  /** Validation warnings */
  warnings?: string[];
  /** Suggestions */
  suggestions?: string[];
}

/**
 * Ranking request options
 */
export interface AIRankingRequestOptions {
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
  /** Track analytics */
  trackAnalytics?: boolean;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Ranking context
 */
export interface AIRankingContext {
  /** User ID */
  userId?: string;
  /** Session ID */
  sessionId?: string;
  /** Device type */
  deviceType?: 'desktop' | 'mobile' | 'tablet' | 'tv' | 'wearable';
  /** Location */
  location?: {
    country?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
  };
  /** Time of day */
  timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'night';
  /** Season */
  season?: 'spring' | 'summer' | 'fall' | 'winter';
  /** Current page */
  currentPage?: string;
  /** Referrer */
  referrer?: string;
  /** Additional context */
  [key: string]: unknown;
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
