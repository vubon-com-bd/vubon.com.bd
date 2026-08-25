/**
 * Admin Report Types
 * Type definitions for admin reports based on shared-constants
 * @module AdminReportTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants admin report
// ============================================================
import {
  // Core Report Constants
  ADMIN_REPORT,
  ADMIN_REPORT_TYPE_LABELS,
  ADMIN_REPORT_TYPE_ICONS,
  ADMIN_REPORT_FORMAT_LABELS,
  ADMIN_REPORT_STATUS_LABELS,
  ADMIN_REPORT_STATUS_COLORS,
  ADMIN_REPORT_PRIORITY_LABELS,
  ADMIN_REPORT_PRIORITY_LEVELS,
  ADMIN_REPORT_FREQUENCY_LABELS,
  ADMIN_REPORT_CATEGORY_LABELS,
  ADMIN_REPORT_SCOPE_LABELS,
  ADMIN_REPORT_DELIVERY_LABELS,
  ADMIN_REPORT_TIMEFRAME_LABELS,
  // Core Report Types
  AdminReportType,
  AdminReportFormat,
  AdminReportStatus,
  AdminReportPriority,
  AdminReportFrequency,
  AdminReportCategory,
  AdminReportScope,
  AdminReportDelivery,
  AdminReportTimeframe,
  // Core Report Functions
  getAdminReportTypeLabel,
  getAdminReportTypeIcon,
  getAdminReportFormatLabel,
  getAdminReportStatusLabel,
  getAdminReportStatusColor,
  getAdminReportPriorityLabel,
  getAdminReportPriorityLevel,
  getAdminReportFrequencyLabel,
  getAdminReportCategoryLabel,
  getAdminReportScopeLabel,
  getAdminReportDeliveryLabel,
  getAdminReportTimeframeLabel,
  isReportGenerated,
  isReportProcessing,
  isReportFailed,
  isReportTerminal,
} from '@vubon/shared-constants';

// ============================================================
// Admin Report Extended Types
// ============================================================

/**
 * Admin report with additional metadata
 */
export interface AdminReportExtended extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  type: AdminReportType;
  format: AdminReportFormat;
  status: AdminReportStatus;
  priority: AdminReportPriority;
  frequency: AdminReportFrequency;
  category: AdminReportCategory;
  scope: AdminReportScope;
  delivery: AdminReportDelivery;
  timeframe: AdminReportTimeframe;
  title: string;
  description?: string;
  fileUrl?: string;
  fileSize?: number;
  generatedAt?: Date;
  deliveredAt?: Date;
  expiresAt?: Date;
  isGenerated: boolean;
  isProcessing: boolean;
  isFailed: boolean;
  isTerminal: boolean;
  metadata?: Metadata;
}

/**
 * Admin report filter
 */
export interface AdminReportFilter {
  adminIds?: ID[];
  types?: AdminReportType[];
  formats?: AdminReportFormat[];
  statuses?: AdminReportStatus[];
  priorities?: AdminReportPriority[];
  frequencies?: AdminReportFrequency[];
  categories?: AdminReportCategory[];
  scopes?: AdminReportScope[];
  deliveries?: AdminReportDelivery[];
  timeframes?: AdminReportTimeframe[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isGenerated?: boolean;
  isProcessing?: boolean;
  isFailed?: boolean;
  isTerminal?: boolean;
  searchTerm?: string;
}

/**
 * Admin report statistics
 */
export interface AdminReportStatistics {
  adminId: ID;
  totalReports: number;
  generatedReports: number;
  processingReports: number;
  failedReports: number;
  terminalReports: number;
  byType: Record<AdminReportType, number>;
  byFormat: Record<AdminReportFormat, number>;
  byStatus: Record<AdminReportStatus, number>;
  byPriority: Record<AdminReportPriority, number>;
  byFrequency: Record<AdminReportFrequency, number>;
  byCategory: Record<AdminReportCategory, number>;
  byScope: Record<AdminReportScope, number>;
  byDelivery: Record<AdminReportDelivery, number>;
  byTimeframe: Record<AdminReportTimeframe, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  generationRate: number;
  failureRate: number;
  mostFrequentType: AdminReportType;
  mostFrequentCategory: AdminReportCategory;
  mostFrequentFrequency: AdminReportFrequency;
}

/**
 * Admin report summary
 */
export interface AdminReportSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  generated: number;
  processing: number;
  failed: number;
  terminal: number;
  byType: Record<AdminReportType, number>;
  byFormat: Record<AdminReportFormat, number>;
  byStatus: Record<AdminReportStatus, number>;
  byPriority: Record<AdminReportPriority, number>;
  byFrequency: Record<AdminReportFrequency, number>;
  byCategory: Record<AdminReportCategory, number>;
  byScope: Record<AdminReportScope, number>;
  byDelivery: Record<AdminReportDelivery, number>;
  byTimeframe: Record<AdminReportTimeframe, number>;
  reportTrend: {
    date: Date;
    total: number;
    generated: number;
    failed: number;
  }[];
  topTypes: {
    type: AdminReportType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: AdminReportCategory;
    count: number;
    label: string;
  }[];
}

/**
 * Admin report configuration
 */
export interface AdminReportConfiguration {
  enabled: boolean;
  defaultFormat: AdminReportFormat;
  defaultPriority: AdminReportPriority;
  defaultFrequency: AdminReportFrequency;
  defaultCategory: AdminReportCategory;
  defaultScope: AdminReportScope;
  defaultDelivery: AdminReportDelivery;
  defaultTimeframe: AdminReportTimeframe;
  maxRetries: number;
  retryDelaySeconds: number;
  retentionDays: number;
  maxFileSizeMB: number;
  allowedFormats: AdminReportFormat[];
  allowedTypes: AdminReportType[];
  notificationOnGenerated: boolean;
  notificationOnFailed: boolean;
  alertConfig?: AdminReportAlertConfig;
}

/**
 * Admin report alert configuration
 */
export interface AdminReportAlertConfig {
  enabled: boolean;
  generationFailureAlert: boolean;
  processingTimeoutAlert: boolean;
  highPriorityAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  failureThreshold: number;
}

/**
 * Admin report history
 */
export interface AdminReportHistory extends BaseEntity, Timestamp {
  id: ID;
  reportId: ID;
  adminId: ID;
  action: 'create' | 'generate' | 'process' | 'deliver' | 'fail' | 'archive' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  ipAddress?: string;
  userAgent?: string;
  metadata?: Metadata;
}

/**
 * Admin report generation
 */
export interface AdminReportGeneration extends BaseEntity, Timestamp {
  id: ID;
  reportId: ID;
  adminId: ID;
  startedAt: Date;
  completedAt?: Date;
  duration?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  errorMessage?: string;
  fileUrl?: string;
  fileSize?: number;
  metadata?: Metadata;
}

/**
 * Admin report export
 */
export interface AdminReportExport extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  format: AdminReportFormat;
  filter: AdminReportFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Admin report schedule
 */
export interface AdminReportSchedule extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  reportId: ID;
  frequency: AdminReportFrequency;
  nextRunAt: Date;
  lastRunAt?: Date;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Admin report audit
 */
export interface AdminReportAudit extends BaseEntity, Timestamp {
  id: ID;
  reportId: ID;
  adminId: ID;
  action: 'create' | 'generate' | 'process' | 'deliver' | 'fail' | 'archive' | 'delete';
  changes: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  ipAddress?: string;
  userAgent?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Core Constants
  ADMIN_REPORT,
  ADMIN_REPORT_TYPE_LABELS,
  ADMIN_REPORT_TYPE_ICONS,
  ADMIN_REPORT_FORMAT_LABELS,
  ADMIN_REPORT_STATUS_LABELS,
  ADMIN_REPORT_STATUS_COLORS,
  ADMIN_REPORT_PRIORITY_LABELS,
  ADMIN_REPORT_PRIORITY_LEVELS,
  ADMIN_REPORT_FREQUENCY_LABELS,
  ADMIN_REPORT_CATEGORY_LABELS,
  ADMIN_REPORT_SCOPE_LABELS,
  ADMIN_REPORT_DELIVERY_LABELS,
  ADMIN_REPORT_TIMEFRAME_LABELS,
  // Core Types
  AdminReportType,
  AdminReportFormat,
  AdminReportStatus,
  AdminReportPriority,
  AdminReportFrequency,
  AdminReportCategory,
  AdminReportScope,
  AdminReportDelivery,
  AdminReportTimeframe,
  // Core Functions
  getAdminReportTypeLabel,
  getAdminReportTypeIcon,
  getAdminReportFormatLabel,
  getAdminReportStatusLabel,
  getAdminReportStatusColor,
  getAdminReportPriorityLabel,
  getAdminReportPriorityLevel,
  getAdminReportFrequencyLabel,
  getAdminReportCategoryLabel,
  getAdminReportScopeLabel,
  getAdminReportDeliveryLabel,
  getAdminReportTimeframeLabel,
  isReportGenerated,
  isReportProcessing,
  isReportFailed,
  isReportTerminal,
};
