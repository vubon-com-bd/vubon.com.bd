/**
 * Report Dashboard Types
 * Type definitions for report dashboards based on shared-constants
 * @module ReportDashboardTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants reporting report-dashboard
// ============================================================
import {
  // Dashboard Core
  REPORT_DASHBOARD,
  ReportDashboardType,
  ReportDashboardLayout,
  ReportDashboardWidgetType,
  ReportDashboardChartType,
  ReportDashboardWidgetSize,
  ReportDashboardWidgetPosition,
  ReportDashboardRefreshInterval,
  ReportDashboardTimeRange,
  ReportDashboardMetric,
  ReportDashboardTheme,
  reportDashboardGetTypeLabel,
  reportDashboardGetLayoutLabel,
  reportDashboardGetWidgetTypeLabel,
  reportDashboardGetChartTypeLabel,
  reportDashboardGetWidgetSizeLabel,
  reportDashboardGetRefreshIntervalLabel,
  reportDashboardGetTimeRangeLabel,
  reportDashboardGetMetricLabel,
  reportDashboardGetThemeLabel,
  reportDashboardIsValidType,
  reportDashboardIsValidWidgetType,
  reportDashboardGetDefaultRefreshInterval,
  reportDashboardGetDefaultTimeRange,
  reportDashboardGetRefreshIntervalMs,
  // Dashboard Type
  REPORT_DASHBOARD_TYPE,
  ReportDashboardTypeCategory,
  ReportDashboardTypeComplexity,
  ReportDashboardTypePurpose,
  ReportDashboardTypeAudience,
  ReportDashboardTypeFrequency,
  ReportDashboardTypeInteraction,
  ReportDashboardTypePermission,
  reportDashboardTypeGetCategoryLabel,
  reportDashboardTypeGetComplexityLabel,
  reportDashboardTypeGetPurposeLabel,
  reportDashboardTypeGetAudienceLabel,
  reportDashboardTypeGetFrequencyLabel,
  reportDashboardTypeGetInteractionLabel,
  reportDashboardTypeGetPermissionLabel,
  reportDashboardTypeIsValidCategory,
  reportDashboardTypeIsValidPurpose,
  // Dashboard Status
  REPORT_DASHBOARD_STATUS,
  ReportDashboardStatusType,
  ReportDashboardStatusCategory,
  ReportDashboardStatusColor,
  ReportDashboardStatusPriority,
  ReportDashboardVisibility,
  ReportDashboardSharing,
  reportDashboardStatusGetLabel,
  reportDashboardStatusGetCategory,
  reportDashboardStatusGetColor,
  reportDashboardStatusGetPriority,
  reportDashboardStatusIsActive,
  reportDashboardStatusIsPublished,
  reportDashboardStatusIsArchived,
  reportDashboardStatusCanTransitionTo,
  reportDashboardStatusGetAvailableTransitions,
  reportDashboardStatusGetSequence,
  reportDashboardStatusGetVisibilityLabel,
  reportDashboardStatusGetSharingLabel,
  reportDashboardStatusIsValid,
  reportDashboardStatusIsValidVisibility,
} from '@vubon/shared-constants';

// ============================================================
// Report Dashboard Extended Types
// ============================================================

/**
 * Report Dashboard Widget
 */
export interface ReportDashboardWidget {
  id: string;
  type: ReportDashboardWidgetType;
  title: string;
  chartType: ReportDashboardChartType;
  size: ReportDashboardWidgetSize;
  position: ReportDashboardWidgetPosition;
  metric: ReportDashboardMetric;
  dataSource: string;
  config?: Record<string, unknown>;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Report Dashboard
 */
export interface ReportDashboard extends BaseEntity, Timestamp {
  id: ID;
  name: string;
  description?: string;
  type: ReportDashboardType;
  layout: ReportDashboardLayout;
  theme: ReportDashboardTheme;
  status: ReportDashboardStatusType;
  visibility: ReportDashboardVisibility;
  sharing: ReportDashboardSharing;
  refreshInterval: ReportDashboardRefreshInterval;
  defaultTimeRange: ReportDashboardTimeRange;
  widgets: ReportDashboardWidget[];
  isActive: boolean;
  isPublished: boolean;
  isArchived: boolean;
  metadata?: Metadata;
}

/**
 * Report Dashboard Filter
 */
export interface ReportDashboardFilter {
  ids?: ID[];
  types?: ReportDashboardType[];
  layouts?: ReportDashboardLayout[];
  themes?: ReportDashboardTheme[];
  statuses?: ReportDashboardStatusType[];
  visibilities?: ReportDashboardVisibility[];
  sharings?: ReportDashboardSharing[];
  refreshIntervals?: ReportDashboardRefreshInterval[];
  timeRanges?: ReportDashboardTimeRange[];
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
 * Report Dashboard Statistics
 */
export interface ReportDashboardStatistics {
  totalDashboards: number;
  activeDashboards: number;
  publishedDashboards: number;
  archivedDashboards: number;
  byType: Record<ReportDashboardType, number>;
  byLayout: Record<ReportDashboardLayout, number>;
  byTheme: Record<ReportDashboardTheme, number>;
  byStatus: Record<ReportDashboardStatusType, number>;
  byVisibility: Record<ReportDashboardVisibility, number>;
  bySharing: Record<ReportDashboardSharing, number>;
  byRefreshInterval: Record<ReportDashboardRefreshInterval, number>;
  byTimeRange: Record<ReportDashboardTimeRange, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalWidgets: number;
  averageWidgetsPerDashboard: number;
  maxWidgetsPerDashboard: number;
  minWidgetsPerDashboard: number;
  mostFrequentType: ReportDashboardType;
  mostFrequentLayout: ReportDashboardLayout;
  mostFrequentStatus: ReportDashboardStatusType;
}

/**
 * Report Dashboard Summary
 */
export interface ReportDashboardSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalDashboards: number;
  active: number;
  published: number;
  archived: number;
  byType: Record<ReportDashboardType, number>;
  byLayout: Record<ReportDashboardLayout, number>;
  byTheme: Record<ReportDashboardTheme, number>;
  byStatus: Record<ReportDashboardStatusType, number>;
  byVisibility: Record<ReportDashboardVisibility, number>;
  bySharing: Record<ReportDashboardSharing, number>;
  byRefreshInterval: Record<ReportDashboardRefreshInterval, number>;
  byTimeRange: Record<ReportDashboardTimeRange, number>;
  dashboardTrend: {
    date: Date;
    total: number;
    active: number;
    published: number;
  }[];
  topTypes: {
    type: ReportDashboardType;
    count: number;
    label: string;
  }[];
  topLayouts: {
    layout: ReportDashboardLayout;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: ReportDashboardStatusType;
    count: number;
    label: string;
  }[];
  widgetMetrics: {
    totalWidgets: number;
    averageWidgetsPerDashboard: number;
    maxWidgetsPerDashboard: number;
    minWidgetsPerDashboard: number;
  };
}

/**
 * Report Dashboard Configuration
 */
export interface ReportDashboardConfiguration {
  enabled: boolean;
  defaultType: ReportDashboardType;
  defaultLayout: ReportDashboardLayout;
  defaultTheme: ReportDashboardTheme;
  defaultRefreshInterval: ReportDashboardRefreshInterval;
  defaultTimeRange: ReportDashboardTimeRange;
  maxWidgetsPerDashboard: number;
  requireApproval: boolean;
  allowSharing: boolean;
  allowExport: boolean;
  allowCustomization: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnPublish: boolean;
  notificationOnArchive: boolean;
  alertConfig?: ReportDashboardAlertConfig;
}

/**
 * Report Dashboard Alert Configuration
 */
export interface ReportDashboardAlertConfig {
  enabled: boolean;
  duplicateNameAlert: boolean;
  performanceAlert: boolean;
  performanceThreshold: number;
  widgetLimitAlert: boolean;
  widgetLimitThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Report Dashboard History
 */
export interface ReportDashboardHistory extends BaseEntity, Timestamp {
  id: ID;
  dashboardId: ID;
  action:
    | 'create'
    | 'update'
    | 'publish'
    | 'unpublish'
    | 'archive'
    | 'restore'
    | 'delete'
    | 'widget_add'
    | 'widget_remove'
    | 'widget_update';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Report Dashboard Validation
 */
export interface ReportDashboardValidation {
  isValid: boolean;
  dashboardId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Report Dashboard Export
 */
export interface ReportDashboardExport extends BaseEntity, Timestamp {
  id: ID;
  dashboardId: ID;
  format: 'json' | 'pdf' | 'png' | 'html';
  filter: ReportDashboardFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Report Dashboard Widget Config
 */
export interface ReportDashboardWidgetConfig extends BaseEntity, Timestamp {
  id: ID;
  dashboardId: ID;
  widgetId: string;
  type: ReportDashboardWidgetType;
  title: string;
  chartType: ReportDashboardChartType;
  size: ReportDashboardWidgetSize;
  position: ReportDashboardWidgetPosition;
  metric: ReportDashboardMetric;
  dataSource: string;
  config: Record<string, unknown>;
  isActive: boolean;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Dashboard Core
  REPORT_DASHBOARD,
  ReportDashboardType,
  ReportDashboardLayout,
  ReportDashboardWidgetType,
  ReportDashboardChartType,
  ReportDashboardWidgetSize,
  ReportDashboardWidgetPosition,
  ReportDashboardRefreshInterval,
  ReportDashboardTimeRange,
  ReportDashboardMetric,
  ReportDashboardTheme,
  reportDashboardGetTypeLabel,
  reportDashboardGetLayoutLabel,
  reportDashboardGetWidgetTypeLabel,
  reportDashboardGetChartTypeLabel,
  reportDashboardGetWidgetSizeLabel,
  reportDashboardGetRefreshIntervalLabel,
  reportDashboardGetTimeRangeLabel,
  reportDashboardGetMetricLabel,
  reportDashboardGetThemeLabel,
  reportDashboardIsValidType,
  reportDashboardIsValidWidgetType,
  reportDashboardGetDefaultRefreshInterval,
  reportDashboardGetDefaultTimeRange,
  reportDashboardGetRefreshIntervalMs,
  // Dashboard Type
  REPORT_DASHBOARD_TYPE,
  ReportDashboardTypeCategory,
  ReportDashboardTypeComplexity,
  ReportDashboardTypePurpose,
  ReportDashboardTypeAudience,
  ReportDashboardTypeFrequency,
  ReportDashboardTypeInteraction,
  ReportDashboardTypePermission,
  reportDashboardTypeGetCategoryLabel,
  reportDashboardTypeGetComplexityLabel,
  reportDashboardTypeGetPurposeLabel,
  reportDashboardTypeGetAudienceLabel,
  reportDashboardTypeGetFrequencyLabel,
  reportDashboardTypeGetInteractionLabel,
  reportDashboardTypeGetPermissionLabel,
  reportDashboardTypeIsValidCategory,
  reportDashboardTypeIsValidPurpose,
  // Dashboard Status
  REPORT_DASHBOARD_STATUS,
  ReportDashboardStatusType,
  ReportDashboardStatusCategory,
  ReportDashboardStatusColor,
  ReportDashboardStatusPriority,
  ReportDashboardVisibility,
  ReportDashboardSharing,
  reportDashboardStatusGetLabel,
  reportDashboardStatusGetCategory,
  reportDashboardStatusGetColor,
  reportDashboardStatusGetPriority,
  reportDashboardStatusIsActive,
  reportDashboardStatusIsPublished,
  reportDashboardStatusIsArchived,
  reportDashboardStatusCanTransitionTo,
  reportDashboardStatusGetAvailableTransitions,
  reportDashboardStatusGetSequence,
  reportDashboardStatusGetVisibilityLabel,
  reportDashboardStatusGetSharingLabel,
  reportDashboardStatusIsValid,
  reportDashboardStatusIsValidVisibility,
};
