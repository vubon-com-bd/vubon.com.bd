/**
 * AI Search Request Types
 * Type definitions for AI search requests based on shared-constants
 * @module AISearchRequestTypes
 */

import { Metadata } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants ai search
// ============================================================
import {
  // Search
  AISearchType,
  AISearchStrategy,
  AISearchFilter,
  AISearchSort,
  AISearchLimit,
  AISearchLanguage,
  AISearchContext,
  AISearchMode,
} from '@vubon/shared-constants';

// ============================================================
// AI Search Request Types
// ============================================================

/**
 * Base search request
 */
export interface AISearchRequest {
  /** Search query string */
  query: string;
  /** Search type */
  type?: AISearchType;
  /** Search strategy */
  strategy?: AISearchStrategy;
  /** Search mode */
  mode?: AISearchMode;
  /** Search language */
  language?: AISearchLanguage;
  /** Search context */
  context?: AISearchContext;
  /** Search filters */
  filters?: AISearchFilter[];
  /** Search sort options */
  sort?: AISearchSort[];
  /** Maximum number of results */
  limit?: AISearchLimit;
  /** Offset for pagination */
  offset?: number;
  /** Request metadata */
  metadata?: Metadata;
}

/**
 * Semantic search request (strategy should be 'semantic')
 */
export interface AISemanticSearchRequest extends AISearchRequest {
  /** Strategy should be set to 'semantic' */
  strategy?: AISearchStrategy;
  /** Embedding model to use */
  embeddingModel?: string;
  /** Similarity threshold (0-1) */
  similarityThreshold?: number;
}

/**
 * Hybrid search request (strategy should be 'hybrid')
 */
export interface AIHybridSearchRequest extends AISearchRequest {
  /** Strategy should be set to 'hybrid' */
  strategy?: AISearchStrategy;
  /** Weights for different strategies */
  weights?: {
    semantic?: number;
    keyword?: number;
    vector?: number;
  };
  /** Minimum score threshold */
  minScore?: number;
}

/**
 * Vector search request (strategy should be 'vector')
 */
export interface AIVectorSearchRequest extends AISearchRequest {
  /** Strategy should be set to 'vector' */
  strategy?: AISearchStrategy;
  /** Vector values for similarity search */
  vector?: number[];
  /** Number of nearest neighbors to return */
  topK?: number;
  /** Distance metric to use */
  distanceMetric?: 'cosine' | 'euclidean' | 'dot_product';
}

/**
 * Batch search request
 */
export interface AIBatchSearchRequest {
  /** Array of search requests */
  requests: AISearchRequest[];
  /** Batch strategy */
  strategy?: 'parallel' | 'sequential' | 'weighted';
  /** Maximum concurrent requests */
  maxConcurrent?: number;
  /** Timeout in milliseconds */
  timeout?: number;
}

/**
 * Search request validation
 */
export interface AISearchRequestValidation {
  /** Whether the request is valid */
  isValid: boolean;
  /** Query string */
  query: string;
  /** Validation errors */
  errors?: string[];
  /** Validation warnings */
  warnings?: string[];
  /** Suggestions */
  suggestions?: string[];
}

/**
 * Search request options
 */
export interface AISearchRequestOptions {
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
 * Search context
 */
export interface AISearchContextType {
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
  // Search
  AISearchType,
  AISearchStrategy,
  AISearchFilter,
  AISearchSort,
  AISearchLimit,
  AISearchLanguage,
  AISearchContext,
  AISearchMode,
};
