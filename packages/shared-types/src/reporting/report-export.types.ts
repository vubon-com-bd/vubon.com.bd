/**
 * Report Export Types
 * Type definitions for report exports based on shared-constants
 * @module ReportExportTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants reporting report-export
// ============================================================
import {
  // Export Core
  REPORT_EXPORT,
  ReportExportFormat,
  ReportExportType,
  ReportExportMethod,
  ReportExportCompression,
  ReportExportEncryption,
  ReportExportPageSize,
  ReportExportOrientation,
  ReportExportQuality,
  ReportExportDPI,
  ReportExportNaming,
  reportExportGetFormatLabel,
  reportExportGetTypeLabel,
  reportExportGetMethodLabel,
  reportExportGetCompressionLabel,
  reportExportGetEncryptionLabel,
  reportExportGetPageSizeLabel,
  reportExportGetOrientationLabel,
  reportExportGetQualityLabel,
  reportExportGetFileExtension,
  reportExportGetMimeType,
  reportExportGetMaxSize,
  reportExportGetTimeout,
  reportExportIsValidFormat,
  reportExportIsValidMethod,
  reportExportGetDefaultFormat,
  reportExportGetDefaultMethod,
  reportExportGetDefaultQuality,
  reportExportGenerateFileName,
  // Export Type
  REPORT_EXPORT_TYPE,
  ReportExportTypeCategory,
  ReportExportTypeComplexity,
  ReportExportTypeScope,
  ReportExportTypeFrequency,
  ReportExportTypePriority,
  ReportExportTypeSecurity,
  ReportExportTypeValidation,
  ReportExportTypeRetention,
  reportExportTypeGetCategoryLabel,
  reportExportTypeGetComplexityLabel,
  reportExportTypeGetScopeLabel,
  reportExportTypeGetFrequencyLabel,
  reportExportTypeGetPriorityLabel,
  reportExportTypeGetSecurityLabel,
  reportExportTypeGetValidationLabel,
  reportExportTypeGetRetentionLabel,
  reportExportTypeIsValidCategory,
  reportExportTypeIsValidFrequency,
  // Export Status
  REPORT_EXPORT_STATUS,
  ReportExportStatusType,
  ReportExportStatusCategory,
  ReportExportStatusColor,
  ReportExportStatusPriority,
  ReportExportDeliveryStatus,
  ReportExportProgress,
  ReportExportErrorType,
  reportExportStatusGetLabel,
  reportExportStatusGetCategory,
  reportExportStatusGetColor,
  reportExportStatusGetPriority,
  reportExportStatusIsComplete,
  reportExportStatusIsFailed,
  reportExportStatusIsInProgress,
  reportExportStatusCanTransitionTo,
  reportExportStatusGetAvailableTransitions,
  reportExportStatusGetProgress,
  reportExportStatusGetErrorLabel,
  reportExportStatusIsValid,
  reportExportStatusIsValidErrorType,
} from '@vubon/shared-constants';

// ============================================================
// Report Export Extended Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Report Export Filter
 */
export interface ReportExportFilter {
  ids?: ID[];
  reportIds?: ID[];
  formats?: ReportExportFormat[];
  types?: ReportExportType[];
  methods?: ReportExportMethod[];
  compressions?: ReportExportCompression[];
  encryptions?: ReportExportEncryption[];
  pageSizes?: ReportExportPageSize[];
  orientations?: ReportExportOrientation[];
  qualities?: ReportExportQuality[];
  categories?: ReportExportTypeCategory[];
  complexities?: ReportExportTypeComplexity[];
  scopes?: ReportExportTypeScope[];
  frequencies?: ReportExportTypeFrequency[];
  priorities?: ReportExportTypePriority[];
  securities?: ReportExportTypeSecurity[];
  validations?: ReportExportTypeValidation[];
  retentions?: ReportExportTypeRetention[];
  statuses?: ReportExportStatusType[];
  deliveryStatuses?: ReportExportDeliveryStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isComplete?: boolean;
  isFailed?: boolean;
  isInProgress?: boolean;
  minFileSize?: number;
  maxFileSize?: number;
  searchTerm?: string;
}

/**
 * Report Export Statistics
 */
export interface ReportExportStatistics {
  reportId: ID;
  totalExports: number;
  completeExports: number;
  failedExports: number;
  inProgressExports: number;
  byFormat: Record<ReportExportFormat, number>;
  byType: Record<ReportExportType, number>;
  byMethod: Record<ReportExportMethod, number>;
  byCompression: Record<ReportExportCompression, number>;
  byEncryption: Record<ReportExportEncryption, number>;
  byPageSize: Record<ReportExportPageSize, number>;
  byOrientation: Record<ReportExportOrientation, number>;
  byQuality: Record<ReportExportQuality, number>;
  byCategory: Record<ReportExportTypeCategory, number>;
  byComplexity: Record<ReportExportTypeComplexity, number>;
  byScope: Record<ReportExportTypeScope, number>;
  byFrequency: Record<ReportExportTypeFrequency, number>;
  byPriority: Record<ReportExportTypePriority, number>;
  bySecurity: Record<ReportExportTypeSecurity, number>;
  byValidation: Record<ReportExportTypeValidation, number>;
  byRetention: Record<ReportExportTypeRetention, number>;
  byStatus: Record<ReportExportStatusType, number>;
  byDeliveryStatus: Record<ReportExportDeliveryStatus, number>;
  byErrorType: Record<ReportExportErrorType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageFileSize: number;
  maxFileSize: number;
  minFileSize: number;
  averageProgress: number;
  mostFrequentFormat: ReportExportFormat;
  mostFrequentType: ReportExportType;
  mostFrequentStatus: ReportExportStatusType;
}

/**
 * Report Export Summary
 */
export interface ReportExportSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalExports: number;
  complete: number;
  failed: number;
  inProgress: number;
  byFormat: Record<ReportExportFormat, number>;
  byType: Record<ReportExportType, number>;
  byMethod: Record<ReportExportMethod, number>;
  byCompression: Record<ReportExportCompression, number>;
  byEncryption: Record<ReportExportEncryption, number>;
  byPageSize: Record<ReportExportPageSize, number>;
  byOrientation: Record<ReportExportOrientation, number>;
  byQuality: Record<ReportExportQuality, number>;
  byCategory: Record<ReportExportTypeCategory, number>;
  byComplexity: Record<ReportExportTypeComplexity, number>;
  byScope: Record<ReportExportTypeScope, number>;
  byFrequency: Record<ReportExportTypeFrequency, number>;
  byPriority: Record<ReportExportTypePriority, number>;
  bySecurity: Record<ReportExportTypeSecurity, number>;
  byValidation: Record<ReportExportTypeValidation, number>;
  byRetention: Record<ReportExportTypeRetention, number>;
  byStatus: Record<ReportExportStatusType, number>;
  byDeliveryStatus: Record<ReportExportDeliveryStatus, number>;
  byErrorType: Record<ReportExportErrorType, number>;
  exportTrend: {
    date: Date;
    total: number;
    complete: number;
    failed: number;
  }[];
  topFormats: {
    format: ReportExportFormat;
    count: number;
    label: string;
  }[];
  topTypes: {
    type: ReportExportType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: ReportExportStatusType;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    averageFileSize: number;
    maxFileSize: number;
    minFileSize: number;
    averageProgress: number;
    successRate: number;
    failureRate: number;
  };
}

/**
 * Report Export Configuration
 */
export interface ReportExportConfiguration {
  enabled: boolean;
  defaultFormat: ReportExportFormat;
  defaultType: ReportExportType;
  defaultMethod: ReportExportMethod;
  defaultCompression: ReportExportCompression;
  defaultEncryption: ReportExportEncryption;
  defaultPageSize: ReportExportPageSize;
  defaultOrientation: ReportExportOrientation;
  defaultQuality: ReportExportQuality;
  maxSize: number;
  timeout: number;
  requireApproval: boolean;
  allowCustomization: boolean;
  allowScheduling: boolean;
  autoExport: boolean;
  notificationOnCreate: boolean;
  notificationOnComplete: boolean;
  notificationOnFailed: boolean;
  notificationOnInProgress: boolean;
  alertConfig?: ReportExportAlertConfig;
}

/**
 * Report Export Alert Configuration
 */
export interface ReportExportAlertConfig {
  enabled: boolean;
  failureAlert: boolean;
  failureThreshold: number;
  sizeLimitAlert: boolean;
  sizeLimitThreshold: number;
  timeoutAlert: boolean;
  timeoutThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Report Export History
 */
export interface ReportExportHistory extends BaseEntity, Timestamp {
  id: ID;
  exportId: ID;
  reportId: ID;
  action:
    'create' | 'update' | 'start' | 'complete' | 'fail' | 'retry' | 'cancel' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Report Export Validation
 */
export interface ReportExportValidation {
  isValid: boolean;
  exportId: ID;
  reportId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Report Export Delivery
 */
export interface ReportExportDelivery extends BaseEntity, Timestamp {
  id: ID;
  exportId: ID;
  reportId: ID;
  method: ReportExportMethod;
  recipient: string;
  deliveredAt: Date;
  status: ReportExportDeliveryStatus;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Export Core
  REPORT_EXPORT,
  ReportExportFormat,
  ReportExportType,
  ReportExportMethod,
  ReportExportCompression,
  ReportExportEncryption,
  ReportExportPageSize,
  ReportExportOrientation,
  ReportExportQuality,
  ReportExportDPI,
  ReportExportNaming,
  reportExportGetFormatLabel,
  reportExportGetTypeLabel,
  reportExportGetMethodLabel,
  reportExportGetCompressionLabel,
  reportExportGetEncryptionLabel,
  reportExportGetPageSizeLabel,
  reportExportGetOrientationLabel,
  reportExportGetQualityLabel,
  reportExportGetFileExtension,
  reportExportGetMimeType,
  reportExportGetMaxSize,
  reportExportGetTimeout,
  reportExportIsValidFormat,
  reportExportIsValidMethod,
  reportExportGetDefaultFormat,
  reportExportGetDefaultMethod,
  reportExportGetDefaultQuality,
  reportExportGenerateFileName,
  // Export Type
  REPORT_EXPORT_TYPE,
  ReportExportTypeCategory,
  ReportExportTypeComplexity,
  ReportExportTypeScope,
  ReportExportTypeFrequency,
  ReportExportTypePriority,
  ReportExportTypeSecurity,
  ReportExportTypeValidation,
  ReportExportTypeRetention,
  reportExportTypeGetCategoryLabel,
  reportExportTypeGetComplexityLabel,
  reportExportTypeGetScopeLabel,
  reportExportTypeGetFrequencyLabel,
  reportExportTypeGetPriorityLabel,
  reportExportTypeGetSecurityLabel,
  reportExportTypeGetValidationLabel,
  reportExportTypeGetRetentionLabel,
  reportExportTypeIsValidCategory,
  reportExportTypeIsValidFrequency,
  // Export Status
  REPORT_EXPORT_STATUS,
  ReportExportStatusType,
  ReportExportStatusCategory,
  ReportExportStatusColor,
  ReportExportStatusPriority,
  ReportExportDeliveryStatus,
  ReportExportProgress,
  ReportExportErrorType,
  reportExportStatusGetLabel,
  reportExportStatusGetCategory,
  reportExportStatusGetColor,
  reportExportStatusGetPriority,
  reportExportStatusIsComplete,
  reportExportStatusIsFailed,
  reportExportStatusIsInProgress,
  reportExportStatusCanTransitionTo,
  reportExportStatusGetAvailableTransitions,
  reportExportStatusGetProgress,
  reportExportStatusGetErrorLabel,
  reportExportStatusIsValid,
  reportExportStatusIsValidErrorType,
};
