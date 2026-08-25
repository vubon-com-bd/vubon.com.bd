/**
 * Search Filter Types
 * Type definitions for search filters based on shared-constants
 * @module SearchFilterTypes
 */

import { Metadata } from '../common/core-primitives.types';

// ============================================================
// Import SearchFilter from search.types
// ============================================================
import type { SearchFilter } from './search.types';

// ============================================================
// Import from shared-constants search
// ============================================================
import {
  // Search Filter
  SEARCH_FILTER,
  SearchFilterType,
  SearchFilterOperator,
  SearchFilterLogic,
  SearchFilterMode,
  SearchFilterDefault,
  SearchFilterLimit,
  searchFilterGetTypeLabel,
  searchFilterGetOperatorLabel,
  searchFilterGetLogicLabel,
  searchFilterGetModeLabel,
  searchFilterIsTermType,
  searchFilterIsRangeType,
  searchFilterIsBoolType,
  searchFilterIsGeoType,
  searchFilterIsNestedType,
  searchFilterGetDefaultLogic,
  searchFilterGetMaxFilters,
  // Filter Consolidated
  SEARCH_FILTER_CONSOLIDATED,
  SearchFilterConsolidatedType,
  SearchFilterConsolidatedOperator,
  SearchFilterConsolidatedLogic,
  SearchFilterConsolidatedDefault,
  SearchFilterConsolidatedLimit,
  searchFilterConsolidatedGetTypeLabel,
  searchFilterConsolidatedGetOperatorLabel,
  searchFilterConsolidatedGetLogicLabel,
  searchFilterConsolidatedIsTermType,
  searchFilterConsolidatedIsRangeType,
  searchFilterConsolidatedIsGeoType,
  searchFilterConsolidatedIsNestedType,
  searchFilterConsolidatedGetMaxFilters,
  searchFilterConsolidatedGetDefaultLogic,
  searchFilterConsolidatedIsCaseSensitive,
  searchFilterConsolidatedGetMaxNestedDepth,
  // Search Operator
  SearchComparisonOperator,
  SearchStringOperator,
  SearchNumericOperator,
  SearchGeoOperator,
  SearchDateOperator,
  SearchArrayOperator,
  SearchLogicalOperator,
} from '@vubon/shared-constants';

// ============================================================
// Search Filter Types
// ============================================================

/**
 * Term filter
 */
export interface SearchTermFilter {
  /** Filter type */
  type: SearchFilterType | 'term';
  /** Field name */
  field: string;
  /** Filter operator */
  operator: SearchFilterOperator;
  /** Filter value */
  value: string | number | boolean;
  /** Filter logic */
  logic?: SearchFilterLogic;
  /** Filter mode */
  mode?: SearchFilterMode;
  /** Nested path (for nested filters) */
  nestedPath?: string;
  /** Filter metadata */
  metadata?: Metadata;
}

/**
 * Range filter
 */
export interface SearchRangeFilter {
  /** Filter type */
  type: SearchFilterType | 'range';
  /** Field name */
  field: string;
  /** Filter operator */
  operator: SearchFilterOperator;
  /** Filter value */
  value: {
    gte?: number | string | Date;
    gt?: number | string | Date;
    lte?: number | string | Date;
    lt?: number | string | Date;
  };
  /** Filter logic */
  logic?: SearchFilterLogic;
  /** Filter mode */
  mode?: SearchFilterMode;
  /** Nested path (for nested filters) */
  nestedPath?: string;
  /** Filter metadata */
  metadata?: Metadata;
}

/**
 * Boolean filter
 */
export interface SearchBoolFilter {
  /** Filter type */
  type: SearchFilterType | 'bool';
  /** Field name */
  field: string;
  /** Filter operator */
  operator: SearchFilterOperator;
  /** Filter value */
  value: {
    must?: SearchFilter[];
    should?: SearchFilter[];
    mustNot?: SearchFilter[];
    filter?: SearchFilter[];
  };
  /** Filter logic */
  logic?: SearchFilterLogic;
  /** Filter mode */
  mode?: SearchFilterMode;
  /** Nested path (for nested filters) */
  nestedPath?: string;
  /** Filter metadata */
  metadata?: Metadata;
}

/**
 * Geo filter
 */
export interface SearchGeoFilter {
  /** Filter type */
  type: SearchFilterType | 'geo';
  /** Field name */
  field: string;
  /** Filter operator */
  operator: SearchFilterOperator;
  /** Filter value */
  value: {
    distance?: string;
    location?: {
      lat: number;
      lon: number;
    };
    boundingBox?: {
      topLeft: { lat: number; lon: number };
      bottomRight: { lat: number; lon: number };
    };
  };
  /** Filter logic */
  logic?: SearchFilterLogic;
  /** Filter mode */
  mode?: SearchFilterMode;
  /** Nested path (for nested filters) */
  nestedPath?: string;
  /** Filter metadata */
  metadata?: Metadata;
}

/**
 * Nested filter
 */
export interface SearchNestedFilter {
  /** Filter type */
  type: SearchFilterType | 'nested';
  /** Field name */
  field: string;
  /** Filter operator */
  operator: SearchFilterOperator;
  /** Filter value */
  value: {
    path: string;
    query: SearchFilter;
    scoreMode?: 'avg' | 'max' | 'min' | 'none' | 'sum';
  };
  /** Filter logic */
  logic?: SearchFilterLogic;
  /** Filter mode */
  mode?: SearchFilterMode;
  /** Nested path (for nested filters) */
  nestedPath?: string;
  /** Filter metadata */
  metadata?: Metadata;
}

/**
 * Consolidated search filter
 */
export interface SearchConsolidatedFilter {
  /** Filter type */
  type: SearchFilterConsolidatedType;
  /** Field name */
  field: string;
  /** Filter operator */
  operator: SearchFilterConsolidatedOperator;
  /** Filter value */
  value: unknown;
  /** Filter logic */
  logic?: SearchFilterConsolidatedLogic;
  /** Nested path */
  nestedPath?: string;
  /** Case sensitive */
  caseSensitive?: boolean;
  /** Filter metadata */
  metadata?: Metadata;
}

/**
 * Filter group
 */
export interface SearchFilterGroup {
  /** Group logic */
  logic: SearchFilterLogic | SearchFilterConsolidatedLogic;
  /** Filters in the group */
  filters: SearchFilter[];
}

/**
 * Filter validation
 */
export interface SearchFilterValidation {
  /** Whether the filter is valid */
  isValid: boolean;
  /** Filter type */
  type: SearchFilterType;
  /** Field name */
  field: string;
  /** Validation errors */
  errors?: string[];
  /** Validation warnings */
  warnings?: string[];
  /** Suggestions */
  suggestions?: string[];
}

/**
 * Filter statistics
 */
export interface SearchFilterStatistics {
  /** Total filters */
  totalFilters: number;
  /** Filters by type */
  byType: Record<SearchFilterType, number>;
  /** Filters by operator */
  byOperator: Record<SearchFilterOperator, number>;
  /** Filters by logic */
  byLogic: Record<SearchFilterLogic, number>;
  /** Most used fields */
  topFields: { field: string; count: number }[];
  /** Filter performance */
  performance: {
    avgTimeMs: number;
    minTimeMs: number;
    maxTimeMs: number;
  };
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Search Filter
  SEARCH_FILTER,
  SearchFilterType,
  SearchFilterOperator,
  SearchFilterLogic,
  SearchFilterMode,
  SearchFilterDefault,
  SearchFilterLimit,
  searchFilterGetTypeLabel,
  searchFilterGetOperatorLabel,
  searchFilterGetLogicLabel,
  searchFilterGetModeLabel,
  searchFilterIsTermType,
  searchFilterIsRangeType,
  searchFilterIsBoolType,
  searchFilterIsGeoType,
  searchFilterIsNestedType,
  searchFilterGetDefaultLogic,
  searchFilterGetMaxFilters,
  // Filter Consolidated
  SEARCH_FILTER_CONSOLIDATED,
  SearchFilterConsolidatedType,
  SearchFilterConsolidatedOperator,
  SearchFilterConsolidatedLogic,
  SearchFilterConsolidatedDefault,
  SearchFilterConsolidatedLimit,
  searchFilterConsolidatedGetTypeLabel,
  searchFilterConsolidatedGetOperatorLabel,
  searchFilterConsolidatedGetLogicLabel,
  searchFilterConsolidatedIsTermType,
  searchFilterConsolidatedIsRangeType,
  searchFilterConsolidatedIsGeoType,
  searchFilterConsolidatedIsNestedType,
  searchFilterConsolidatedGetMaxFilters,
  searchFilterConsolidatedGetDefaultLogic,
  searchFilterConsolidatedIsCaseSensitive,
  searchFilterConsolidatedGetMaxNestedDepth,
  // Search Operator
  SearchComparisonOperator,
  SearchStringOperator,
  SearchNumericOperator,
  SearchGeoOperator,
  SearchDateOperator,
  SearchArrayOperator,
  SearchLogicalOperator,
};
