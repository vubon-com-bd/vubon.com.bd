/**
 * AI Search Response Types
 * Type definitions for AI search responses based on shared-constants
 * @module AISearchResponseTypes
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
// AI Search Response Types
// ============================================================

/**
 * Search result item
 */
export interface AISearchResultItem<T = unknown> {
  /** Item ID */
  id: string;
  /** Item data */
  data: T;
  /** Relevance score (0-1) */
  score: number;
  /** Position in results */
  position: number;
  /** Search explanation */
  explanation?: string;
  /** Highlighted fields */
  highlights?: Record<string, string[]>;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Base search response (strategy প্রপার্টি সরানো হয়েছে)
 */
export interface AISearchResponse<T = unknown> {
  /** Search results */
  items: AISearchResultItem<T>[];
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
  /** Query used */
  query: string;
  /** Response timestamp */
  timestamp: Date;
  /** Processing time in milliseconds */
  processingTimeMs: number;
  /** Mode used */
  mode: AISearchMode;
  /** Type used */
  type: AISearchType;
  /** Language used */
  language: AISearchLanguage;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Semantic search response
 */
export interface AISemanticSearchResponse<T = unknown> extends AISearchResponse<T> {
  /** Strategy used */
  strategy: 'semantic';
  /** Embedding model used */
  embeddingModel: string;
  /** Similarity threshold used */
  similarityThreshold: number;
  /** Average similarity score */
  avgSimilarity: number;
}

/**
 * Hybrid search response
 */
export interface AIHybridSearchResponse<T = unknown> extends AISearchResponse<T> {
  /** Strategy used */
  strategy: 'hybrid';
  /** Weights used */
  weights: {
    semantic: number;
    keyword: number;
    vector: number;
  };
  /** Contributions by strategy */
  contributions: Record<string, number>;
  /** Minimum score threshold */
  minScore: number;
}

/**
 * Vector search response
 */
export interface AIVectorSearchResponse<T = unknown> extends AISearchResponse<T> {
  /** Strategy used */
  strategy: 'vector';
  /** Number of nearest neighbors returned */
  topK: number;
  /** Distance metric used */
  distanceMetric: 'cosine' | 'euclidean' | 'dot_product';
  /** Average distance */
  avgDistance: number;
}

/**
 * Batch search response
 */
export interface AIBatchSearchResponse<T = unknown> {
  /** Responses */
  responses: AISearchResponse<T>[];
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
 * Search error response
 */
export interface AISearchErrorResponse {
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
 * Search response validation
 */
export interface AISearchResponseValidation {
  /** Whether the response is valid */
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
 * Search response metadata
 */
export interface AISearchResponseMetadata {
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
 * Search facet response
 */
export interface AISearchFacetResponse {
  /** Facet field */
  field: string;
  /** Facet buckets */
  buckets: AISearchFacetBucket[];
}

/**
 * Search facet bucket
 */
export interface AISearchFacetBucket {
  /** Bucket key */
  key: string;
  /** Document count */
  count: number;
  /** From value (for range facets) */
  from?: number;
  /** To value (for range facets) */
  to?: number;
}

/**
 * Search suggestion response
 */
export interface AISearchSuggestionResponse {
  /** Suggestions */
  suggestions: AISearchSuggestion[];
  /** Query prefix */
  prefix: string;
  /** Total suggestions */
  total: number;
}

/**
 * Search suggestion
 */
export interface AISearchSuggestion {
  /** Suggestion text */
  text: string;
  /** Suggestion weight */
  weight: number;
  /** Suggestion type */
  type: 'query' | 'product' | 'category' | 'content';
  /** Highlighted text */
  highlighted?: string;
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
