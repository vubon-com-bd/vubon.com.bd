/**
 * Search Sort Types
 * Type definitions for search sorting based on shared-constants
 * @module SearchSortTypes
 */

import { Metadata } from '../common/core-primitives.types';

// ============================================================
// Import SearchSort from search.types
// ============================================================
import type { SearchSort } from './search.types';

// ============================================================
// Import from shared-constants search sort
// ============================================================
import {
  // Search Sort Constants
  SEARCH_SORT,
  SearchSortField,
  SearchSortOrder,
  SearchSortType,
  SearchSortMode,
  SearchSortDefault,
  SearchSortLimit,
  searchSortGetFieldLabel,
  searchSortGetOrderLabel,
  searchSortGetTypeLabel,
  searchSortGetModeLabel,
  searchSortGetDefaultField,
  searchSortGetDefaultOrder,
  searchSortIsPriceField,
  searchSortIsRatingField,
  searchSortIsPopularityField,
  searchSortIsGeoField,
  searchSortIsAscending,
  searchSortIsDescending,
  searchSortGetMaxSortFields,
  // Sort Consolidated Constants
  SEARCH_SORT_CONSOLIDATED,
  SearchSortConsolidatedField,
  SearchSortConsolidatedOrder,
  SearchSortConsolidatedType,
  SearchSortConsolidatedDefault,
  SearchSortConsolidatedLimit,
  searchSortConsolidatedGetFieldLabel,
  searchSortConsolidatedGetOrderLabel,
  searchSortConsolidatedGetTypeLabel,
  searchSortConsolidatedIsPriceField,
  searchSortConsolidatedIsRatingField,
  searchSortConsolidatedIsPopularityField,
  searchSortConsolidatedIsGeoField,
  searchSortConsolidatedGetDefaultField,
  searchSortConsolidatedGetDefaultOrder,
  searchSortConsolidatedIsAscending,
  searchSortConsolidatedIsDescending,
  searchSortConsolidatedGetMaxSortFields,
} from '@vubon/shared-constants';

// ============================================================
// Search Sort Types
// ============================================================

/**
 * Consolidated search sort
 */
export interface SearchConsolidatedSort {
  /** Sort field */
  field: SearchSortConsolidatedField;
  /** Sort order */
  order: SearchSortConsolidatedOrder;
  /** Sort type */
  type?: SearchSortConsolidatedType;
  /** Sort metadata */
  metadata?: Metadata;
}

/**
 * Multi-field sort
 */
export interface SearchMultiSort {
  /** Array of sort fields */
  sorts: SearchSort[];
  /** Sort strategy */
  strategy?: 'priority' | 'weighted' | 'combined';
}

/**
 * Search sort validation
 */
export interface SearchSortValidation {
  /** Whether the sort is valid */
  isValid: boolean;
  /** Sort field */
  field: string;
  /** Sort order */
  order: SearchSortOrder;
  /** Validation errors */
  errors?: string[];
  /** Validation warnings */
  warnings?: string[];
  /** Suggestions */
  suggestions?: string[];
}

/**
 * Search sort statistics
 */
export interface SearchSortStatistics {
  /** Total sorts */
  totalSorts: number;
  /** Sorts by field */
  byField: Record<SearchSortField, number>;
  /** Sorts by order */
  byOrder: Record<SearchSortOrder, number>;
  /** Sorts by type */
  byType: Record<SearchSortType, number>;
  /** Sorts by mode */
  byMode: Record<SearchSortMode, number>;
  /** Most used fields */
  topFields: { field: SearchSortField; count: number }[];
  /** Performance */
  performance: {
    avgTimeMs: number;
    minTimeMs: number;
    maxTimeMs: number;
  };
}

/**
 * Search sort configuration
 */
export interface SearchSortConfiguration {
  /** Maximum number of sort fields */
  maxSortFields: number;
  /** Default sort field */
  defaultField: SearchSortField;
  /** Default sort order */
  defaultOrder: SearchSortOrder;
  /** Allowed sort fields */
  allowedFields: SearchSortField[];
  /** Allowed sort orders */
  allowedOrders: SearchSortOrder[];
  /** Allow geo sorting */
  allowGeoSort: boolean;
  /** Allow script sorting */
  allowScriptSort: boolean;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Search Sort Constants
  SEARCH_SORT,
  SearchSortField,
  SearchSortOrder,
  SearchSortType,
  SearchSortMode,
  SearchSortDefault,
  SearchSortLimit,
  searchSortGetFieldLabel,
  searchSortGetOrderLabel,
  searchSortGetTypeLabel,
  searchSortGetModeLabel,
  searchSortGetDefaultField,
  searchSortGetDefaultOrder,
  searchSortIsPriceField,
  searchSortIsRatingField,
  searchSortIsPopularityField,
  searchSortIsGeoField,
  searchSortIsAscending,
  searchSortIsDescending,
  searchSortGetMaxSortFields,
  // Sort Consolidated Constants
  SEARCH_SORT_CONSOLIDATED,
  SearchSortConsolidatedField,
  SearchSortConsolidatedOrder,
  SearchSortConsolidatedType,
  SearchSortConsolidatedDefault,
  SearchSortConsolidatedLimit,
  searchSortConsolidatedGetFieldLabel,
  searchSortConsolidatedGetOrderLabel,
  searchSortConsolidatedGetTypeLabel,
  searchSortConsolidatedIsPriceField,
  searchSortConsolidatedIsRatingField,
  searchSortConsolidatedIsPopularityField,
  searchSortConsolidatedIsGeoField,
  searchSortConsolidatedGetDefaultField,
  searchSortConsolidatedGetDefaultOrder,
  searchSortConsolidatedIsAscending,
  searchSortConsolidatedIsDescending,
  searchSortConsolidatedGetMaxSortFields,
};
