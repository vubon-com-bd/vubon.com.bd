/**
 * Report Widget Types
 * Type definitions for report widgets based on shared-constants
 * @module ReportWidgetTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants reporting report-widget
// ============================================================
import {
  // Widget Core
  REPORT_WIDGET,
  ReportWidgetCategory,
  ReportWidgetSize,
  ReportWidgetDimension,
  ReportWidgetLayout,
  ReportWidgetDataSource,
  ReportWidgetDataFormat,
  ReportWidgetAggregation,
  ReportWidgetComparisonType,
  ReportWidgetAlertType,
  ReportWidgetColorScheme,
  reportWidgetGetCategoryLabel,
  reportWidgetGetSizeLabel,
  reportWidgetGetDimension,
  reportWidgetGetLayoutLabel,
  reportWidgetGetDataSourceLabel,
  reportWidgetGetDataFormatLabel,
  reportWidgetGetAggregationLabel,
  reportWidgetGetComparisonTypeLabel,
  reportWidgetGetAlertTypeLabel,
  reportWidgetGetColorSchemeLabel,
  reportWidgetIsValidCategory,
  reportWidgetIsValidSize,
  reportWidgetGetDefaultSize,
  reportWidgetGetDefaultColorScheme,
  reportWidgetGetDefaultAggregation,
  reportWidgetGetMaxDataPoints,
  reportWidgetGetWidgetSizeGrid,
  // Widget Type
  REPORT_WIDGET_TYPE,
  ReportWidgetTypeFamily,
  ReportWidgetTypeComplexity,
  ReportWidgetTypePurpose,
  ReportWidgetTypeAudience,
  ReportWidgetTypeFrequency,
  ReportWidgetTypeInteraction,
  ReportWidgetTypePermission,
  ReportWidgetTypePerformanceTier,
  reportWidgetTypeGetFamilyLabel,
  reportWidgetTypeGetComplexityLabel,
  reportWidgetTypeGetPurposeLabel,
  reportWidgetTypeGetAudienceLabel,
  reportWidgetTypeGetFrequencyLabel,
  reportWidgetTypeGetInteractionLabel,
  reportWidgetTypeGetPermissionLabel,
  reportWidgetTypeGetPerformanceTierLabel,
  reportWidgetTypeIsValidFamily,
  reportWidgetTypeIsValidPurpose,
  // Widget Status
  REPORT_WIDGET_STATUS,
  ReportWidgetStatusType,
  ReportWidgetStatusCategory,
  ReportWidgetStatusColor,
  ReportWidgetStatusPriority,
  ReportWidgetVisibility,
  ReportWidgetState,
  reportWidgetStatusGetLabel,
  reportWidgetStatusGetCategory,
  reportWidgetStatusGetColor,
  reportWidgetStatusGetPriority,
  reportWidgetStatusIsActive,
  reportWidgetStatusIsPublished,
  reportWidgetStatusIsArchived,
  reportWidgetStatusCanTransitionTo,
  reportWidgetStatusGetAvailableTransitions,
  reportWidgetStatusGetSequence,
  reportWidgetStatusGetVisibilityLabel,
  reportWidgetStatusGetStateLabel,
  reportWidgetStatusIsValid,
  reportWidgetStatusIsValidVisibility,
  reportWidgetStatusIsValidState,
} from '@vubon/shared-constants';

// ============================================================
// Report Widget Extended Types
// ============================================================

/**
 * Report Widget
 */
export interface ReportWidget extends BaseEntity, Timestamp {
  id: ID;
  name: string;
  description?: string;
  category: ReportWidgetCategory;
  size: ReportWidgetSize;
  dimension: ReportWidgetDimension;
  layout: ReportWidgetLayout;
  dataSource: ReportWidgetDataSource;
  dataFormat: ReportWidgetDataFormat;
  aggregation: ReportWidgetAggregation;
  comparisonType: ReportWidgetComparisonType;
  alertType: ReportWidgetAlertType;
  colorScheme: ReportWidgetColorScheme;
  family: ReportWidgetTypeFamily;
  complexity: ReportWidgetTypeComplexity;
  purpose: ReportWidgetTypePurpose;
  audience: ReportWidgetTypeAudience;
  frequency: ReportWidgetTypeFrequency;
  interaction: ReportWidgetTypeInteraction;
  permission: ReportWidgetTypePermission;
  performanceTier: ReportWidgetTypePerformanceTier;
  status: ReportWidgetStatusType;
  visibility: ReportWidgetVisibility;
  state: ReportWidgetState;
  isActive: boolean;
  isPublished: boolean;
  isArchived: boolean;
  config: Record<string, unknown>;
  metadata?: Metadata;
}

/**
 * Report Widget Filter
 */
export interface ReportWidgetFilter {
  ids?: ID[];
  categories?: ReportWidgetCategory[];
  sizes?: ReportWidgetSize[];
  dimensions?: string[];
  layouts?: ReportWidgetLayout[];
  dataSources?: ReportWidgetDataSource[];
  dataFormats?: ReportWidgetDataFormat[];
  aggregations?: ReportWidgetAggregation[];
  comparisonTypes?: ReportWidgetComparisonType[];
  alertTypes?: ReportWidgetAlertType[];
  colorSchemes?: ReportWidgetColorScheme[];
  families?: ReportWidgetTypeFamily[];
  complexities?: ReportWidgetTypeComplexity[];
  purposes?: ReportWidgetTypePurpose[];
  audiences?: ReportWidgetTypeAudience[];
  frequencies?: ReportWidgetTypeFrequency[];
  interactions?: ReportWidgetTypeInteraction[];
  permissions?: ReportWidgetTypePermission[];
  performanceTiers?: ReportWidgetTypePerformanceTier[];
  statuses?: ReportWidgetStatusType[];
  visibilities?: ReportWidgetVisibility[];
  states?: ReportWidgetState[];
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
 * Report Widget Statistics
 */
export interface ReportWidgetStatistics {
  totalWidgets: number;
  activeWidgets: number;
  publishedWidgets: number;
  archivedWidgets: number;
  byCategory: Record<ReportWidgetCategory, number>;
  bySize: Record<ReportWidgetSize, number>;
  byDimension: Record<string, number>;
  byLayout: Record<ReportWidgetLayout, number>;
  byDataSource: Record<ReportWidgetDataSource, number>;
  byDataFormat: Record<ReportWidgetDataFormat, number>;
  byAggregation: Record<ReportWidgetAggregation, number>;
  byComparisonType: Record<ReportWidgetComparisonType, number>;
  byAlertType: Record<ReportWidgetAlertType, number>;
  byColorScheme: Record<ReportWidgetColorScheme, number>;
  byFamily: Record<ReportWidgetTypeFamily, number>;
  byComplexity: Record<ReportWidgetTypeComplexity, number>;
  byPurpose: Record<ReportWidgetTypePurpose, number>;
  byAudience: Record<ReportWidgetTypeAudience, number>;
  byFrequency: Record<ReportWidgetTypeFrequency, number>;
  byInteraction: Record<ReportWidgetTypeInteraction, number>;
  byPermission: Record<ReportWidgetTypePermission, number>;
  byPerformanceTier: Record<ReportWidgetTypePerformanceTier, number>;
  byStatus: Record<ReportWidgetStatusType, number>;
  byVisibility: Record<ReportWidgetVisibility, number>;
  byState: Record<ReportWidgetState, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentCategory: ReportWidgetCategory;
  mostFrequentSize: ReportWidgetSize;
  mostFrequentFamily: ReportWidgetTypeFamily;
  mostFrequentStatus: ReportWidgetStatusType;
}

/**
 * Report Widget Summary
 */
export interface ReportWidgetSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalWidgets: number;
  active: number;
  published: number;
  archived: number;
  byCategory: Record<ReportWidgetCategory, number>;
  bySize: Record<ReportWidgetSize, number>;
  byDimension: Record<string, number>;
  byLayout: Record<ReportWidgetLayout, number>;
  byDataSource: Record<ReportWidgetDataSource, number>;
  byDataFormat: Record<ReportWidgetDataFormat, number>;
  byAggregation: Record<ReportWidgetAggregation, number>;
  byComparisonType: Record<ReportWidgetComparisonType, number>;
  byAlertType: Record<ReportWidgetAlertType, number>;
  byColorScheme: Record<ReportWidgetColorScheme, number>;
  byFamily: Record<ReportWidgetTypeFamily, number>;
  byComplexity: Record<ReportWidgetTypeComplexity, number>;
  byPurpose: Record<ReportWidgetTypePurpose, number>;
  byAudience: Record<ReportWidgetTypeAudience, number>;
  byFrequency: Record<ReportWidgetTypeFrequency, number>;
  byInteraction: Record<ReportWidgetTypeInteraction, number>;
  byPermission: Record<ReportWidgetTypePermission, number>;
  byPerformanceTier: Record<ReportWidgetTypePerformanceTier, number>;
  byStatus: Record<ReportWidgetStatusType, number>;
  byVisibility: Record<ReportWidgetVisibility, number>;
  byState: Record<ReportWidgetState, number>;
  widgetTrend: {
    date: Date;
    total: number;
    active: number;
    published: number;
  }[];
  topCategories: {
    category: ReportWidgetCategory;
    count: number;
    label: string;
  }[];
  topSizes: {
    size: ReportWidgetSize;
    count: number;
    label: string;
  }[];
  topFamilies: {
    family: ReportWidgetTypeFamily;
    count: number;
    label: string;
  }[];
}

/**
 * Report Widget Configuration
 */
export interface ReportWidgetConfiguration {
  enabled: boolean;
  defaultCategory: ReportWidgetCategory;
  defaultSize: ReportWidgetSize;
  defaultDimension: ReportWidgetDimension;
  defaultLayout: ReportWidgetLayout;
  defaultDataSource: ReportWidgetDataSource;
  defaultDataFormat: ReportWidgetDataFormat;
  defaultAggregation: ReportWidgetAggregation;
  defaultColorScheme: ReportWidgetColorScheme;
  maxDataPoints: number;
  requireApproval: boolean;
  allowCustomization: boolean;
  allowExport: boolean;
  allowAlert: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnPublish: boolean;
  notificationOnArchive: boolean;
  alertConfig?: ReportWidgetAlertConfig;
}

/**
 * Report Widget Alert Configuration
 */
export interface ReportWidgetAlertConfig {
  enabled: boolean;
  duplicateNameAlert: boolean;
  performanceAlert: boolean;
  performanceThreshold: number;
  dataSourceAlert: boolean;
  dataSourceThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Report Widget History
 */
export interface ReportWidgetHistory extends BaseEntity, Timestamp {
  id: ID;
  widgetId: ID;
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
 * Report Widget Validation
 */
export interface ReportWidgetValidation {
  isValid: boolean;
  widgetId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Report Widget Export
 */
export interface ReportWidgetExport extends BaseEntity, Timestamp {
  id: ID;
  widgetId: ID;
  format: 'json' | 'csv' | 'pdf' | 'png';
  filter: ReportWidgetFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Report Widget Grid
 */
export interface ReportWidgetGrid extends BaseEntity, Timestamp {
  id: ID;
  dashboardId: ID;
  widgetId: ID;
  size: ReportWidgetSize;
  dimension: ReportWidgetDimension;
  position: {
    row: number;
    col: number;
  };
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Widget Core
  REPORT_WIDGET,
  ReportWidgetCategory,
  ReportWidgetSize,
  ReportWidgetDimension,
  ReportWidgetLayout,
  ReportWidgetDataSource,
  ReportWidgetDataFormat,
  ReportWidgetAggregation,
  ReportWidgetComparisonType,
  ReportWidgetAlertType,
  ReportWidgetColorScheme,
  reportWidgetGetCategoryLabel,
  reportWidgetGetSizeLabel,
  reportWidgetGetDimension,
  reportWidgetGetLayoutLabel,
  reportWidgetGetDataSourceLabel,
  reportWidgetGetDataFormatLabel,
  reportWidgetGetAggregationLabel,
  reportWidgetGetComparisonTypeLabel,
  reportWidgetGetAlertTypeLabel,
  reportWidgetGetColorSchemeLabel,
  reportWidgetIsValidCategory,
  reportWidgetIsValidSize,
  reportWidgetGetDefaultSize,
  reportWidgetGetDefaultColorScheme,
  reportWidgetGetDefaultAggregation,
  reportWidgetGetMaxDataPoints,
  reportWidgetGetWidgetSizeGrid,
  // Widget Type
  REPORT_WIDGET_TYPE,
  ReportWidgetTypeFamily,
  ReportWidgetTypeComplexity,
  ReportWidgetTypePurpose,
  ReportWidgetTypeAudience,
  ReportWidgetTypeFrequency,
  ReportWidgetTypeInteraction,
  ReportWidgetTypePermission,
  ReportWidgetTypePerformanceTier,
  reportWidgetTypeGetFamilyLabel,
  reportWidgetTypeGetComplexityLabel,
  reportWidgetTypeGetPurposeLabel,
  reportWidgetTypeGetAudienceLabel,
  reportWidgetTypeGetFrequencyLabel,
  reportWidgetTypeGetInteractionLabel,
  reportWidgetTypeGetPermissionLabel,
  reportWidgetTypeGetPerformanceTierLabel,
  reportWidgetTypeIsValidFamily,
  reportWidgetTypeIsValidPurpose,
  // Widget Status
  REPORT_WIDGET_STATUS,
  ReportWidgetStatusType,
  ReportWidgetStatusCategory,
  ReportWidgetStatusColor,
  ReportWidgetStatusPriority,
  ReportWidgetVisibility,
  ReportWidgetState,
  reportWidgetStatusGetLabel,
  reportWidgetStatusGetCategory,
  reportWidgetStatusGetColor,
  reportWidgetStatusGetPriority,
  reportWidgetStatusIsActive,
  reportWidgetStatusIsPublished,
  reportWidgetStatusIsArchived,
  reportWidgetStatusCanTransitionTo,
  reportWidgetStatusGetAvailableTransitions,
  reportWidgetStatusGetSequence,
  reportWidgetStatusGetVisibilityLabel,
  reportWidgetStatusGetStateLabel,
  reportWidgetStatusIsValid,
  reportWidgetStatusIsValidVisibility,
  reportWidgetStatusIsValidState,
};
