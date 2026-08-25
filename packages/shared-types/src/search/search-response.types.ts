/**
 * Search Response Types
 * Type definitions for search responses based on shared-constants
 * @module SearchResponseTypes
 */

import { Metadata } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants search
// ============================================================
import {
  // Search Core
  SearchType,
  SearchMode,
  SearchLanguage,
  SearchRegion,
  // Search Analytics
  SearchAnalyticsType,
  SearchAnalyticsMetric,
  SearchAnalyticsDimension,
  SearchAnalyticsTimeframe,
  SearchAnalyticsAggregation,
  // Search Suggestion
  SearchSuggestionType,
  SearchSuggestionMode,
  SearchSuggestionWeight,
  // Search Facet
  SearchFacetType,
  SearchFacetMode,
  SearchFacetOrder,
  // Search Error
  SearchErrorType,
  SearchErrorCode,
  SearchErrorSeverity,
  // Autocomplete
  SearchAutocompleteType,
} from '@vubon/shared-constants';

// ============================================================
// Import SearchFacetBucket from search.types
// ============================================================
import type { SearchFacetBucket } from './search.types';

// ============================================================
// Search Response Types
// ============================================================

/**
 * Base search response
 */
export interface SearchResponse<T = unknown> {
  /** Search results */
  items: T[];
  /** Total number of results */
  total: number;
  /** Current page number */
  page: number;
  /** Items per page */
  pageSize: number;
  /** Total pages */
  totalPages: number;
  /** Search facets */
  facets?: SearchFacetResponse[];
  /** Search suggestions */
  suggestions?: SearchSuggestionResponse[];
  /** Search analytics */
  analytics?: SearchAnalyticsResponse;
  /** Search took time in milliseconds */
  took: number;
  /** Whether the search timed out */
  timedOut: boolean;
  /** Search metadata */
  metadata?: Metadata;
}

/**
 * Search facet response
 */
export interface SearchFacetResponse {
  /** Facet field */
  field: string;
  /** Facet type */
  type: SearchFacetType;
  /** Facet buckets */
  buckets: SearchFacetBucket[];
}

/**
 * Search suggestion response
 */
export interface SearchSuggestionResponse {
  /** Suggestion text */
  text: string;
  /** Suggestion weight */
  weight: number;
  /** Suggestion type */
  type: SearchSuggestionType;
  /** Suggestion mode */
  mode: SearchSuggestionMode;
}

/**
 * Search analytics response
 */
export interface SearchAnalyticsResponse {
  /** Search query */
  query: string;
  /** Total results */
  totalResults: number;
  /** Number of clicks */
  clicks: number;
  /** Number of impressions */
  impressions: number;
  /** Click-through rate */
  ctr: number;
  /** Average position */
  avgPosition: number;
  /** Timestamp */
  timestamp: Date;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Search error response
 */
export interface SearchErrorResponse {
  /** Error type */
  type: SearchErrorType;
  /** Error code */
  code: SearchErrorCode;
  /** Error severity */
  severity: SearchErrorSeverity;
  /** Error message */
  message: string;
  /** Error details */
  details?: Record<string, unknown>;
  /** Error timestamp */
  timestamp: Date;
  /** Request ID */
  requestId?: string;
}

/**
 * Search bulk response
 */
export interface SearchBulkResponse<T = unknown> {
  /** Array of search responses */
  responses: SearchResponse<T>[];
  /** Batch metadata */
  metadata: {
    totalRequests: number;
    successCount: number;
    failedCount: number;
    took: number;
  };
}

/**
 * Search autocomplete response
 */
export interface SearchAutocompleteResponse {
  /** Autocomplete suggestions */
  suggestions: SearchAutocompleteSuggestion[];
  /** Query prefix */
  prefix: string;
  /** Took time in milliseconds */
  took: number;
}

/**
 * Search autocomplete suggestion
 */
export interface SearchAutocompleteSuggestion {
  /** Suggestion text */
  text: string;
  /** Suggestion type */
  type: SearchAutocompleteType;
  /** Suggestion weight */
  weight: number;
  /** Highlighted text */
  highlighted?: string;
}

/**
 * Search validation response
 */
export interface SearchValidationResponse {
  /** Whether the query is valid */
  isValid: boolean;
  /** Validation errors */
  errors?: string[];
  /** Validation warnings */
  warnings?: string[];
  /** Validation suggestions */
  suggestions?: string[];
  /** Validated query */
  validatedQuery?: string;
}

/**
 * Search paginated response
 */
export interface SearchPaginatedResponse<T = unknown> extends SearchResponse<T> {
  /** Pagination metadata */
  pagination: {
    currentPage: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

/**
 * Search highlights response
 */
export interface SearchHighlightsResponse {
  /** Field name */
  field: string;
  /** Highlighted fragments */
  fragments: string[];
  /** Original text */
  original?: string;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Search Core
  SearchType,
  SearchMode,
  SearchLanguage,
  SearchRegion,
  // Search Analytics
  SearchAnalyticsType,
  SearchAnalyticsMetric,
  SearchAnalyticsDimension,
  SearchAnalyticsTimeframe,
  SearchAnalyticsAggregation,
  // Search Suggestion
  SearchSuggestionType,
  SearchSuggestionMode,
  SearchSuggestionWeight,
  // Search Facet
  SearchFacetType,
  SearchFacetMode,
  SearchFacetOrder,
  // Search Error
  SearchErrorType,
  SearchErrorCode,
  SearchErrorSeverity,
  // Autocomplete
  SearchAutocompleteType,
};
