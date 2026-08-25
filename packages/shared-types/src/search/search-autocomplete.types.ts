/**
 * Search Autocomplete Types
 * Type definitions for search autocomplete based on shared-constants
 * @module SearchAutocompleteTypes
 */

// ============================================================
// Import from shared-constants search autocomplete
// ============================================================
import {
  // Autocomplete Constants
  SEARCH_AUTOCOMPLETE,
  SearchAutocompleteType,
  SearchAutocompleteMode,
  SearchAutocompleteSource,
  SearchAutocompleteDefault,
  SearchAutocompleteLimit,
  searchAutocompleteGetTypeLabel,
  searchAutocompleteGetModeLabel,
  searchAutocompleteGetSourceLabel,
  searchAutocompleteIsQueryType,
  searchAutocompleteIsProductType,
  searchAutocompleteIsContextualType,
  searchAutocompleteGetDefaultLimit,
  searchAutocompleteGetMaxLimit,
  searchAutocompleteGetMinChars,
  searchAutocompleteGetDebounceMs,
  searchAutocompleteShouldHighlight,
  searchAutocompleteIsPrefixMode,
  searchAutocompleteIsFuzzyMode,
  searchAutocompleteIsSmartMode,
} from '@vubon/shared-constants';

// ============================================================
// Search Autocomplete Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Autocomplete configuration
 */
export interface SearchAutocompleteConfiguration {
  /** Default size */
  defaultSize: number;
  /** Maximum size */
  maxSize: number;
  /** Minimum characters */
  minChars: number;
  /** Debounce milliseconds */
  debounceMs: number;
  /** Enable highlight */
  enableHighlight: boolean;
  /** Enable prefix mode */
  enablePrefixMode: boolean;
  /** Enable fuzzy mode */
  enableFuzzyMode: boolean;
  /** Enable smart mode */
  enableSmartMode: boolean;
  /** Cache TTL in seconds */
  cacheTTL: number;
}

/**
 * Autocomplete validation
 */
export interface SearchAutocompleteValidation {
  /** Whether the autocomplete is valid */
  isValid: boolean;
  /** Prefix text */
  prefix: string;
  /** Validation errors */
  errors?: string[];
  /** Validation warnings */
  warnings?: string[];
  /** Suggestions */
  suggestions?: string[];
}

/**
 * Autocomplete statistics
 */
export interface SearchAutocompleteStatistics {
  /** Total autocompletes */
  totalAutocompletes: number;
  /** Autocompletes by type */
  byType: Record<SearchAutocompleteType, number>;
  /** Autocompletes by mode */
  byMode: Record<SearchAutocompleteMode, number>;
  /** Autocompletes by source */
  bySource: Record<SearchAutocompleteSource, number>;
  /** Average weight */
  avgWeight: number;
  /** Top autocompletes */
  topAutocompletes: { text: string; count: number }[];
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
  // Autocomplete Constants
  SEARCH_AUTOCOMPLETE,
  SearchAutocompleteType,
  SearchAutocompleteMode,
  SearchAutocompleteSource,
  SearchAutocompleteDefault,
  SearchAutocompleteLimit,
  // Functions
  searchAutocompleteGetTypeLabel,
  searchAutocompleteGetModeLabel,
  searchAutocompleteGetSourceLabel,
  searchAutocompleteIsQueryType,
  searchAutocompleteIsProductType,
  searchAutocompleteIsContextualType,
  searchAutocompleteGetDefaultLimit,
  searchAutocompleteGetMaxLimit,
  searchAutocompleteGetMinChars,
  searchAutocompleteGetDebounceMs,
  searchAutocompleteShouldHighlight,
  searchAutocompleteIsPrefixMode,
  searchAutocompleteIsFuzzyMode,
  searchAutocompleteIsSmartMode,
};
