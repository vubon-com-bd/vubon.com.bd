/**
 * Support Report Types
 * Type definitions for support reports based on shared-constants
 * @module SupportReportTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants reporting report-support
// ============================================================
import {
  // Support Report Core
  SUPPORT_REPORT,
  SupportReportType,
  SupportReportFormat,
  SupportReportStatus,
  SupportReportFrequency,
  SupportReportPriority,
  SupportReportDeliveryMethod,
  supportReportGetTypeLabel,
  supportReportGetFormatLabel,
  supportReportGetStatusLabel,
  supportReportGetFrequencyLabel,
  supportReportGetPriorityLabel,
  supportReportGetDeliveryMethodLabel,
  supportReportIsCompleted,
  supportReportIsFailed,
  supportReportIsPending,
  // Support Report Type
  SUPPORT_REPORT_TYPE,
  SupportReportCategory,
  SupportReportScope,
  SupportReportDataSource,
  SupportReportLayout,
  SupportReportTimeRange,
  SupportReportGrouping,
  supportReportTypeGetCategoryLabel,
  supportReportTypeGetScopeLabel,
  supportReportTypeGetDataSourceLabel,
  supportReportTypeGetLayoutLabel,
  supportReportTypeGetTimeRangeLabel,
  supportReportTypeGetGroupingLabel,
} from '@vubon/shared-constants';

// ============================================================
// Support Report Extended Types
// ============================================================

/**
 * Support report
 */
export interface SupportReport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: SupportReportType;
  format: SupportReportFormat;
  status: SupportReportStatus;
  frequency: SupportReportFrequency;
  priority: SupportReportPriority;
  deliveryMethod: SupportReportDeliveryMethod;
  title: string;
  description?: string;
  category: SupportReportCategory;
  scope: SupportReportScope;
  dataSource: SupportReportDataSource;
  layout: SupportReportLayout;
  timeRange: SupportReportTimeRange;
  grouping: SupportReportGrouping;
  isCompleted: boolean;
  isFailed: boolean;
  isPending: boolean;
  fileUrl?: string;
  fileSize?: number;
  metadata?: Metadata;
}

/**
 * Support report filter
 */
export interface SupportReportFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: SupportReportType[];
  formats?: SupportReportFormat[];
  statuses?: SupportReportStatus[];
  frequencies?: SupportReportFrequency[];
  priorities?: SupportReportPriority[];
  deliveryMethods?: SupportReportDeliveryMethod[];
  categories?: SupportReportCategory[];
  scopes?: SupportReportScope[];
  dataSources?: SupportReportDataSource[];
  layouts?: SupportReportLayout[];
  timeRanges?: SupportReportTimeRange[];
  groupings?: SupportReportGrouping[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isCompleted?: boolean;
  isFailed?: boolean;
  isPending?: boolean;
  searchTerm?: string;
}

/**
 * Support report statistics
 */
export interface SupportReportStatistics {
  userId: ID;
  totalReports: number;
  completedReports: number;
  failedReports: number;
  pendingReports: number;
  byType: Record<SupportReportType, number>;
  byFormat: Record<SupportReportFormat, number>;
  byStatus: Record<SupportReportStatus, number>;
  byFrequency: Record<SupportReportFrequency, number>;
  byPriority: Record<SupportReportPriority, number>;
  byDeliveryMethod: Record<SupportReportDeliveryMethod, number>;
  byCategory: Record<SupportReportCategory, number>;
  byScope: Record<SupportReportScope, number>;
  byDataSource: Record<SupportReportDataSource, number>;
  byLayout: Record<SupportReportLayout, number>;
  byTimeRange: Record<SupportReportTimeRange, number>;
  byGrouping: Record<SupportReportGrouping, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageFileSize: number;
  maxFileSize: number;
  minFileSize: number;
  mostFrequentType: SupportReportType;
  mostFrequentStatus: SupportReportStatus;
  mostFrequentFrequency: SupportReportFrequency;
  mostFrequentCategory: SupportReportCategory;
}

/**
 * Support report summary
 */
export interface SupportReportSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalReports: number;
  completed: number;
  failed: number;
  pending: number;
  byType: Record<SupportReportType, number>;
  byFormat: Record<SupportReportFormat, number>;
  byStatus: Record<SupportReportStatus, number>;
  byFrequency: Record<SupportReportFrequency, number>;
  byPriority: Record<SupportReportPriority, number>;
  byDeliveryMethod: Record<SupportReportDeliveryMethod, number>;
  byCategory: Record<SupportReportCategory, number>;
  byScope: Record<SupportReportScope, number>;
  byDataSource: Record<SupportReportDataSource, number>;
  byLayout: Record<SupportReportLayout, number>;
  byTimeRange: Record<SupportReportTimeRange, number>;
  byGrouping: Record<SupportReportGrouping, number>;
  reportTrend: {
    date: Date;
    total: number;
    completed: number;
    failed: number;
  }[];
  topTypes: {
    type: SupportReportType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: SupportReportStatus;
    count: number;
    label: string;
  }[];
  topFrequencies: {
    frequency: SupportReportFrequency;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: SupportReportCategory;
    count: number;
    label: string;
  }[];
}

/**
 * Support report configuration
 */
export interface SupportReportConfiguration {
  enabled: boolean;
  defaultType: SupportReportType;
  defaultFormat: SupportReportFormat;
  defaultStatus: SupportReportStatus;
  defaultFrequency: SupportReportFrequency;
  defaultPriority: SupportReportPriority;
  defaultDeliveryMethod: SupportReportDeliveryMethod;
  defaultCategory: SupportReportCategory;
  defaultScope: SupportReportScope;
  defaultDataSource: SupportReportDataSource;
  defaultLayout: SupportReportLayout;
  defaultTimeRange: SupportReportTimeRange;
  defaultGrouping: SupportReportGrouping;
  maxFileSize: number;
  allowedFormats: SupportReportFormat[];
  allowedTypes: SupportReportType[];
  notificationOnComplete: boolean;
  notificationOnFailed: boolean;
  notificationOnPending: boolean;
  alertConfig?: SupportReportAlertConfig;
}

/**
 * Support report alert configuration
 */
export interface SupportReportAlertConfig {
  enabled: boolean;
  failedReportAlert: boolean;
  pendingReportAlert: boolean;
  pendingThreshold: number;
  largeFileAlert: boolean;
  largeFileThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Support report history
 */
export interface SupportReportHistory extends BaseEntity, Timestamp {
  id: ID;
  reportId: ID;
  userId: ID;
  action: 'create' | 'update' | 'generate' | 'complete' | 'fail' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Support report validation
 */
export interface SupportReportValidation {
  isValid: boolean;
  reportId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Support report export
 */
export interface SupportReportExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: SupportReportFormat;
  filter: SupportReportFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Support report schedule
 */
export interface SupportReportSchedule extends BaseEntity, Timestamp {
  id: ID;
  reportId: ID;
  userId: ID;
  frequency: SupportReportFrequency;
  nextRunAt: Date;
  lastRunAt?: Date;
  isActive: boolean;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Support Report Core
  SUPPORT_REPORT,
  SupportReportType,
  SupportReportFormat,
  SupportReportStatus,
  SupportReportFrequency,
  SupportReportPriority,
  SupportReportDeliveryMethod,
  supportReportGetTypeLabel,
  supportReportGetFormatLabel,
  supportReportGetStatusLabel,
  supportReportGetFrequencyLabel,
  supportReportGetPriorityLabel,
  supportReportGetDeliveryMethodLabel,
  supportReportIsCompleted,
  supportReportIsFailed,
  supportReportIsPending,
  // Support Report Type
  SUPPORT_REPORT_TYPE,
  SupportReportCategory,
  SupportReportScope,
  SupportReportDataSource,
  SupportReportLayout,
  SupportReportTimeRange,
  SupportReportGrouping,
  supportReportTypeGetCategoryLabel,
  supportReportTypeGetScopeLabel,
  supportReportTypeGetDataSourceLabel,
  supportReportTypeGetLayoutLabel,
  supportReportTypeGetTimeRangeLabel,
  supportReportTypeGetGroupingLabel,
};
