/**
 * Vendor Report Types
 * Type definitions for vendor reports based on shared-constants
 * @module VendorReportTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants vendor report
// ============================================================
import {
  // Vendor Report
  VENDOR_REPORT,
  VendorReportType,
  VendorReportFormat,
  VendorReportStatus,
  VendorReportFrequency,
  VendorReportPriority,
  VendorReportDelivery,
  vendorReportGetTypeLabel,
  vendorReportGetFormatLabel,
  vendorReportGetStatusLabel,
  vendorReportGetFrequencyLabel,
  vendorReportGetPriorityLabel,
  vendorReportGetDeliveryLabel,
  vendorReportIsCompleted,
  vendorReportIsPending,
  vendorReportIsFailed,
  // Vendor Report Type
  VENDOR_REPORT_TYPE,
  VendorReportTypeCategory,
  VendorReportTypeScope,
  VendorReportTypeSource,
  VendorReportTypeTimeRange,
  VendorReportTypeGrouping,
  vendorReportTypeGetCategoryLabel,
  vendorReportTypeGetScopeLabel,
  vendorReportTypeGetSourceLabel,
  vendorReportTypeGetTimeRangeLabel,
  vendorReportTypeGetGroupingLabel,
  // Vendor Report Status
  VENDOR_REPORT_STATUS,
  VendorReportStatusType,
  VendorReportStatusCategory,
  VendorReportStatusColor,
  VendorReportStatusIcon,
  VendorReportStatusTransition,
  vendorReportStatusGetLabel,
  vendorReportStatusIsCompleted,
  vendorReportStatusIsPending,
  vendorReportStatusIsFailed,
  vendorReportStatusGetCategory,
  vendorReportStatusCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Vendor Report Extended Types
// ============================================================

/**
 * Vendor report
 */
export interface VendorReport extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  type: VendorReportType;
  format: VendorReportFormat;
  status: VendorReportStatusType;
  frequency: VendorReportFrequency;
  priority: VendorReportPriority;
  delivery: VendorReportDelivery;
  name: string;
  description?: string;
  fileUrl?: string;
  fileSize?: number;
  isCompleted: boolean;
  isPending: boolean;
  isFailed: boolean;
  generatedAt?: Date;
  deliveredAt?: Date;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * Vendor report filter
 */
export interface VendorReportFilter {
  ids?: ID[];
  vendorIds?: ID[];
  userIds?: ID[];
  types?: VendorReportType[];
  formats?: VendorReportFormat[];
  statuses?: VendorReportStatusType[];
  frequencies?: VendorReportFrequency[];
  priorities?: VendorReportPriority[];
  deliveries?: VendorReportDelivery[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isCompleted?: boolean;
  isPending?: boolean;
  isFailed?: boolean;
  searchTerm?: string;
  name?: string;
}

/**
 * Vendor report statistics
 */
export interface VendorReportStatistics {
  vendorId: ID;
  totalReports: number;
  completedReports: number;
  pendingReports: number;
  failedReports: number;
  byType: Record<VendorReportType, number>;
  byFormat: Record<VendorReportFormat, number>;
  byStatus: Record<VendorReportStatusType, number>;
  byFrequency: Record<VendorReportFrequency, number>;
  byPriority: Record<VendorReportPriority, number>;
  byDelivery: Record<VendorReportDelivery, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentType: VendorReportType;
  mostFrequentStatus: VendorReportStatusType;
  mostFrequentFrequency: VendorReportFrequency;
  mostFrequentPriority: VendorReportPriority;
  mostFrequentDelivery: VendorReportDelivery;
}

/**
 * Vendor report summary
 */
export interface VendorReportSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalReports: number;
  completed: number;
  pending: number;
  failed: number;
  byType: Record<VendorReportType, number>;
  byFormat: Record<VendorReportFormat, number>;
  byStatus: Record<VendorReportStatusType, number>;
  byFrequency: Record<VendorReportFrequency, number>;
  byPriority: Record<VendorReportPriority, number>;
  byDelivery: Record<VendorReportDelivery, number>;
  reportTrend: {
    date: Date;
    total: number;
    completed: number;
    failed: number;
  }[];
  topTypes: {
    type: VendorReportType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: VendorReportStatusType;
    count: number;
    label: string;
  }[];
  topFrequencies: {
    frequency: VendorReportFrequency;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: VendorReportPriority;
    count: number;
    label: string;
  }[];
  topDeliveries: {
    delivery: VendorReportDelivery;
    count: number;
    label: string;
  }[];
}

/**
 * Vendor report configuration
 */
export interface VendorReportConfiguration {
  enabled: boolean;
  defaultType: VendorReportType;
  defaultFormat: VendorReportFormat;
  defaultFrequency: VendorReportFrequency;
  defaultPriority: VendorReportPriority;
  defaultDelivery: VendorReportDelivery;
  maxRetries: number;
  retryDelayMinutes: number;
  retentionDays: number;
  maxFileSizeMB: number;
  allowedFormats: VendorReportFormat[];
  allowedTypes: VendorReportType[];
  notificationOnGenerated: boolean;
  notificationOnFailed: boolean;
  alertConfig?: VendorReportAlertConfig;
}

/**
 * Vendor report alert configuration
 */
export interface VendorReportAlertConfig {
  enabled: boolean;
  generationFailureAlert: boolean;
  processingTimeoutAlert: boolean;
  highPriorityAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  failureThreshold: number;
}

/**
 * Vendor report history
 */
export interface VendorReportHistory extends BaseEntity, Timestamp {
  id: ID;
  reportId: ID;
  vendorId: ID;
  userId: ID;
  action: 'create' | 'generate' | 'process' | 'deliver' | 'fail' | 'archive' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Vendor report validation
 */
export interface VendorReportValidation {
  isValid: boolean;
  reportId: ID;
  vendorId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Vendor report export
 */
export interface VendorReportExport extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  format: VendorReportFormat;
  filter: VendorReportFilter;
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
  // Vendor Report
  VENDOR_REPORT,
  VendorReportType,
  VendorReportFormat,
  VendorReportStatus,
  VendorReportFrequency,
  VendorReportPriority,
  VendorReportDelivery,
  vendorReportGetTypeLabel,
  vendorReportGetFormatLabel,
  vendorReportGetStatusLabel,
  vendorReportGetFrequencyLabel,
  vendorReportGetPriorityLabel,
  vendorReportGetDeliveryLabel,
  vendorReportIsCompleted,
  vendorReportIsPending,
  vendorReportIsFailed,
  // Vendor Report Type
  VENDOR_REPORT_TYPE,
  VendorReportTypeCategory,
  VendorReportTypeScope,
  VendorReportTypeSource,
  VendorReportTypeTimeRange,
  VendorReportTypeGrouping,
  vendorReportTypeGetCategoryLabel,
  vendorReportTypeGetScopeLabel,
  vendorReportTypeGetSourceLabel,
  vendorReportTypeGetTimeRangeLabel,
  vendorReportTypeGetGroupingLabel,
  // Vendor Report Status
  VENDOR_REPORT_STATUS,
  VendorReportStatusType,
  VendorReportStatusCategory,
  VendorReportStatusColor,
  VendorReportStatusIcon,
  VendorReportStatusTransition,
  vendorReportStatusGetLabel,
  vendorReportStatusIsCompleted,
  vendorReportStatusIsPending,
  vendorReportStatusIsFailed,
  vendorReportStatusGetCategory,
  vendorReportStatusCanTransition,
};
