/**
 * Analytics Filter Types
 * Type definitions for analytics filters based on shared-constants
 * @module AnalyticsFilterTypes
 */

import { Metadata } from '../common/core-primitives.types';

// ============================================================
// Import AnalyticsFilter from analytics.types
// ============================================================
import type { AnalyticsFilter } from './analytics.types';

// ============================================================
// Import from shared-constants analytics filter
// ============================================================
import {
  // Filter Constants
  ANALYTICS_FILTER,
  // Types
  AnalyticsFilterOperator,
  AnalyticsFilterDataType,
  AnalyticsFilterCategory,
  AnalyticsFilterLogicType,
  AnalyticsFilterMatchType,
  AnalyticsFilterPriority,
  AnalyticsFilterScope,
  // Functions
  getAnalyticsFilterOperatorLabel,
  getAnalyticsFilterDataTypeLabel,
  getAnalyticsFilterCategoryLabel,
  getAnalyticsFilterLogicTypeLabel,
  getAnalyticsFilterMatchTypeLabel,
  getAnalyticsFilterPriorityLabel,
  getAnalyticsFilterScopeLabel,
  isAnalyticsFilterComparisonOperator,
  isAnalyticsFilterStringOperator,
  isAnalyticsFilterSetOperator,
  isAnalyticsFilterNullOperator,
  isAnalyticsFilterLogicalOperator,
} from '@vubon/shared-constants';

// ============================================================
// Analytics Filter Extended Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Analytics filter group
 */
export interface AnalyticsFilterGroup {
  /** Group ID */
  id: string;
  /** Group name */
  name: string;
  /** Group logic */
  logic: 'and' | 'or';
  /** Filters in the group */
  filters: AnalyticsFilter[];
  /** Nested groups */
  groups?: AnalyticsFilterGroup[];
  /** Is active */
  isActive: boolean;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Analytics filter condition
 */
export interface AnalyticsFilterCondition {
  /** Field to filter */
  field: string;
  /** Operator */
  operator: AnalyticsFilterOperator;
  /** Value to compare */
  value: unknown;
  /** Data type */
  dataType: AnalyticsFilterDataType;
  /** Is negated */
  negated: boolean;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Analytics filter validation
 */
export interface AnalyticsFilterValidation {
  /** Whether the filter is valid */
  isValid: boolean;
  /** Filter field */
  field: string;
  /** Validation errors */
  errors?: string[];
  /** Validation warnings */
  warnings?: string[];
  /** Suggestions for improvement */
  suggestions?: string[];
}

/**
 * Analytics filter statistics
 */
export interface AnalyticsFilterStatistics {
  /** Total filters */
  totalFilters: number;
  /** Filters by operator */
  byOperator: Record<AnalyticsFilterOperator, number>;
  /** Filters by data type */
  byDataType: Record<AnalyticsFilterDataType, number>;
  /** Filters by category */
  byCategory: Record<AnalyticsFilterCategory, number>;
  /** Filters by priority */
  byPriority: Record<AnalyticsFilterPriority, number>;
  /** Filters by scope */
  byScope: Record<AnalyticsFilterScope, number>;
  /** Most used fields */
  topFields: { field: string; count: number }[];
  /** Performance metrics */
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
  // Filter Constants
  ANALYTICS_FILTER,
  // Types
  AnalyticsFilterOperator,
  AnalyticsFilterDataType,
  AnalyticsFilterCategory,
  AnalyticsFilterLogicType,
  AnalyticsFilterMatchType,
  AnalyticsFilterPriority,
  AnalyticsFilterScope,
  // Functions
  getAnalyticsFilterOperatorLabel,
  getAnalyticsFilterDataTypeLabel,
  getAnalyticsFilterCategoryLabel,
  getAnalyticsFilterLogicTypeLabel,
  getAnalyticsFilterMatchTypeLabel,
  getAnalyticsFilterPriorityLabel,
  getAnalyticsFilterScopeLabel,
  isAnalyticsFilterComparisonOperator,
  isAnalyticsFilterStringOperator,
  isAnalyticsFilterSetOperator,
  isAnalyticsFilterNullOperator,
  isAnalyticsFilterLogicalOperator,
};
