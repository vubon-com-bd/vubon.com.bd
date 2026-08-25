/**
 * Search Query Types
 * Type definitions for search queries based on shared-constants
 * @module SearchQueryTypes
 */

import { Metadata } from '../common/core-primitives.types';

// ============================================================
// Import SearchFilter and SearchSort from search.types
// ============================================================
import type { SearchFilter, SearchSort } from './search.types';

// ============================================================
// Import from shared-constants search
// ============================================================
import {
  // Search Core
  SearchType,
  SearchMode,
  SearchLanguage,
  SearchRegion,
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
} from '@vubon/shared-constants';

// ============================================================
// Search Query Types
// ============================================================

/**
 * Base search query
 */
export interface SearchQuery {
  /** Main search query string */
  query: string;
  /** Search type */
  type?: SearchType;
  /** Search mode */
  mode?: SearchMode;
  /** Search language */
  language?: SearchLanguage;
  /** Search region */
  region?: SearchRegion;
  /** Search match configuration */
  match?: SearchMatch;
  /** Search boost configuration */
  boost?: SearchBoost[];
  /** Search filters (using SearchFilter from search.types) */
  filters?: SearchFilter[];
  /** Search sort (using SearchSort from search.types) */
  sort?: SearchSort[];
  /** Query metadata */
  metadata?: Metadata;
}

/**
 * Search match configuration
 */
export interface SearchMatch {
  /** Match type */
  type: SearchMatchType;
  /** Match operator */
  operator?: SearchMatchOperator;
  /** Match mode */
  mode?: SearchMatchMode;
  /** Fuzziness level */
  fuzziness?: SearchMatchFuzziness;
  /** Minimum should match */
  minimumShouldMatch?: number;
  /** Fields to match */
  fields?: string[];
  /** Analyzer to use */
  analyzer?: string;
}

/**
 * Search boost configuration
 */
export interface SearchBoost {
  /** Boost type */
  type: SearchBoostType;
  /** Boost function */
  function: SearchBoostFunction;
  /** Boost mode */
  mode?: SearchBoostMode;
  /** Boost factor */
  factor?: number;
  /** Field to boost */
  field?: string;
  /** Term to boost */
  term?: string;
}

/**
 * Search query validation
 */
export interface SearchQueryValidation {
  /** Whether the query is valid */
  isValid: boolean;
  /** Query string */
  query: string;
  /** Validation errors */
  errors?: string[];
  /** Validation warnings */
  warnings?: string[];
  /** Validation suggestions */
  suggestions?: string[];
  /** Normalized query */
  normalizedQuery?: string;
}

/**
 * Search query history
 */
export interface SearchQueryHistory {
  /** Query string */
  query: string;
  /** Search type */
  type: SearchType;
  /** Search mode */
  mode: SearchMode;
  /** Timestamp of the query */
  timestamp: Date;
  /** Number of results */
  resultCount?: number;
  /** Whether the query was successful */
  isSuccessful?: boolean;
}

/**
 * Search query suggestion
 */
export interface SearchQuerySuggestion {
  /** Suggested query text */
  text: string;
  /** Suggestion weight/score */
  weight: number;
  /** Suggestion type */
  type: SearchSuggestionType;
  /** Suggestion mode */
  mode: SearchSuggestionMode;
  /** Highlighted text */
  highlighted?: string;
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
};
