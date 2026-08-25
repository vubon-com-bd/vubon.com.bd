/**
 * Admin Log Types
 * Type definitions for admin logs based on shared-constants
 * @module AdminLogTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, DeviceInfo } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants admin log
// ============================================================
import {
  // Constants
  ADMIN_LOG,
  ADMIN_LOG_LEVEL_LABELS,
  ADMIN_LOG_LEVEL_PRIORITY,
  ADMIN_LOG_LEVEL_COLORS,
  ADMIN_LOG_CATEGORY_LABELS,
  // Types
  AdminLogLevel,
  AdminLogCategory,
  AdminLogFormat,
  AdminLogDestination,
  AdminLogRetention,
  AdminLogSizeLimit,
  AdminLogRotation,
  // Functions
  getAdminLogLevelLabel,
  getAdminLogLevelPriority,
  getAdminLogLevelColor,
  getAdminLogCategoryLabel,
  isAdminLogCriticalLevel,
  isAdminLogErrorLevel,
  isAdminLogWarningLevel,
  isAdminLogInfoLevel,
  isAdminLogDebugLevel,
  shouldAdminLogLevel,
  getAdminLogRetentionDays,
  getAdminLogSizeLimit,
  getAdminLogRotationLabel,
  isAdminAuditLog,
  isAdminPerformanceLog,
  isAdminSecurityLog,
  isAdminSystemLog,
} from '@vubon/shared-constants';

// ============================================================
// Admin Log Extended Types
// ============================================================

/**
 * Admin log entry with additional metadata
 */
export interface AdminLogExtended extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  level: AdminLogLevel;
  category: AdminLogCategory;
  message: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  deviceInfo?: DeviceInfo;
  sessionId?: ID;
  requestId?: string;
  duration?: number;
  source?: string;
  metadata?: Metadata;
}

/**
 * Admin log filter
 */
export interface AdminLogFilter {
  adminIds?: ID[];
  levels?: AdminLogLevel[];
  categories?: AdminLogCategory[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  searchTerm?: string;
  ipAddress?: string;
  sessionId?: ID;
  requestId?: string;
  source?: string;
  minLevel?: AdminLogLevel;
}

/**
 * Admin log statistics
 */
export interface AdminLogStatistics {
  adminId: ID;
  totalLogs: number;
  byLevel: Record<AdminLogLevel, number>;
  byCategory: Record<AdminLogCategory, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageLogsPerDay: number;
  peakLogTime: string;
  mostFrequentLevel: AdminLogLevel;
  mostFrequentCategory: AdminLogCategory;
  errorRate: number;
  warningRate: number;
  infoRate: number;
  debugRate: number;
}

/**
 * Admin log summary
 */
export interface AdminLogSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  byLevel: Record<AdminLogLevel, number>;
  byCategory: Record<AdminLogCategory, number>;
  topLevels: {
    level: AdminLogLevel;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: AdminLogCategory;
    count: number;
    label: string;
  }[];
  logTrend: {
    date: Date;
    count: number;
  }[];
  errorSummary: {
    total: number;
    byCategory: Record<AdminLogCategory, number>;
  };
}

/**
 * Admin log configuration
 */
export interface AdminLogConfiguration {
  enabled: boolean;
  level: AdminLogLevel;
  categories: AdminLogCategory[];
  format: AdminLogFormat;
  destination: AdminLogDestination;
  retention: AdminLogRetention;
  sizeLimit: AdminLogSizeLimit;
  rotation: AdminLogRotation;
  compression: boolean;
  encryption: boolean;
  includeSensitiveData: boolean;
  exportConfig?: AdminLogExportConfig;
  alertConfig?: AdminLogAlertConfig;
}

/**
 * Admin log export configuration
 */
export interface AdminLogExportConfig {
  enabled: boolean;
  format: 'json' | 'csv' | 'xml' | 'text';
  schedule: 'daily' | 'weekly' | 'monthly' | 'manual';
  destination: string;
  includeMetadata: boolean;
  compression: boolean;
  encryption: boolean;
  retentionDays: number;
}

/**
 * Admin log alert configuration
 */
export interface AdminLogAlertConfig {
  enabled: boolean;
  errorThreshold: number;
  warningThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  ignorePatterns: string[];
}

/**
 * Admin log audit
 */
export interface AdminLogAudit extends BaseEntity, Timestamp {
  id: ID;
  logId: ID;
  adminId: ID;
  action: 'view' | 'export' | 'delete' | 'archive' | 'restore';
  ipAddress?: string;
  userAgent?: string;
  metadata?: Metadata;
}

/**
 * Admin log export
 */
export interface AdminLogExport extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  format: 'json' | 'csv' | 'xml' | 'text' | 'pdf';
  filter: AdminLogFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Admin log retention policy
 */
export interface AdminLogRetentionPolicy {
  enabled: boolean;
  maxAgeDays: number;
  maxSizeMB: number;
  archiveEnabled: boolean;
  archiveAfterDays: number;
  deleteAfterDays: number;
  notificationBeforeDelete: number; // days
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Constants
  ADMIN_LOG,
  ADMIN_LOG_LEVEL_LABELS,
  ADMIN_LOG_LEVEL_PRIORITY,
  ADMIN_LOG_LEVEL_COLORS,
  ADMIN_LOG_CATEGORY_LABELS,
  // Types
  AdminLogLevel,
  AdminLogCategory,
  AdminLogFormat,
  AdminLogDestination,
  AdminLogRetention,
  AdminLogSizeLimit,
  AdminLogRotation,
  // Functions
  getAdminLogLevelLabel,
  getAdminLogLevelPriority,
  getAdminLogLevelColor,
  getAdminLogCategoryLabel,
  isAdminLogCriticalLevel,
  isAdminLogErrorLevel,
  isAdminLogWarningLevel,
  isAdminLogInfoLevel,
  isAdminLogDebugLevel,
  shouldAdminLogLevel,
  getAdminLogRetentionDays,
  getAdminLogSizeLimit,
  getAdminLogRotationLabel,
  isAdminAuditLog,
  isAdminPerformanceLog,
  isAdminSecurityLog,
  isAdminSystemLog,
};
