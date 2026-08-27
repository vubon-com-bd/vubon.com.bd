/**
 * Report Filter Types
 * Type definitions for report filters based on shared-constants
 * @module ReportFilterTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants reporting report-filter
// ============================================================
import {
  // Filter Core
  REPORT_FILTER,
  ReportFilterType,
  ReportFilterOperator,
  ReportFilterLogic,
  ReportFilterDataType,
  ReportFilterInputType,
  reportFilterGetTypeLabel,
  reportFilterGetOperatorLabel,
  reportFilterGetConditionLabel,
  reportFilterGetLogicLabel,
  reportFilterGetGroupLabel,
  reportFilterGetDataTypeLabel,
  reportFilterGetInputTypeLabel,
  reportFilterGetOperatorsForType,
  reportFilterIsValidType,
  reportFilterIsValidOperator,
  reportFilterIsValidCondition,
  reportFilterGetDefaultOperator,
  reportFilterGetMaxFilters,
  reportFilterGetMaxDepth,
  // Filter Type
  REPORT_FILTER_TYPE,
  ReportFilterTypeCategory,
  ReportFilterTypeComplexity,
  ReportFilterTypeScope,
  ReportFilterTypePersistence,
  ReportFilterTypePerformance,
  ReportFilterTypeSecurity,
  ReportFilterTypeValidation,
  reportFilterTypeGetCategoryLabel,
  reportFilterTypeGetComplexityLabel,
  reportFilterTypeGetScopeLabel,
  reportFilterTypeGetPersistenceLabel,
  reportFilterTypeGetPerformanceLabel,
  reportFilterTypeGetSecurityLabel,
  reportFilterTypeGetValidationLabel,
  reportFilterTypeIsValidCategory,
  reportFilterTypeIsValidScope,
  // Filter Status
  REPORT_FILTER_STATUS,
  ReportFilterStatusType,
  ReportFilterStatusCategory,
  ReportFilterStatusColor,
  ReportFilterStatusPriority,
  ReportFilterVisibility,
  ReportFilterState,
  ReportFilterAction,
  reportFilterStatusGetLabel,
  reportFilterStatusGetCategory,
  reportFilterStatusGetColor,
  reportFilterStatusGetPriority,
  reportFilterStatusIsActive,
  reportFilterStatusIsPublished,
  reportFilterStatusIsArchived,
  reportFilterStatusCanTransitionTo,
  reportFilterStatusGetAvailableTransitions,
  reportFilterStatusGetSequence,
  reportFilterStatusGetVisibilityLabel,
  reportFilterStatusGetStateLabel,
  reportFilterStatusGetActionLabel,
  reportFilterStatusIsValid,
  reportFilterStatusIsValidVisibility,
  reportFilterStatusIsValidState,
} from '@vubon/shared-constants';

// ============================================================
// Report Filter Local Types (যেগুলো report.types-এ নেই)
// ============================================================

/**
 * Report Filter Condition
 */
export interface ReportFilterCondition {
  id: string;
  field: string;
  operator: ReportFilterOperator;
  value: unknown;
  condition: ReportFilterCondition;
  metadata?: Metadata;
}

/**
 * Report Filter Group
 */
export interface ReportFilterGroup {
  id: string;
  logic: ReportFilterLogic;
  conditions: ReportFilterCondition[];
  groups?: ReportFilterGroup[];
  metadata?: Metadata;
}

// ============================================================
// Report Filter Extended Types
// ============================================================

/**
 * Report Filter Filter
 */
export interface ReportFilterFilter {
  ids?: ID[];
  types?: ReportFilterType[];
  categories?: ReportFilterTypeCategory[];
  complexities?: ReportFilterTypeComplexity[];
  scopes?: ReportFilterTypeScope[];
  persistences?: ReportFilterTypePersistence[];
  performances?: ReportFilterTypePerformance[];
  securities?: ReportFilterTypeSecurity[];
  validations?: ReportFilterTypeValidation[];
  statuses?: ReportFilterStatusType[];
  visibilities?: ReportFilterVisibility[];
  states?: ReportFilterState[];
  actions?: ReportFilterAction[];
  dataTypes?: ReportFilterDataType[];
  inputTypes?: ReportFilterInputType[];
  operators?: ReportFilterOperator[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isPublished?: boolean;
  isArchived?: boolean;
  searchTerm?: string;
}

/**
 * Report Filter Statistics
 */
export interface ReportFilterStatistics {
  totalFilters: number;
  activeFilters: number;
  publishedFilters: number;
  archivedFilters: number;
  byType: Record<ReportFilterType, number>;
  byCategory: Record<ReportFilterTypeCategory, number>;
  byComplexity: Record<ReportFilterTypeComplexity, number>;
  byScope: Record<ReportFilterTypeScope, number>;
  byPersistence: Record<ReportFilterTypePersistence, number>;
  byPerformance: Record<ReportFilterTypePerformance, number>;
  bySecurity: Record<ReportFilterTypeSecurity, number>;
  byValidation: Record<ReportFilterTypeValidation, number>;
  byStatus: Record<ReportFilterStatusType, number>;
  byVisibility: Record<ReportFilterVisibility, number>;
  byState: Record<ReportFilterState, number>;
  byAction: Record<ReportFilterAction, number>;
  byDataType: Record<ReportFilterDataType, number>;
  byInputType: Record<ReportFilterInputType, number>;
  byOperator: Record<ReportFilterOperator, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentType: ReportFilterType;
  mostFrequentCategory: ReportFilterTypeCategory;
  mostFrequentStatus: ReportFilterStatusType;
  mostFrequentDataType: ReportFilterDataType;
}

/**
 * Report Filter Summary
 */
export interface ReportFilterSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalFilters: number;
  active: number;
  published: number;
  archived: number;
  byType: Record<ReportFilterType, number>;
  byCategory: Record<ReportFilterTypeCategory, number>;
  byComplexity: Record<ReportFilterTypeComplexity, number>;
  byScope: Record<ReportFilterTypeScope, number>;
  byPersistence: Record<ReportFilterTypePersistence, number>;
  byPerformance: Record<ReportFilterTypePerformance, number>;
  bySecurity: Record<ReportFilterTypeSecurity, number>;
  byValidation: Record<ReportFilterTypeValidation, number>;
  byStatus: Record<ReportFilterStatusType, number>;
  byVisibility: Record<ReportFilterVisibility, number>;
  byState: Record<ReportFilterState, number>;
  byAction: Record<ReportFilterAction, number>;
  byDataType: Record<ReportFilterDataType, number>;
  byInputType: Record<ReportFilterInputType, number>;
  byOperator: Record<ReportFilterOperator, number>;
  filterTrend: {
    date: Date;
    total: number;
    active: number;
    published: number;
  }[];
  topTypes: {
    type: ReportFilterType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: ReportFilterTypeCategory;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: ReportFilterStatusType;
    count: number;
    label: string;
  }[];
}

/**
 * Report Filter Configuration
 */
export interface ReportFilterConfiguration {
  enabled: boolean;
  defaultType: ReportFilterType;
  defaultCategory: ReportFilterTypeCategory;
  defaultScope: ReportFilterTypeScope;
  defaultDataType: ReportFilterDataType;
  defaultInputType: ReportFilterInputType;
  defaultOperator: ReportFilterOperator;
  defaultLogic: ReportFilterLogic;
  maxFilters: number;
  maxDepth: number;
  requireApproval: boolean;
  allowCustomization: boolean;
  allowExport: boolean;
  allowPersistence: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnPublish: boolean;
  notificationOnArchive: boolean;
  alertConfig?: ReportFilterAlertConfig;
}

/**
 * Report Filter Alert Configuration
 */
export interface ReportFilterAlertConfig {
  enabled: boolean;
  duplicateNameAlert: boolean;
  performanceAlert: boolean;
  performanceThreshold: number;
  maxFiltersAlert: boolean;
  maxFiltersThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Report Filter History
 */
export interface ReportFilterHistory extends BaseEntity, Timestamp {
  id: ID;
  filterId: ID;
  action:
    | 'create'
    | 'update'
    | 'publish'
    | 'unpublish'
    | 'archive'
    | 'restore'
    | 'delete'
    | 'config_update';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Report Filter Validation
 */
export interface ReportFilterValidation {
  isValid: boolean;
  filterId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Report Filter Export
 */
export interface ReportFilterExport extends BaseEntity, Timestamp {
  id: ID;
  filterId: ID;
  format: 'json' | 'csv' | 'xml' | 'yaml';
  filter: ReportFilterFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything (ডুপ্লিকেট সরানো হয়েছে)
// ============================================================

export {
  // Filter Core
  REPORT_FILTER,
  ReportFilterType,
  ReportFilterOperator,
  ReportFilterLogic,
  ReportFilterDataType,
  ReportFilterInputType,
  reportFilterGetTypeLabel,
  reportFilterGetOperatorLabel,
  reportFilterGetConditionLabel,
  reportFilterGetLogicLabel,
  reportFilterGetGroupLabel,
  reportFilterGetDataTypeLabel,
  reportFilterGetInputTypeLabel,
  reportFilterGetOperatorsForType,
  reportFilterIsValidType,
  reportFilterIsValidOperator,
  reportFilterIsValidCondition,
  reportFilterGetDefaultOperator,
  reportFilterGetMaxFilters,
  reportFilterGetMaxDepth,
  // Filter Type
  REPORT_FILTER_TYPE,
  ReportFilterTypeCategory,
  ReportFilterTypeComplexity,
  ReportFilterTypeScope,
  ReportFilterTypePersistence,
  ReportFilterTypePerformance,
  ReportFilterTypeSecurity,
  ReportFilterTypeValidation,
  reportFilterTypeGetCategoryLabel,
  reportFilterTypeGetComplexityLabel,
  reportFilterTypeGetScopeLabel,
  reportFilterTypeGetPersistenceLabel,
  reportFilterTypeGetPerformanceLabel,
  reportFilterTypeGetSecurityLabel,
  reportFilterTypeGetValidationLabel,
  reportFilterTypeIsValidCategory,
  reportFilterTypeIsValidScope,
  // Filter Status
  REPORT_FILTER_STATUS,
  ReportFilterStatusType,
  ReportFilterStatusCategory,
  ReportFilterStatusColor,
  ReportFilterStatusPriority,
  ReportFilterVisibility,
  ReportFilterState,
  ReportFilterAction,
  reportFilterStatusGetLabel,
  reportFilterStatusGetCategory,
  reportFilterStatusGetColor,
  reportFilterStatusGetPriority,
  reportFilterStatusIsActive,
  reportFilterStatusIsPublished,
  reportFilterStatusIsArchived,
  reportFilterStatusCanTransitionTo,
  reportFilterStatusGetAvailableTransitions,
  reportFilterStatusGetSequence,
  reportFilterStatusGetVisibilityLabel,
  reportFilterStatusGetStateLabel,
  reportFilterStatusGetActionLabel,
  reportFilterStatusIsValid,
  reportFilterStatusIsValidVisibility,
  reportFilterStatusIsValidState,
};
