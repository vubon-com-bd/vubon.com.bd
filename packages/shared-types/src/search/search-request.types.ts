/**
 * Search Request Types
 * Type definitions for search requests based on shared-constants
 * @module SearchRequestTypes
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
  // Search Sort
  SearchSortField,
  SearchSortOrder,
  SearchSortType,
  SearchSortMode,
  // Search Filter
  SearchFilterType,
  SearchFilterOperator,
  SearchFilterLogic,
  SearchFilterMode,
  // Search Match
  SearchMatchType,
  SearchMatchOperator,
  SearchMatchMode,
  SearchMatchFuzziness,
  // Search Boost
  SearchBoostType,
  SearchBoostFunction,
  SearchBoostMode,
  // Search Suggestion
  SearchSuggestionType,
  SearchSuggestionMode,
  // Search Facet
  SearchFacetType,
  SearchFacetMode,
  SearchFacetOrder,
  // Autocomplete
  SearchAutocompleteType,
  SearchAutocompleteMode,
  SearchAutocompleteSource,
  // Search Analytics
  SearchAnalyticsType,
  SearchAnalyticsMetric,
  SearchAnalyticsDimension,
  SearchAnalyticsTimeframe,
  SearchAnalyticsAggregation,
} from '@vubon/shared-constants';

// ============================================================
// Search Request Types
// ============================================================

/**
 * Base search request
 */
export interface SearchRequest {
  /** Search query string */
  query: string;
  /** Search type */
  type?: SearchType;
  /** Search mode */
  mode?: SearchMode;
  /** Search language */
  language?: SearchLanguage;
  /** Search region */
  region?: SearchRegion;
  /** Page number (1-indexed) */
  page?: number;
  /** Items per page */
  pageSize?: number;
  /** Search timeout in milliseconds */
  timeout?: number;
  /** Search filters */
  filters?: SearchFilterRequest[];
  /** Search sort options */
  sort?: SearchSortRequest[];
  /** Search match options */
  match?: SearchMatchRequest;
  /** Search boost options */
  boost?: SearchBoostRequest[];
  /** Include facets */
  facets?: SearchFacetRequest[];
  /** Include suggestions */
  suggestions?: SearchSuggestionRequest;
  /** Include analytics */
  analytics?: boolean;
  /** Request metadata */
  metadata?: Metadata;
}

/**
 * Search filter request
 */
export interface SearchFilterRequest {
  /** Filter type */
  type: SearchFilterType;
  /** Field name */
  field: string;
  /** Filter operator */
  operator: SearchFilterOperator;
  /** Filter value */
  value: unknown;
  /** Filter logic */
  logic?: SearchFilterLogic;
  /** Filter mode */
  mode?: SearchFilterMode;
}

/**
 * Search sort request
 */
export interface SearchSortRequest {
  /** Sort field */
  field: SearchSortField;
  /** Sort order */
  order: SearchSortOrder;
  /** Sort type */
  type?: SearchSortType;
  /** Sort mode */
  mode?: SearchSortMode;
}

/**
 * Search match request
 */
export interface SearchMatchRequest {
  /** Match type */
  type: SearchMatchType;
  /** Match operator */
  operator?: SearchMatchOperator;
  /** Match mode */
  mode?: SearchMatchMode;
  /** Match fuzziness */
  fuzziness?: SearchMatchFuzziness;
  /** Minimum should match */
  minimumShouldMatch?: number;
}

/**
 * Search boost request
 */
export interface SearchBoostRequest {
  /** Boost type */
  type: SearchBoostType;
  /** Boost function */
  function: SearchBoostFunction;
  /** Boost mode */
  mode?: SearchBoostMode;
  /** Boost factor */
  factor?: number;
  /** Field name (for field boost) */
  field?: string;
  /** Term (for term boost) */
  term?: string;
}

/**
 * Search facet request
 */
export interface SearchFacetRequest {
  /** Facet type */
  type: SearchFacetType;
  /** Facet mode */
  mode?: SearchFacetMode;
  /** Facet order */
  order?: SearchFacetOrder;
  /** Field name */
  field: string;
  /** Facet size */
  size?: number;
  /** Minimum document count */
  minDocCount?: number;
  /** Nested path */
  nestedPath?: string;
}

/**
 * Search suggestion request
 */
export interface SearchSuggestionRequest {
  /** Suggestion type */
  type: SearchSuggestionType;
  /** Suggestion mode */
  mode: SearchSuggestionMode;
  /** Suggestion size */
  size?: number;
  /** Context (for contextual suggestions) */
  context?: Record<string, unknown>;
}

/**
 * Search bulk request
 */
export interface SearchBulkRequest {
  /** Array of search requests */
  requests: SearchRequest[];
  /** Batch size */
  batchSize?: number;
}

/**
 * Search autocomplete request
 */
export interface SearchAutocompleteRequest {
  /** Query prefix */
  prefix: string;
  /** Autocomplete type */
  type?: SearchAutocompleteType;
  /** Autocomplete mode */
  mode?: SearchAutocompleteMode;
  /** Source type */
  source?: SearchAutocompleteSource;
  /** Size */
  size?: number;
  /** Minimum characters */
  minChars?: number;
  /** Highlight matches */
  highlight?: boolean;
}

/**
 * Search analytics request
 */
export interface SearchAnalyticsRequest {
  /** Analytics type */
  type: SearchAnalyticsType;
  /** Analytics metric */
  metric: SearchAnalyticsMetric;
  /** Analytics dimension */
  dimension?: SearchAnalyticsDimension;
  /** Timeframe */
  timeframe: SearchAnalyticsTimeframe;
  /** Aggregation */
  aggregation?: SearchAnalyticsAggregation;
}

/**
 * Search validation request
 */
export interface SearchValidationRequest {
  /** Query to validate */
  query: string;
  /** Search type */
  type?: SearchType;
  /** Search mode */
  mode?: SearchMode;
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
  // Search Sort
  SearchSortField,
  SearchSortOrder,
  SearchSortType,
  SearchSortMode,
  // Search Filter
  SearchFilterType,
  SearchFilterOperator,
  SearchFilterLogic,
  SearchFilterMode,
  // Search Match
  SearchMatchType,
  SearchMatchOperator,
  SearchMatchMode,
  SearchMatchFuzziness,
  // Search Boost
  SearchBoostType,
  SearchBoostFunction,
  SearchBoostMode,
  // Search Suggestion
  SearchSuggestionType,
  SearchSuggestionMode,
  // Search Facet
  SearchFacetType,
  SearchFacetMode,
  SearchFacetOrder,
  // Autocomplete
  SearchAutocompleteType,
  SearchAutocompleteMode,
  SearchAutocompleteSource,
  // Search Analytics
  SearchAnalyticsType,
  SearchAnalyticsMetric,
  SearchAnalyticsDimension,
  SearchAnalyticsTimeframe,
  SearchAnalyticsAggregation,
};
