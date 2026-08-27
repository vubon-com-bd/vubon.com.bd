/**
 * Report Types
 * Type definitions for reporting module based on shared-constants
 * @module ReportTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants reporting
// ============================================================
import {
  // Reporting Core
  REPORTING,
  ReportingCategory,
  ReportingDeliveryMethod,
  ReportingScheduleType,
  ReportingTimePeriod,
  ReportingGrouping,
  ReportingAggregation,
  ReportingChartType,
  ReportingDataSource,
  ReportingTimezone,
  ReportingLanguage,
  ReportingDefault,
  ReportingLimit,
  getReportingCategoryLabel,
  getReportingScheduleTypeLabel,
  getReportingTimePeriodLabel,
  getReportingChartTypeLabel,
  getReportingAggregationLabel,
  getReportingDeliveryMethodLabel,
  isValidScheduleType,
  isValidTimePeriod,
  isValidChartType,
  getDefaultTimezone,
  getDefaultLanguage,
  getMaxPageSize,
  getDefaultPageSize,
  // Report Type
  REPORT_TYPE,
  ReportTypeType,
  ReportSubType,
  ReportScope,
  ReportAccessLevel,
  getReportTypeLabel,
  getReportSubTypeLabel,
  getReportScopeLabel,
  getReportAccessLevelLabel,
  isSalesReport,
  isFinancialReport,
  isCustomerReport,
  // Report Format
  REPORT_FORMAT,
  ReportFormatType,
  ReportFileExtension,
  ReportMimeType,
  ReportPrintQuality,
  ReportPageSize,
  ReportOrientation,
  ReportCompression,
  ReportFontSize,
  ReportFontFamily,
  ReportColor,
  getReportFormatExtension,
  getReportFormatMimeType,
  getReportFormatLabel,
  getReportPageSizeLabel,
  getReportOrientationLabel,
  isImageFormat,
  isSpreadsheetFormat,
  isDocumentFormat,
  // Report Status
  REPORT_STATUS,
  ReportGenerationStatus,
  ReportDeliveryStatus,
  ReportProcessingStatus,
  ReportScheduleStatus,
  ReportValidationStatus,
  ReportStatusColor,
  getReportGenerationStatusLabel,
  getReportDeliveryStatusLabel,
  getReportProcessingStatusLabel,
  getReportScheduleStatusLabel,
  getReportStatusColor,
  isReportComplete,
  isReportPending,
  isReportInProgress,
  isReportDelivered,
  isScheduleActive,
  // Report Priority
  REPORT_PRIORITY,
  ReportPriorityLevel,
  ReportPriorityScore,
  ReportPriorityColor,
  ReportSLATarget,
  ReportEscalationLevel,
  getReportPriorityLabel,
  getReportPriorityScore,
  getReportPriorityColor,
  getReportSLATarget,
  getReportEscalationLevel,
  getEscalationLevelLabel,
  isPriorityAboveThreshold,
  shouldEscalateReport,
  getPriorityFromScore,
  // Report Permission
  REPORT_PERMISSION_ACTIONS,
  REPORT_PERMISSION_ROLES,
  REPORT_PERMISSION_CATEGORIES,
  REPORT_PERMISSION_LEVELS,
  REPORT_PERMISSION_SCOPES,
  REPORT_PERMISSION_RESOURCES,
  REPORT_PERMISSION_DEFAULTS,
  REPORT_PERMISSION_MESSAGES,
  ReportPermissionAction,
  ReportPermissionRole,
  ReportPermissionCategory,
  ReportPermissionLevel,
  ReportPermissionScope,
  ReportPermissionResource,
  reportPermissionGetCategoryLabel,
  reportPermissionGetLevelLabel,
  reportPermissionGetScopeLabel,
  reportPermissionGetResourceLabel,
  reportPermissionGetRoleLabel,
  reportPermissionGetDefaultPermissions,
  reportPermissionGetDefaultLevel,
  reportPermissionIsValidRole,
  reportPermissionIsValidAction,
  reportPermissionIsValidResource,
  reportPermissionHasAction,
  reportPermissionHasAnyAction,
  reportPermissionHasAllActions,
  reportPermissionGetRoleFromLevel,
  reportPermissionGetLevelFromRole,
  reportPermissionGetMessage,
  reportPermissionIsAdmin,
  reportPermissionCanManageUsers,
  reportPermissionCanManageSettings,
  // Report Error
  REPORT_ERROR,
  ReportErrorCategory,
  ReportErrorCode,
  ReportErrorSeverity,
  ReportRecoveryAction,
  reportErrorGetCategoryLabel,
  reportErrorGetSeverityLabel,
  reportErrorGetMessage,
  reportErrorGetCategory,
  reportErrorGetSeverity,
  reportErrorShouldRetry,
  reportErrorGetRecoveryAction,
  reportErrorGetMaxRetries,
  reportErrorGetRetryDelay,
  reportErrorIsValidCode,
  reportErrorIsValidSeverity,
  reportErrorGetRecoveryActionLabel,
  reportErrorIsFatal,
} from '@vubon/shared-constants';

// ============================================================
// Report Extended Types
// ============================================================

/**
 * Report
 */
export interface Report extends BaseEntity, Timestamp {
  id: ID;
  name: string;
  description?: string;
  type: ReportTypeType;
  subType: ReportSubType;
  scope: ReportScope;
  accessLevel: ReportAccessLevel;
  category: ReportingCategory;
  format: ReportFormatType;
  status: ReportGenerationStatus;
  priority: ReportPriorityLevel;
  scheduleType: ReportingScheduleType;
  timePeriod: ReportingTimePeriod;
  timezone: ReportingTimezone;
  language: ReportingLanguage;
  fileUrl?: string;
  fileSize?: number;
  pageCount?: number;
  isComplete: boolean;
  isPending: boolean;
  isInProgress: boolean;
  isDelivered: boolean;
  metadata?: Metadata;
}

/**
 * Report Filter
 */
export interface ReportFilter {
  ids?: ID[];
  types?: ReportTypeType[];
  subTypes?: ReportSubType[];
  scopes?: ReportScope[];
  accessLevels?: ReportAccessLevel[];
  categories?: ReportingCategory[];
  formats?: ReportFormatType[];
  statuses?: ReportGenerationStatus[];
  priorities?: ReportPriorityLevel[];
  scheduleTypes?: ReportingScheduleType[];
  timePeriods?: ReportingTimePeriod[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isComplete?: boolean;
  isPending?: boolean;
  isInProgress?: boolean;
  isDelivered?: boolean;
  searchTerm?: string;
}

/**
 * Report Statistics
 */
export interface ReportStatistics {
  totalReports: number;
  completeReports: number;
  pendingReports: number;
  inProgressReports: number;
  deliveredReports: number;
  byType: Record<ReportTypeType, number>;
  bySubType: Record<ReportSubType, number>;
  byCategory: Record<ReportingCategory, number>;
  byFormat: Record<ReportFormatType, number>;
  byStatus: Record<ReportGenerationStatus, number>;
  byPriority: Record<ReportPriorityLevel, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageFileSize: number;
  maxFileSize: number;
  minFileSize: number;
  averagePageCount: number;
  maxPageCount: number;
  minPageCount: number;
  mostFrequentType: ReportTypeType;
  mostFrequentCategory: ReportingCategory;
  mostFrequentFormat: ReportFormatType;
}

/**
 * Report Summary
 */
export interface ReportSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalReports: number;
  complete: number;
  pending: number;
  inProgress: number;
  delivered: number;
  byType: Record<ReportTypeType, number>;
  bySubType: Record<ReportSubType, number>;
  byCategory: Record<ReportingCategory, number>;
  byFormat: Record<ReportFormatType, number>;
  byStatus: Record<ReportGenerationStatus, number>;
  byPriority: Record<ReportPriorityLevel, number>;
  reportTrend: {
    date: Date;
    total: number;
    complete: number;
    delivered: number;
  }[];
  topTypes: {
    type: ReportTypeType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: ReportingCategory;
    count: number;
    label: string;
  }[];
  topFormats: {
    format: ReportFormatType;
    count: number;
    label: string;
  }[];
}

/**
 * Report Configuration
 */
export interface ReportConfiguration {
  enabled: boolean;
  defaultType: ReportTypeType;
  defaultSubType: ReportSubType;
  defaultScope: ReportScope;
  defaultCategory: ReportingCategory;
  defaultFormat: ReportFormatType;
  defaultPriority: ReportPriorityLevel;
  defaultScheduleType: ReportingScheduleType;
  defaultTimePeriod: ReportingTimePeriod;
  defaultTimezone: ReportingTimezone;
  defaultLanguage: ReportingLanguage;
  maxPageSize: number;
  defaultPageSize: number;
  requireApproval: boolean;
  autoGenerate: boolean;
  autoDeliver: boolean;
  maxRetries: number;
  retryDelay: number;
  notificationOnComplete: boolean;
  notificationOnPending: boolean;
  notificationOnInProgress: boolean;
  notificationOnDelivered: boolean;
  notificationOnError: boolean;
  alertConfig?: ReportAlertConfig;
}

/**
 * Report Alert Configuration
 */
export interface ReportAlertConfig {
  enabled: boolean;
  highPriorityAlert: boolean;
  failureAlert: boolean;
  delayAlert: boolean;
  delayThreshold: number;
  escalationAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Report History
 */
export interface ReportHistory extends BaseEntity, Timestamp {
  id: ID;
  reportId: ID;
  action:
    | 'create'
    | 'update'
    | 'generate'
    | 'deliver'
    | 'complete'
    | 'fail'
    | 'retry'
    | 'cancel'
    | 'archive'
    | 'delete'
    | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Report Validation
 */
export interface ReportValidation {
  isValid: boolean;
  reportId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Report Export
 */
export interface ReportExport extends BaseEntity, Timestamp {
  id: ID;
  reportId: ID;
  format: ReportFormatType;
  filter: ReportFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Report Schedule
 */
export interface ReportSchedule extends BaseEntity, Timestamp {
  id: ID;
  reportId: ID;
  scheduleType: ReportingScheduleType;
  timePeriod: ReportingTimePeriod;
  timezone: ReportingTimezone;
  startDate: Date;
  endDate?: Date;
  nextRunAt: Date;
  lastRunAt?: Date;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Report Delivery
 */
export interface ReportDelivery extends BaseEntity, Timestamp {
  id: ID;
  reportId: ID;
  method: ReportingDeliveryMethod;
  recipient: string;
  deliveredAt: Date;
  status: ReportDeliveryStatus;
  metadata?: Metadata;
}

/**
 * Report Permission
 */
export interface ReportPermission extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  role: ReportPermissionRole;
  level: ReportPermissionLevel;
  scope: ReportPermissionScope;
  resources: ReportPermissionResource[];
  actions: ReportPermissionAction[];
  isAdmin: boolean;
  canManageUsers: boolean;
  canManageSettings: boolean;
  metadata?: Metadata;
}

/**
 * Report Error
 */
export interface ReportError extends BaseEntity, Timestamp {
  id: ID;
  reportId: ID;
  code: ReportErrorCode;
  category: ReportErrorCategory;
  severity: ReportErrorSeverity;
  message: string;
  recoveryAction: ReportRecoveryAction;
  retryCount: number;
  maxRetries: number;
  isFatal: boolean;
  shouldRetry: boolean;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Reporting Core
  REPORTING,
  ReportingCategory,
  ReportingDeliveryMethod,
  ReportingScheduleType,
  ReportingTimePeriod,
  ReportingGrouping,
  ReportingAggregation,
  ReportingChartType,
  ReportingDataSource,
  ReportingTimezone,
  ReportingLanguage,
  ReportingDefault,
  ReportingLimit,
  getReportingCategoryLabel,
  getReportingScheduleTypeLabel,
  getReportingTimePeriodLabel,
  getReportingChartTypeLabel,
  getReportingAggregationLabel,
  getReportingDeliveryMethodLabel,
  isValidScheduleType,
  isValidTimePeriod,
  isValidChartType,
  getDefaultTimezone,
  getDefaultLanguage,
  getMaxPageSize,
  getDefaultPageSize,
  // Report Type
  REPORT_TYPE,
  ReportTypeType,
  ReportSubType,
  ReportScope,
  ReportAccessLevel,
  getReportTypeLabel,
  getReportSubTypeLabel,
  getReportScopeLabel,
  getReportAccessLevelLabel,
  isSalesReport,
  isFinancialReport,
  isCustomerReport,
  // Report Format
  REPORT_FORMAT,
  ReportFormatType,
  ReportFileExtension,
  ReportMimeType,
  ReportPrintQuality,
  ReportPageSize,
  ReportOrientation,
  ReportCompression,
  ReportFontSize,
  ReportFontFamily,
  ReportColor,
  getReportFormatExtension,
  getReportFormatMimeType,
  getReportFormatLabel,
  getReportPageSizeLabel,
  getReportOrientationLabel,
  isImageFormat,
  isSpreadsheetFormat,
  isDocumentFormat,
  // Report Status
  REPORT_STATUS,
  ReportGenerationStatus,
  ReportDeliveryStatus,
  ReportProcessingStatus,
  ReportScheduleStatus,
  ReportValidationStatus,
  ReportStatusColor,
  getReportGenerationStatusLabel,
  getReportDeliveryStatusLabel,
  getReportProcessingStatusLabel,
  getReportScheduleStatusLabel,
  getReportStatusColor,
  isReportComplete,
  isReportPending,
  isReportInProgress,
  isReportDelivered,
  isScheduleActive,
  // Report Priority
  REPORT_PRIORITY,
  ReportPriorityLevel,
  ReportPriorityScore,
  ReportPriorityColor,
  ReportSLATarget,
  ReportEscalationLevel,
  getReportPriorityLabel,
  getReportPriorityScore,
  getReportPriorityColor,
  getReportSLATarget,
  getReportEscalationLevel,
  getEscalationLevelLabel,
  isPriorityAboveThreshold,
  shouldEscalateReport,
  getPriorityFromScore,
  // Report Permission
  REPORT_PERMISSION_ACTIONS,
  REPORT_PERMISSION_ROLES,
  REPORT_PERMISSION_CATEGORIES,
  REPORT_PERMISSION_LEVELS,
  REPORT_PERMISSION_SCOPES,
  REPORT_PERMISSION_RESOURCES,
  REPORT_PERMISSION_DEFAULTS,
  REPORT_PERMISSION_MESSAGES,
  ReportPermissionAction,
  ReportPermissionRole,
  ReportPermissionCategory,
  ReportPermissionLevel,
  ReportPermissionScope,
  ReportPermissionResource,
  reportPermissionGetCategoryLabel,
  reportPermissionGetLevelLabel,
  reportPermissionGetScopeLabel,
  reportPermissionGetResourceLabel,
  reportPermissionGetRoleLabel,
  reportPermissionGetDefaultPermissions,
  reportPermissionGetDefaultLevel,
  reportPermissionIsValidRole,
  reportPermissionIsValidAction,
  reportPermissionIsValidResource,
  reportPermissionHasAction,
  reportPermissionHasAnyAction,
  reportPermissionHasAllActions,
  reportPermissionGetRoleFromLevel,
  reportPermissionGetLevelFromRole,
  reportPermissionGetMessage,
  reportPermissionIsAdmin,
  reportPermissionCanManageUsers,
  reportPermissionCanManageSettings,
  // Report Error
  REPORT_ERROR,
  ReportErrorCategory,
  ReportErrorCode,
  ReportErrorSeverity,
  ReportRecoveryAction,
  reportErrorGetCategoryLabel,
  reportErrorGetSeverityLabel,
  reportErrorGetMessage,
  reportErrorGetCategory,
  reportErrorGetSeverity,
  reportErrorShouldRetry,
  reportErrorGetRecoveryAction,
  reportErrorGetMaxRetries,
  reportErrorGetRetryDelay,
  reportErrorIsValidCode,
  reportErrorIsValidSeverity,
  reportErrorGetRecoveryActionLabel,
  reportErrorIsFatal,
};
