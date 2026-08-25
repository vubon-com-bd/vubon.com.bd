/**
 * Search Operator Types
 * Type definitions for search operators based on shared-constants
 * @module SearchOperatorTypes
 */

import { Metadata } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants search operator
// ============================================================
import {
  // Operator Constants
  SEARCH_OPERATOR,
  SearchBooleanOperator,
  SearchComparisonOperator,
  SearchStringOperator,
  SearchNumericOperator,
  SearchGeoOperator,
  SearchDateOperator,
  SearchArrayOperator,
  SearchLogicalOperator,
  SearchAggregationOperator,
  SearchOperatorPriority,
  searchOperatorGetBooleanLabel,
  searchOperatorGetComparisonLabel,
  searchOperatorGetStringLabel,
  searchOperatorGetGeoLabel,
  searchOperatorGetDateLabel,
  searchOperatorIsBoolean,
  searchOperatorIsComparison,
  searchOperatorIsString,
  searchOperatorIsGeo,
  searchOperatorIsDate,
  searchOperatorIsArray,
  searchOperatorIsLogical,
  searchOperatorGetPriority,
} from '@vubon/shared-constants';

// ============================================================
// Search Operator Types
// ============================================================

/**
 * Search operator
 */
export interface SearchOperator {
  /** Operator type */
  type:
    | 'boolean'
    | 'comparison'
    | 'string'
    | 'numeric'
    | 'geo'
    | 'date'
    | 'array'
    | 'logical'
    | 'aggregation';
  /** Operator value */
  value: string;
  /** Operator label */
  label: string;
  /** Operator priority */
  priority: SearchOperatorPriority;
  /** Is boolean operator */
  isBoolean: boolean;
  /** Is comparison operator */
  isComparison: boolean;
  /** Is string operator */
  isString: boolean;
  /** Is geo operator */
  isGeo: boolean;
  /** Is date operator */
  isDate: boolean;
  /** Is array operator */
  isArray: boolean;
  /** Is logical operator */
  isLogical: boolean;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Operator configuration
 */
export interface SearchOperatorConfiguration {
  /** Enabled operator types */
  enabledTypes: (
    | 'boolean'
    | 'comparison'
    | 'string'
    | 'numeric'
    | 'geo'
    | 'date'
    | 'array'
    | 'logical'
    | 'aggregation'
  )[];
  /** Default operator priority */
  defaultPriority: SearchOperatorPriority;
  /** Case sensitivity */
  caseSensitive: boolean;
  /** Allow custom operators */
  allowCustom: boolean;
  /** Max operators per query */
  maxOperatorsPerQuery: number;
  /** Enable caching */
  enableCache: boolean;
  /** Cache TTL in seconds */
  cacheTTL: number;
}

/**
 * Operator validation
 */
export interface SearchOperatorValidation {
  /** Whether the operator is valid */
  isValid: boolean;
  /** Operator value */
  value: string;
  /** Operator type */
  type: string;
  /** Validation errors */
  errors?: string[];
  /** Validation warnings */
  warnings?: string[];
  /** Suggestions */
  suggestions?: string[];
}

/**
 * Operator statistics
 */
export interface SearchOperatorStatistics {
  /** Total operators */
  totalOperators: number;
  /** Operators by type */
  byType: {
    boolean: number;
    comparison: number;
    string: number;
    numeric: number;
    geo: number;
    date: number;
    array: number;
    logical: number;
    aggregation: number;
  };
  /** Operators by priority */
  byPriority: Record<SearchOperatorPriority, number>;
  /** Most common operators */
  topOperators: { operator: string; count: number }[];
  /** Performance */
  performance: {
    avgTimeMs: number;
    minTimeMs: number;
    maxTimeMs: number;
  };
}

/**
 * Operator expression
 */
export interface SearchOperatorExpression {
  /** Left operand */
  left: string | SearchOperatorExpression;
  /** Operator */
  operator: SearchOperator;
  /** Right operand */
  right: string | SearchOperatorExpression;
  /** Is grouped */
  isGrouped: boolean;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Operator group
 */
export interface SearchOperatorGroup {
  /** Group ID */
  id: string;
  /** Group name */
  name: string;
  /** Operators in the group */
  operators: SearchOperator[];
  /** Group type */
  type:
    | 'boolean'
    | 'comparison'
    | 'string'
    | 'numeric'
    | 'geo'
    | 'date'
    | 'array'
    | 'logical'
    | 'aggregation'
    | 'mixed';
  /** Is active */
  isActive: boolean;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Operator mapping
 */
export interface SearchOperatorMapping {
  /** Field name */
  field: string;
  /** Allowed operators */
  operators: SearchOperator[];
  /** Default operator */
  defaultOperator: SearchOperator;
  /** Is required */
  isRequired: boolean;
  /** Metadata */
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Operator Constants
  SEARCH_OPERATOR,
  SearchBooleanOperator,
  SearchComparisonOperator,
  SearchStringOperator,
  SearchNumericOperator,
  SearchGeoOperator,
  SearchDateOperator,
  SearchArrayOperator,
  SearchLogicalOperator,
  SearchAggregationOperator,
  SearchOperatorPriority,
  searchOperatorGetBooleanLabel,
  searchOperatorGetComparisonLabel,
  searchOperatorGetStringLabel,
  searchOperatorGetGeoLabel,
  searchOperatorGetDateLabel,
  searchOperatorIsBoolean,
  searchOperatorIsComparison,
  searchOperatorIsString,
  searchOperatorIsGeo,
  searchOperatorIsDate,
  searchOperatorIsArray,
  searchOperatorIsLogical,
  searchOperatorGetPriority,
};
