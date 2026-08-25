/**
 * Admin Audit Types
 * Type definitions for admin audit based on shared-constants
 * @module AdminAuditTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, DeviceInfo } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants admin audit
// ============================================================
import {
  // Core Audit Constants
  ADMIN_AUDIT,
  ADMIN_AUDIT_ACTION_LABELS,
  ADMIN_AUDIT_SEVERITY_LABELS,
  ADMIN_AUDIT_SEVERITY_COLORS,
  ADMIN_AUDIT_SEVERITY_PRIORITY,
  ADMIN_AUDIT_CATEGORY_LABELS,
  ADMIN_AUDIT_STATUS_LABELS,
  ADMIN_AUDIT_STATUS_COLORS,
  ADMIN_AUDIT_SOURCE_LABELS,
  // Core Audit Types
  AdminAuditAction,
  AdminAuditSeverity,
  AdminAuditCategory,
  AdminAuditStatus,
  AdminAuditSource,
  AdminAuditRetention,
  // Core Audit Functions
  getAdminAuditActionLabel,
  getAdminAuditSeverityLabel,
  getAdminAuditSeverityColor,
  getAdminAuditSeverityPriority,
  getAdminAuditCategoryLabel,
  getAdminAuditStatusLabel,
  getAdminAuditStatusColor,
  getAdminAuditSourceLabel,
  isAdminAuditHighSeverity,
  isAdminAuditSuccessStatus,
  isAdminAuditFailureStatus,
  isAdminAuditPendingStatus,
  getAdminAuditRetentionDays,
} from '@vubon/shared-constants';

// ============================================================
// Admin Audit Extended Types
// ============================================================

/**
 * Admin audit entry with additional metadata
 */
export interface AdminAuditExtended extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  action: AdminAuditAction;
  severity: AdminAuditSeverity;
  category: AdminAuditCategory;
  status: AdminAuditStatus;
  source: AdminAuditSource;
  resourceType: string;
  resourceId?: ID;
  description: string;
  details?: Record<string, unknown>;
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  ipAddress?: string;
  userAgent?: string;
  deviceInfo?: DeviceInfo;
  sessionId?: ID;
  requestId?: string;
  duration?: number;
  isHighSeverity: boolean;
  isSuccessStatus: boolean;
  isFailureStatus: boolean;
  isPendingStatus: boolean;
  metadata?: Metadata;
}

/**
 * Admin audit filter
 */
export interface AdminAuditFilter {
  adminIds?: ID[];
  actions?: AdminAuditAction[];
  severities?: AdminAuditSeverity[];
  categories?: AdminAuditCategory[];
  statuses?: AdminAuditStatus[];
  sources?: AdminAuditSource[];
  resourceTypes?: string[];
  resourceIds?: ID[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  searchTerm?: string;
  ipAddress?: string;
  sessionId?: ID;
  requestId?: string;
  isHighSeverity?: boolean;
  isSuccessStatus?: boolean;
  isFailureStatus?: boolean;
  isPendingStatus?: boolean;
}

/**
 * Admin audit statistics
 */
export interface AdminAuditStatistics {
  adminId: ID;
  totalAudits: number;
  byAction: Record<AdminAuditAction, number>;
  bySeverity: Record<AdminAuditSeverity, number>;
  byCategory: Record<AdminAuditCategory, number>;
  byStatus: Record<AdminAuditStatus, number>;
  bySource: Record<AdminAuditSource, number>;
  byResourceType: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageAuditsPerDay: number;
  peakAuditTime: string;
  highSeverityCount: number;
  successRate: number;
  failureRate: number;
  mostFrequentAction: AdminAuditAction;
  mostFrequentCategory: AdminAuditCategory;
}

/**
 * Admin audit summary
 */
export interface AdminAuditSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  bySeverity: Record<AdminAuditSeverity, number>;
  byCategory: Record<AdminAuditCategory, number>;
  byStatus: Record<AdminAuditStatus, number>;
  topActions: {
    action: AdminAuditAction;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: AdminAuditCategory;
    count: number;
    label: string;
  }[];
  auditTrend: {
    date: Date;
    count: number;
  }[];
  highSeveritySummary: {
    total: number;
    byCategory: Record<AdminAuditCategory, number>;
    byAction: Record<AdminAuditAction, number>;
  };
}

/**
 * Admin audit configuration
 */
export interface AdminAuditConfiguration {
  enabled: boolean;
  logAllActions: boolean;
  logAllCategories: boolean;
  severityLevels: AdminAuditSeverity[];
  categories: AdminAuditCategory[];
  sources: AdminAuditSource[];
  excludeFields: string[];
  retention: AdminAuditRetention;
  highSeverityAlert: boolean;
  failureAlert: boolean;
  exportConfig?: AdminAuditExportConfig;
  alertConfig?: AdminAuditAlertConfig;
}

/**
 * Admin audit export configuration
 */
export interface AdminAuditExportConfig {
  enabled: boolean;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  schedule: 'daily' | 'weekly' | 'monthly' | 'manual';
  destination: string;
  includeMetadata: boolean;
  compression: boolean;
  encryption: boolean;
  retentionDays: number;
  filter: AdminAuditFilter;
}

/**
 * Admin audit alert configuration
 */
export interface AdminAuditAlertConfig {
  enabled: boolean;
  highSeverityThreshold: number;
  failureThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  ignoreActions: AdminAuditAction[];
}

/**
 * Admin audit history
 */
export interface AdminAuditHistory extends BaseEntity, Timestamp {
  id: ID;
  auditId: ID;
  adminId: ID;
  action: 'view' | 'export' | 'delete' | 'archive' | 'restore';
  previousState?: Record<string, unknown>;
  newState?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Metadata;
}

/**
 * Admin audit export
 */
export interface AdminAuditExport extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: AdminAuditFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Admin audit retention policy
 */
export interface AdminAuditRetentionPolicy {
  enabled: boolean;
  maxAgeDays: number;
  archiveEnabled: boolean;
  archiveAfterDays: number;
  deleteAfterDays: number;
  notificationBeforeDelete: number; // days
  complianceRequirements: string[];
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Core Constants
  ADMIN_AUDIT,
  ADMIN_AUDIT_ACTION_LABELS,
  ADMIN_AUDIT_SEVERITY_LABELS,
  ADMIN_AUDIT_SEVERITY_COLORS,
  ADMIN_AUDIT_SEVERITY_PRIORITY,
  ADMIN_AUDIT_CATEGORY_LABELS,
  ADMIN_AUDIT_STATUS_LABELS,
  ADMIN_AUDIT_STATUS_COLORS,
  ADMIN_AUDIT_SOURCE_LABELS,
  // Core Types
  AdminAuditAction,
  AdminAuditSeverity,
  AdminAuditCategory,
  AdminAuditStatus,
  AdminAuditSource,
  AdminAuditRetention,
  // Core Functions
  getAdminAuditActionLabel,
  getAdminAuditSeverityLabel,
  getAdminAuditSeverityColor,
  getAdminAuditSeverityPriority,
  getAdminAuditCategoryLabel,
  getAdminAuditStatusLabel,
  getAdminAuditStatusColor,
  getAdminAuditSourceLabel,
  isAdminAuditHighSeverity,
  isAdminAuditSuccessStatus,
  isAdminAuditFailureStatus,
  isAdminAuditPendingStatus,
  getAdminAuditRetentionDays,
};
