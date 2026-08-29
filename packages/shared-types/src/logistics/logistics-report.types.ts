/**
 * Logistics Report Types
 * Type definitions for logistics reports based on shared-constants
 * @module LogisticsReportTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants logistics report
// ============================================================
import {
  // Logistics Report Constants
  LOGISTICS_REPORT,
  LogisticsReportType,
  LogisticsReportStatus,
  LogisticsReportFormat,
  LogisticsReportFrequency,
  LogisticsReportPriority,
  LogisticsReportDeliveryMethod,
  LogisticsReportCategory,
  logisticsReportGetTypeLabel,
  logisticsReportGetStatusLabel,
  logisticsReportGetFormatLabel,
  logisticsReportGetFrequencyLabel,
  logisticsReportGetPriorityLabel,
  logisticsReportGetDeliveryMethodLabel,
  logisticsReportIsCompleted,
  logisticsReportIsFailed,
  logisticsReportIsPending,
  logisticsReportGetCategoryLabel,
  // Logistics Report Type Constants
  LOGISTICS_REPORT_TYPE,
  LogisticsReportTypeCategory,
  LogisticsReportTypeScope,
  LogisticsReportTypeDataSource,
  LogisticsReportTypeLayout,
  LogisticsReportTypeGrouping,
  LogisticsReportTypeTimeRange,
  logisticsReportTypeGetCategoryLabel,
  logisticsReportTypeGetScopeLabel,
  logisticsReportTypeGetDataSourceLabel,
  logisticsReportTypeGetLayoutLabel,
  logisticsReportTypeGetGroupingLabel,
  logisticsReportTypeGetTimeRangeLabel,
  // Logistics Report Status Constants
  LOGISTICS_REPORT_STATUS,
  LogisticsReportStatusType,
  LogisticsReportStatusCategory,
  LogisticsReportStatusColor,
  LogisticsReportStatusIcon,
  LogisticsReportStatusTransition,
  logisticsReportStatusGetLabel,
  logisticsReportStatusGetCategory,
  logisticsReportStatusIsComplete,
  logisticsReportStatusIsActive,
  logisticsReportStatusCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Logistics Report Extended Types
// ============================================================

/**
 * Logistics report
 */
export interface LogisticsReport extends BaseEntity, Timestamp {
  id: ID;
  type: LogisticsReportType;
  status: LogisticsReportStatusType;
  format: LogisticsReportFormat;
  frequency: LogisticsReportFrequency;
  priority: LogisticsReportPriority;
  deliveryMethod: LogisticsReportDeliveryMethod;
  category: LogisticsReportCategory;
  categoryType: LogisticsReportTypeCategory;
  scope: LogisticsReportTypeScope;
  dataSource: LogisticsReportTypeDataSource;
  layout: LogisticsReportTypeLayout;
  grouping: LogisticsReportTypeGrouping;
  timeRange: LogisticsReportTypeTimeRange;
  name: string;
  description?: string;
  fileUrl?: string;
  fileSize?: number;
  isCompleted: boolean;
  isFailed: boolean;
  isPending: boolean;
  generatedAt?: Date;
  deliveredAt?: Date;
  metadata?: Metadata;
}

/**
 * Logistics report filter
 */
export interface LogisticsReportFilter {
  ids?: ID[];
  types?: LogisticsReportType[];
  statuses?: LogisticsReportStatusType[];
  formats?: LogisticsReportFormat[];
  frequencies?: LogisticsReportFrequency[];
  priorities?: LogisticsReportPriority[];
  deliveryMethods?: LogisticsReportDeliveryMethod[];
  categories?: LogisticsReportCategory[];
  categoryTypes?: LogisticsReportTypeCategory[];
  scopes?: LogisticsReportTypeScope[];
  dataSources?: LogisticsReportTypeDataSource[];
  layouts?: LogisticsReportTypeLayout[];
  groupings?: LogisticsReportTypeGrouping[];
  timeRanges?: LogisticsReportTypeTimeRange[];
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
 * Logistics report statistics
 */
export interface LogisticsReportStatistics {
  totalReports: number;
  completedReports: number;
  failedReports: number;
  pendingReports: number;
  byType: Record<LogisticsReportType, number>;
  byStatus: Record<LogisticsReportStatusType, number>;
  byFormat: Record<LogisticsReportFormat, number>;
  byFrequency: Record<LogisticsReportFrequency, number>;
  byPriority: Record<LogisticsReportPriority, number>;
  byDeliveryMethod: Record<LogisticsReportDeliveryMethod, number>;
  byCategory: Record<LogisticsReportCategory, number>;
  byCategoryType: Record<LogisticsReportTypeCategory, number>;
  byScope: Record<LogisticsReportTypeScope, number>;
  byDataSource: Record<LogisticsReportTypeDataSource, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageFileSize: number;
  maxFileSize: number;
  minFileSize: number;
  mostFrequentType: LogisticsReportType;
  mostFrequentStatus: LogisticsReportStatusType;
  mostFrequentFormat: LogisticsReportFormat;
  mostFrequentFrequency: LogisticsReportFrequency;
}

/**
 * Logistics report summary
 */
export interface LogisticsReportSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalReports: number;
  completed: number;
  failed: number;
  pending: number;
  byType: Record<LogisticsReportType, number>;
  byStatus: Record<LogisticsReportStatusType, number>;
  byFormat: Record<LogisticsReportFormat, number>;
  byFrequency: Record<LogisticsReportFrequency, number>;
  byPriority: Record<LogisticsReportPriority, number>;
  byDeliveryMethod: Record<LogisticsReportDeliveryMethod, number>;
  byCategory: Record<LogisticsReportCategory, number>;
  byCategoryType: Record<LogisticsReportTypeCategory, number>;
  byScope: Record<LogisticsReportTypeScope, number>;
  byDataSource: Record<LogisticsReportTypeDataSource, number>;
  reportTrend: {
    date: Date;
    total: number;
    completed: number;
    failed: number;
  }[];
  topTypes: {
    type: LogisticsReportType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: LogisticsReportStatusType;
    count: number;
    label: string;
  }[];
  topFormats: {
    format: LogisticsReportFormat;
    count: number;
    label: string;
  }[];
  topFrequencies: {
    frequency: LogisticsReportFrequency;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    completionRate: number;
    failureRate: number;
    pendingRate: number;
  };
}

/**
 * Logistics report configuration
 */
export interface LogisticsReportConfiguration {
  enabled: boolean;
  defaultType: LogisticsReportType;
  defaultFormat: LogisticsReportFormat;
  defaultFrequency: LogisticsReportFrequency;
  defaultPriority: LogisticsReportPriority;
  defaultDeliveryMethod: LogisticsReportDeliveryMethod;
  defaultCategory: LogisticsReportCategory;
  defaultCategoryType: LogisticsReportTypeCategory;
  defaultScope: LogisticsReportTypeScope;
  defaultDataSource: LogisticsReportTypeDataSource;
  defaultLayout: LogisticsReportTypeLayout;
  defaultGrouping: LogisticsReportTypeGrouping;
  defaultTimeRange: LogisticsReportTypeTimeRange;
  retentionDays: number;
  maxFileSize: number;
  autoGenerate: boolean;
  autoDeliver: boolean;
  notificationOnComplete: boolean;
  notificationOnFailed: boolean;
  notificationOnPending: boolean;
  alertConfig?: LogisticsReportAlertConfig;
}

/**
 * Logistics report alert configuration
 */
export interface LogisticsReportAlertConfig {
  enabled: boolean;
  failureAlert: boolean;
  pendingAlert: boolean;
  pendingThreshold: number;
  deliveryDelayAlert: boolean;
  deliveryDelayThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Logistics report history
 */
export interface LogisticsReportHistory extends BaseEntity, Timestamp {
  id: ID;
  reportId: ID;
  action: 'create' | 'generate' | 'deliver' | 'complete' | 'fail' | 'archive' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Logistics report validation
 */
export interface LogisticsReportValidation {
  isValid: boolean;
  reportId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Logistics report export
 */
export interface LogisticsReportExport extends BaseEntity, Timestamp {
  id: ID;
  format: LogisticsReportFormat;
  filter: LogisticsReportFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Logistics Report Constants
  LOGISTICS_REPORT,
  LogisticsReportType,
  LogisticsReportStatus,
  LogisticsReportFormat,
  LogisticsReportFrequency,
  LogisticsReportPriority,
  LogisticsReportDeliveryMethod,
  LogisticsReportCategory,
  logisticsReportGetTypeLabel,
  logisticsReportGetStatusLabel,
  logisticsReportGetFormatLabel,
  logisticsReportGetFrequencyLabel,
  logisticsReportGetPriorityLabel,
  logisticsReportGetDeliveryMethodLabel,
  logisticsReportIsCompleted,
  logisticsReportIsFailed,
  logisticsReportIsPending,
  logisticsReportGetCategoryLabel,
  // Logistics Report Type Constants
  LOGISTICS_REPORT_TYPE,
  LogisticsReportTypeCategory,
  LogisticsReportTypeScope,
  LogisticsReportTypeDataSource,
  LogisticsReportTypeLayout,
  LogisticsReportTypeGrouping,
  LogisticsReportTypeTimeRange,
  logisticsReportTypeGetCategoryLabel,
  logisticsReportTypeGetScopeLabel,
  logisticsReportTypeGetDataSourceLabel,
  logisticsReportTypeGetLayoutLabel,
  logisticsReportTypeGetGroupingLabel,
  logisticsReportTypeGetTimeRangeLabel,
  // Logistics Report Status Constants
  LOGISTICS_REPORT_STATUS,
  LogisticsReportStatusType,
  LogisticsReportStatusCategory,
  LogisticsReportStatusColor,
  LogisticsReportStatusIcon,
  LogisticsReportStatusTransition,
  logisticsReportStatusGetLabel,
  logisticsReportStatusGetCategory,
  logisticsReportStatusIsComplete,
  logisticsReportStatusIsActive,
  logisticsReportStatusCanTransition,
};
