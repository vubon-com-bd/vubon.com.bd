/**
 * Notification Report Types
 * Type definitions for notification reports based on shared-constants
 * @module NotificationReportTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants notification report
// ============================================================
import {
  // Notification Report
  NOTIFICATIONREPORT,
  NotificationReportType,
  NotificationReportCategory,
  NotificationReportFormat,
  NotificationReportFrequency,
  NotificationReportStatus,
  NotificationReportDeliveryMethod,
  NotificationReportDefault,
  NotificationReportLimit,
  NotificationReportError,
  notificationreportGetTypeLabel,
  notificationreportGetCategoryLabel,
  notificationreportGetFormatLabel,
  notificationreportGetFrequencyLabel,
  notificationreportGetStatusLabel,
  notificationreportGetDeliveryMethodLabel,
  notificationreportGetErrorLabel,
  notificationreportGetDefaultFormat,
  notificationreportGetDefaultFrequency,
  notificationreportGetDefaultDeliveryMethod,
  notificationreportIsCompleted,
  notificationreportIsPending,
  notificationreportIsFailed,
  notificationreportCanTransition,
  // Notification Report Type
  NOTIFICATIONREPORT_TYPE,
  NotificationReportCategoryType,
  NotificationReportSubType,
  NotificationReportScope,
  NotificationReportLevel,
  NotificationReportAudience,
  NotificationReportComplexity,
  notificationReportTypeGetCategoryLabel,
  notificationreportGetSubTypeLabel,
  notificationreportGetScopeLabel,
  notificationreportGetLevelLabel,
  notificationreportGetAudienceLabel,
  notificationreportGetComplexityLabel,
  notificationreportIsExecutiveLevel,
  notificationreportIsOperationalLevel,
  notificationreportIsAnalyticalLevel,
  // Notification Report Status
  NOTIFICATIONREPORT_STATUS,
  NotificationReportStatusType,
  NotificationReportStatusColor,
  NotificationReportStatusCategory,
  NotificationReportStatusOrder,
  NotificationReportStatusTransition,
  notificationReportStatusGetStatusLabel,
  notificationreportGetStatusColor,
  notificationreportGetStatusCategory,
  notificationreportIsPublished,
  notificationReportStatusIsCompleted,
  notificationReportStatusIsPending,
  notificationReportStatusIsFailed,
  notificationReportStatusCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Notification Report Extended Types
// ============================================================

/**
 * Notification Report
 */
export interface NotificationReport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: NotificationReportType;
  category: NotificationReportCategory;
  format: NotificationReportFormat;
  frequency: NotificationReportFrequency;
  status: NotificationReportStatus;
  deliveryMethod: NotificationReportDeliveryMethod;
  title: string;
  description?: string;
  data: Record<string, unknown>;
  isCompleted: boolean;
  isPending: boolean;
  isFailed: boolean;
  isPublished: boolean;
  isExecutiveLevel: boolean;
  isOperationalLevel: boolean;
  isAnalyticalLevel: boolean;
  generatedAt?: Date;
  deliveredAt?: Date;
  publishedAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  metadata?: Metadata;
}

/**
 * Notification Report Filter
 */
export interface NotificationReportFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: NotificationReportType[];
  categories?: NotificationReportCategory[];
  formats?: NotificationReportFormat[];
  frequencies?: NotificationReportFrequency[];
  statuses?: NotificationReportStatus[];
  deliveryMethods?: NotificationReportDeliveryMethod[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isCompleted?: boolean;
  isPending?: boolean;
  isFailed?: boolean;
  isPublished?: boolean;
  isExecutiveLevel?: boolean;
  isOperationalLevel?: boolean;
  isAnalyticalLevel?: boolean;
  searchTerm?: string;
  title?: string;
}

/**
 * Notification Report Statistics
 */
export interface NotificationReportStatistics {
  userId: ID;
  totalReports: number;
  completedReports: number;
  pendingReports: number;
  failedReports: number;
  publishedReports: number;
  byType: Record<NotificationReportType, number>;
  byCategory: Record<NotificationReportCategory, number>;
  byFormat: Record<NotificationReportFormat, number>;
  byFrequency: Record<NotificationReportFrequency, number>;
  byStatus: Record<NotificationReportStatus, number>;
  byDeliveryMethod: Record<NotificationReportDeliveryMethod, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  executiveReports: number;
  operationalReports: number;
  analyticalReports: number;
  successRate: number;
  failureRate: number;
  mostFrequentType: NotificationReportType;
  mostFrequentCategory: NotificationReportCategory;
  mostFrequentFormat: NotificationReportFormat;
  mostFrequentFrequency: NotificationReportFrequency;
  mostFrequentStatus: NotificationReportStatus;
  mostFrequentDeliveryMethod: NotificationReportDeliveryMethod;
}

/**
 * Notification Report Summary
 */
export interface NotificationReportSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalReports: number;
  completed: number;
  pending: number;
  failed: number;
  published: number;
  byType: Record<NotificationReportType, number>;
  byCategory: Record<NotificationReportCategory, number>;
  byFormat: Record<NotificationReportFormat, number>;
  byFrequency: Record<NotificationReportFrequency, number>;
  byStatus: Record<NotificationReportStatus, number>;
  byDeliveryMethod: Record<NotificationReportDeliveryMethod, number>;
  reportTrend: {
    date: Date;
    total: number;
    completed: number;
    failed: number;
  }[];
  topTypes: {
    type: NotificationReportType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: NotificationReportCategory;
    count: number;
    label: string;
  }[];
  topFormats: {
    format: NotificationReportFormat;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: NotificationReportStatus;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    successRate: number;
    failureRate: number;
  };
}

/**
 * Notification Report Configuration
 */
export interface NotificationReportConfiguration {
  enabled: boolean;
  defaultType: NotificationReportType;
  defaultCategory: NotificationReportCategory;
  defaultFormat: NotificationReportFormat;
  defaultFrequency: NotificationReportFrequency;
  defaultDeliveryMethod: NotificationReportDeliveryMethod;
  maxReportsPerUser: number;
  allowExecutiveLevel: boolean;
  allowOperationalLevel: boolean;
  allowAnalyticalLevel: boolean;
  requireTitle: boolean;
  requireDescription: boolean;
  allowScheduling: boolean;
  allowExport: boolean;
  notificationOnCreate: boolean;
  notificationOnComplete: boolean;
  notificationOnFailure: boolean;
  notificationOnPublish: boolean;
  alertConfig?: NotificationReportAlertConfig;
}

/**
 * Notification Report Alert Configuration
 */
export interface NotificationReportAlertConfig {
  enabled: boolean;
  failureAlert: boolean;
  highFailureRateAlert: boolean;
  highFailureRateThreshold: number;
  delayedReportAlert: boolean;
  delayedReportThreshold: number;
  largeReportAlert: boolean;
  largeReportThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Notification Report History
 */
export interface NotificationReportHistory extends BaseEntity, Timestamp {
  id: ID;
  reportId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'generate'
    | 'complete'
    | 'fail'
    | 'publish'
    | 'unpublish'
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
 * Notification Report Validation
 */
export interface NotificationReportValidation {
  isValid: boolean;
  reportId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Notification Report Export
 */
export interface NotificationReportExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx' | 'html';
  filter: NotificationReportFilter;
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
  // Notification Report
  NOTIFICATIONREPORT,
  NotificationReportType,
  NotificationReportCategory,
  NotificationReportFormat,
  NotificationReportFrequency,
  NotificationReportStatus,
  NotificationReportDeliveryMethod,
  NotificationReportDefault,
  NotificationReportLimit,
  NotificationReportError,
  notificationreportGetTypeLabel,
  notificationreportGetCategoryLabel,
  notificationreportGetFormatLabel,
  notificationreportGetFrequencyLabel,
  notificationreportGetStatusLabel,
  notificationreportGetDeliveryMethodLabel,
  notificationreportGetErrorLabel,
  notificationreportGetDefaultFormat,
  notificationreportGetDefaultFrequency,
  notificationreportGetDefaultDeliveryMethod,
  notificationreportIsCompleted,
  notificationreportIsPending,
  notificationreportIsFailed,
  notificationreportCanTransition,
  // Notification Report Type
  NOTIFICATIONREPORT_TYPE,
  NotificationReportCategoryType,
  NotificationReportSubType,
  NotificationReportScope,
  NotificationReportLevel,
  NotificationReportAudience,
  NotificationReportComplexity,
  notificationReportTypeGetCategoryLabel,
  notificationreportGetSubTypeLabel,
  notificationreportGetScopeLabel,
  notificationreportGetLevelLabel,
  notificationreportGetAudienceLabel,
  notificationreportGetComplexityLabel,
  notificationreportIsExecutiveLevel,
  notificationreportIsOperationalLevel,
  notificationreportIsAnalyticalLevel,
  // Notification Report Status
  NOTIFICATIONREPORT_STATUS,
  NotificationReportStatusType,
  NotificationReportStatusColor,
  NotificationReportStatusCategory,
  NotificationReportStatusOrder,
  NotificationReportStatusTransition,
  notificationReportStatusGetStatusLabel,
  notificationreportGetStatusColor,
  notificationreportGetStatusCategory,
  notificationreportIsPublished,
  notificationReportStatusIsCompleted,
  notificationReportStatusIsPending,
  notificationReportStatusIsFailed,
  notificationReportStatusCanTransition,
};
