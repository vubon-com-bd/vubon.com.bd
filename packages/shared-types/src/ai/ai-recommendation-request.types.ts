/**
 * AI Recommendation Request Types
 * Type definitions for AI recommendation requests based on shared-constants
 * @module AIRecommendationRequestTypes
 */

import { Metadata } from '../common/core-primitives.types';

// ============================================================
// Import AIRecommendationRequest from ai-recommendation.types
// ============================================================
import type { AIRecommendationRequest } from './ai-recommendation.types';

// ============================================================
// Import from shared-constants ai recommendation
// ============================================================
import {
  // Recommendation
  DiscoveryRecommendationType,
  DiscoveryRecommendationCategory,
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
// AI Recommendation Request Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Personalized recommendation request
 */
export interface AIPersonalizedRecommendationRequest extends AIRecommendationRequest {
  /** User ID (required) */
  userId: string;
  /** Strategy type (must be personalized) */
  strategy: 'personalized';
  /** User history */
  userHistory?: {
    viewedItems?: string[];
    purchasedItems?: string[];
    favoritedItems?: string[];
    ratedItems?: { itemId: string; rating: number }[];
  };
}

/**
 * Popularity-based recommendation request
 */
export interface AIPopularityRecommendationRequest extends AIRecommendationRequest {
  /** Strategy type (must be popularity) */
  strategy: 'popularity';
  /** Time window for popularity calculation */
  timeWindow?: 'day' | 'week' | 'month' | 'quarter' | 'year';
}

/**
 * Diversity-based recommendation request
 */
export interface AIDiversityRecommendationRequest extends AIRecommendationRequest {
  /** Strategy type (must be diversity) */
  strategy: 'diversity';
  /** Diversity factor (0-1) */
  diversityFactor?: number;
  /** Categories to diversify */
  categories?: string[];
}

/**
 * Hybrid recommendation request
 */
export interface AIHybridRecommendationRequest extends AIRecommendationRequest {
  /** Strategy type (must be hybrid) */
  strategy: 'hybrid';
  /** Weights for different strategies */
  weights?: {
    personalized?: number;
    popularity?: number;
    diversity?: number;
    contentBased?: number;
    collaborative?: number;
  };
}

/**
 * Batch recommendation request
 */
export interface AIBatchRecommendationRequest {
  /** Array of recommendation requests */
  requests: AIRecommendationRequest[];
  /** Batch strategy */
  strategy?: 'parallel' | 'sequential' | 'weighted';
  /** Maximum concurrent requests */
  maxConcurrent?: number;
  /** Timeout in milliseconds */
  timeout?: number;
}

/**
 * Recommendation request validation
 */
export interface AIRecommendationRequestValidation {
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
export interface AIRecommendationRequestOptions {
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

/**
 * Recommendation context
 */
export interface AIRecommendationContext {
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
  // Recommendation
  DiscoveryRecommendationType,
  DiscoveryRecommendationCategory,
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
