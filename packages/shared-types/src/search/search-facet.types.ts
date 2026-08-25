/**
 * Search Facet Types
 * Type definitions for search facets based on shared-constants
 * @module SearchFacetTypes
 */

// ============================================================
// Import SearchFacet from search.types
// ============================================================
import type { SearchFacet } from './search.types';

// ============================================================
// Import from shared-constants search facet
// ============================================================
import {
  // Facet Constants
  SEARCH_FACET,
  SearchFacetType,
  SearchFacetMode,
  SearchFacetOrder,
  SearchFacetDefault,
  SearchFacetLimit,
  searchFacetGetTypeLabel,
  searchFacetGetModeLabel,
  searchFacetGetOrderLabel,
  searchFacetIsTermsType,
  searchFacetIsRangeType,
  searchFacetIsDateType,
  searchFacetIsHistogramType,
  searchFacetIsNestedType,
  searchFacetIsGeoType,
  searchFacetGetDefaultSize,
  searchFacetGetMaxSize,
  searchFacetGetMinDocCount,
  searchFacetGetDefaultOrder,
  searchFacetGetMaxDepth,
} from '@vubon/shared-constants';

// ============================================================
// Search Facet Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Terms facet
 */
export interface SearchTermsFacet extends SearchFacet {
  type: 'terms' | SearchFacetType;
  /** Order by count or term */
  orderBy?: 'count' | 'term';
  /** Include terms */
  include?: string[];
  /** Exclude terms */
  exclude?: string[];
}

/**
 * Range facet
 */
export interface SearchRangeFacet extends SearchFacet {
  type: 'range' | SearchFacetType;
  /** Range values */
  ranges: {
    from?: number;
    to?: number;
    key?: string;
  }[];
}

/**
 * Date range facet
 */
export interface SearchDateRangeFacet extends SearchFacet {
  type: 'date' | SearchFacetType;
  /** Date ranges */
  ranges: {
    from?: string | Date;
    to?: string | Date;
    key?: string;
  }[];
  /** Format */
  format?: string;
}

/**
 * Histogram facet
 */
export interface SearchHistogramFacet extends SearchFacet {
  type: 'histogram' | SearchFacetType;
  /** Interval */
  interval: number;
  /** Extended bounds */
  extendedBounds?: {
    min: number;
    max: number;
  };
}

/**
 * Geo facet
 */
export interface SearchGeoFacet extends SearchFacet {
  type: 'geo' | SearchFacetType;
  /** Bounding box */
  boundingBox?: {
    topLeft: { lat: number; lon: number };
    bottomRight: { lat: number; lon: number };
  };
  /** Distance */
  distance?: string;
  /** Location */
  location?: { lat: number; lon: number };
}

/**
 * Nested facet
 */
export interface SearchNestedFacet extends SearchFacet {
  type: 'nested' | SearchFacetType;
  /** Nested path */
  nestedPath: string;
}

/**
 * Facet validation
 */
export interface SearchFacetValidation {
  /** Whether the facet is valid */
  isValid: boolean;
  /** Facet type */
  type: SearchFacetType;
  /** Facet field */
  field: string;
  /** Validation errors */
  errors?: string[];
  /** Validation warnings */
  warnings?: string[];
  /** Suggestions */
  suggestions?: string[];
}

/**
 * Facet statistics
 */
export interface SearchFacetStatistics {
  /** Total facets */
  totalFacets: number;
  /** Facets by type */
  byType: Record<SearchFacetType, number>;
  /** Facets by mode */
  byMode: Record<SearchFacetMode, number>;
  /** Facets by order */
  byOrder: Record<SearchFacetOrder, number>;
  /** Most used fields */
  topFields: { field: string; count: number }[];
  /** Performance */
  performance: {
    avgTimeMs: number;
    minTimeMs: number;
    maxTimeMs: number;
  };
}

/**
 * Facet configuration
 */
export interface SearchFacetConfiguration {
  /** Default facet size */
  defaultSize: number;
  /** Maximum facet size */
  maxSize: number;
  /** Minimum document count */
  minDocCount: number;
  /** Default order */
  defaultOrder: SearchFacetOrder;
  /** Maximum depth for nested facets */
  maxDepth: number;
  /** Allowed facet types */
  allowedTypes: SearchFacetType[];
  /** Allow geo facets */
  allowGeo: boolean;
  /** Allow nested facets */
  allowNested: boolean;
}

// ============================================================
// Re-export Everything (শুধুমাত্র নতুন টাইপ)
// ============================================================

export {
  // Facet Constants
  SEARCH_FACET,
  SearchFacetType,
  SearchFacetMode,
  SearchFacetOrder,
  SearchFacetDefault,
  SearchFacetLimit,
  searchFacetGetTypeLabel,
  searchFacetGetModeLabel,
  searchFacetGetOrderLabel,
  searchFacetIsTermsType,
  searchFacetIsRangeType,
  searchFacetIsDateType,
  searchFacetIsHistogramType,
  searchFacetIsNestedType,
  searchFacetIsGeoType,
  searchFacetGetDefaultSize,
  searchFacetGetMaxSize,
  searchFacetGetMinDocCount,
  searchFacetGetDefaultOrder,
  searchFacetGetMaxDepth,
};
