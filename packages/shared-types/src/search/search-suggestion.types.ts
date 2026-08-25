/**
 * Search Suggestion Types
 * Type definitions for search suggestions based on shared-constants
 * @module SearchSuggestionTypes
 */

// ============================================================
// Import from shared-constants search suggestion
// ============================================================
import {
  // Suggestion Constants
  SEARCH_SUGGESTION,
  SearchSuggestionType,
  SearchSuggestionMode,
  SearchSuggestionWeight,
  SearchSuggestionDefault,
  SearchSuggestionLimit,
  searchSuggestionGetTypeLabel,
  searchSuggestionGetModeLabel,
  searchSuggestionGetWeightLabel,
  searchSuggestionIsQueryType,
  searchSuggestionIsCompletionType,
  searchSuggestionIsContextType,
  searchSuggestionGetDefaultLimit,
  searchSuggestionGetMaxLimit,
  searchSuggestionGetMinChars,
  searchSuggestionGetDefaultWeight,
  searchSuggestionIsPopularMode,
  searchSuggestionIsPersonalizedMode,
  searchSuggestionIsHybridMode,
} from '@vubon/shared-constants';

// ============================================================
// Search Suggestion Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Suggestion context
 */
export interface SearchSuggestionContext {
  /** Query context */
  query?: string;
  /** User context */
  userId?: string;
  /** Location context */
  location?: string;
  /** Device context */
  device?: string;
  /** Additional context */
  [key: string]: unknown;
}

/**
 * Suggestion configuration
 */
export interface SearchSuggestionConfiguration {
  /** Default suggestion size */
  defaultSize: number;
  /** Maximum suggestion size */
  maxSize: number;
  /** Minimum characters */
  minChars: number;
  /** Default weight */
  defaultWeight: number;
  /** Enable popular mode */
  enablePopularMode: boolean;
  /** Enable personalized mode */
  enablePersonalizedMode: boolean;
  /** Enable hybrid mode */
  enableHybridMode: boolean;
  /** Cache TTL in seconds */
  cacheTTL: number;
}

/**
 * Suggestion validation
 */
export interface SearchSuggestionValidation {
  /** Whether the suggestion is valid */
  isValid: boolean;
  /** Suggestion text */
  text: string;
  /** Validation errors */
  errors?: string[];
  /** Validation warnings */
  warnings?: string[];
  /** Suggestions */
  suggestions?: string[];
}

/**
 * Suggestion statistics
 */
export interface SearchSuggestionStatistics {
  /** Total suggestions */
  totalSuggestions: number;
  /** Suggestions by type */
  byType: Record<SearchSuggestionType, number>;
  /** Suggestions by mode */
  byMode: Record<SearchSuggestionMode, number>;
  /** Average weight */
  avgWeight: number;
  /** Top suggestions */
  topSuggestions: { text: string; count: number }[];
  /** Performance */
  performance: {
    avgTimeMs: number;
    minTimeMs: number;
    maxTimeMs: number;
  };
}

// ============================================================
// Re-export Everything (শুধুমাত্র নতুন টাইপ)
// ============================================================

export {
  // Suggestion Constants
  SEARCH_SUGGESTION,
  SearchSuggestionType,
  SearchSuggestionMode,
  SearchSuggestionWeight,
  SearchSuggestionDefault,
  SearchSuggestionLimit,
  searchSuggestionGetTypeLabel,
  searchSuggestionGetModeLabel,
  searchSuggestionGetWeightLabel,
  searchSuggestionIsQueryType,
  searchSuggestionIsCompletionType,
  searchSuggestionIsContextType,
  searchSuggestionGetDefaultLimit,
  searchSuggestionGetMaxLimit,
  searchSuggestionGetMinChars,
  searchSuggestionGetDefaultWeight,
  searchSuggestionIsPopularMode,
  searchSuggestionIsPersonalizedMode,
  searchSuggestionIsHybridMode,
};
