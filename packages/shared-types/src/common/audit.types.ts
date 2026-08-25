/**
 * Audit Types
 * Type definitions for audit logging based on admin audit constants
 * @module AuditTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, DeviceInfo } from './core-primitives.types';

// ============================================================
// Admin Audit Core Constants ও ফাংশন (সঠিক নাম ব্যবহার করে)
// ============================================================
import {
  // কনস্ট্যান্ট
  ADMIN_AUDIT,
  ADMIN_AUDIT_ACTION_LABELS,
  ADMIN_AUDIT_SEVERITY_LABELS,
  ADMIN_AUDIT_SEVERITY_COLORS,
  ADMIN_AUDIT_SEVERITY_PRIORITY,
  ADMIN_AUDIT_CATEGORY_LABELS,
  ADMIN_AUDIT_STATUS_LABELS,
  ADMIN_AUDIT_STATUS_COLORS,
  ADMIN_AUDIT_SOURCE_LABELS,
  // টাইপ
  AdminAuditAction,
  AdminAuditSeverity,
  AdminAuditCategory,
  AdminAuditStatus,
  AdminAuditSource,
  AdminAuditRetention,
  // ফাংশন
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
// Admin Audit Type Details (admin-audit-type.constants থেকে)
// ============================================================
import {
  ADMIN_AUDIT_TYPE,
  ADMIN_AUDIT_TYPE_CATEGORIES,
  ADMIN_AUDIT_TYPE_LABELS_DETAIL,
  AdminAuditTypeDetail,
  getAdminAuditTypeCategory,
  getAdminAuditTypeLabel,
  isAdminAuditSecurity,
  isAdminAuditCompliance,
  isAdminAuditFinancial,
  isAdminAuditUser,
  isAdminAuditSystem,
} from '@vubon/shared-constants';

// ============================================================
// Admin Audit Status Details (admin-audit-status.constants থেকে)
// ============================================================
import {
  ADMIN_AUDIT_STATUS,
  ADMIN_AUDIT_STATUS_LABELS_DETAIL,
  ADMIN_AUDIT_STATUS_COLORS_DETAIL,
  ADMIN_AUDIT_STATUS_GROUPS,
  AdminAuditStatusDetail,
  getAdminAuditStatusLabel as getAdminAuditStatusLabelDetail,
  getAdminAuditStatusColor as getAdminAuditStatusColorDetail,
  isAdminAuditSuccessStatus as isAdminAuditSuccessStatusDetail,
  isAdminAuditFailureStatus as isAdminAuditFailureStatusDetail,
  isAdminAuditPendingStatus as isAdminAuditPendingStatusDetail,
  isAdminAuditIntermediateStatus,
  isAdminAuditTerminalStatus,
  isAdminAuditActiveStatus,
  isAdminAuditCompliantStatus,
  isAdminAuditNonCompliantStatus,
  getAdminAuditStatusPriority,
  getAdminAuditStatuses,
  getAdminAuditSuccessStatuses,
  getAdminAuditFailureStatuses,
  getAdminAuditPendingStatuses,
  getAdminAuditIntermediateStatuses,
} from '@vubon/shared-constants';

// ============================================================
// টাইপ ডেফিনেশন (শুধুমাত্র প্রয়োজনীয় টাইপ)
// ============================================================

/**
 * Admin audit log entry
 */
export interface AdminAuditLog extends BaseEntity, Timestamp {
  /** Admin user ID who performed the action */
  adminId: ID;
  /** Audit action performed */
  action: AdminAuditAction;
  /** Audit severity level */
  severity: AdminAuditSeverity;
  /** Audit category */
  category: AdminAuditCategory;
  /** Audit status */
  status: AdminAuditStatus;
  /** Audit source */
  source: AdminAuditSource;
  /** Resource type (e.g., 'admin', 'user', 'product') */
  resourceType: string;
  /** Resource ID being audited */
  resourceId?: ID;
  /** Audit metadata */
  metadata?: AuditMetadata;
  /** IP address */
  ipAddress?: string;
  /** User agent */
  userAgent?: string;
  /** Device info */
  deviceInfo?: DeviceInfo;
  /** Audit description */
  description?: string;
}

/**
 * Admin audit metadata
 */
export interface AuditMetadata {
  /** Changes made */
  changes?: AuditChange[];
  /** Previous state */
  previousState?: Record<string, unknown>;
  /** Current state */
  currentState?: Record<string, unknown>;
  /** Reason for action */
  reason?: string;
  /** Additional data */
  additionalData?: Metadata;
}

/**
 * Audit change details
 */
export interface AuditChange {
  /** Field name */
  field: string;
  /** Previous value */
  oldValue: unknown;
  /** New value */
  newValue: unknown;
  /** Change type */
  type: ChangeType;
}

/**
 * Change type
 */
export type ChangeType = 'CREATE' | 'UPDATE' | 'DELETE' | 'RESTORE';

/**
 * Audit log filter
 */
export interface AuditFilter {
  /** Admin user IDs */
  adminIds?: ID[];
  /** Audit actions */
  actions?: AdminAuditAction[];
  /** Audit severity levels */
  severities?: AdminAuditSeverity[];
  /** Audit categories */
  categories?: AdminAuditCategory[];
  /** Audit statuses */
  statuses?: AdminAuditStatus[];
  /** Resource types */
  resourceTypes?: string[];
  /** Date range */
  dateRange?: {
    start: Date;
    end: Date;
  };
  /** Search query */
  search?: string;
}

/**
 * Audit summary
 */
export interface AuditSummary {
  /** Total actions */
  totalActions: number;
  /** Actions by status */
  byStatus: Record<AdminAuditStatus, number>;
  /** Actions by severity */
  bySeverity: Record<AdminAuditSeverity, number>;
  /** Actions by category */
  byCategory: Record<AdminAuditCategory, number>;
  /** Actions by action */
  byAction: Record<AdminAuditAction, number>;
  /** Actions by admin */
  byAdmin: Record<ID, number>;
  /** Date range */
  dateRange: {
    start: Date;
    end: Date;
  };
  /** High severity count */
  highSeverityCount: number;
  /** Critical severity count */
  criticalSeverityCount: number;
}

/**
 * Audit configuration
 */
export interface AuditConfig {
  /** Enable audit logging */
  enabled: boolean;
  /** Log all actions */
  logAllActions: boolean;
  /** Log request body */
  logRequestBody: boolean;
  /** Log response body */
  logResponseBody: boolean;
  /** Exclude sensitive fields */
  excludeFields: string[];
  /** Retention days */
  retentionDays: AdminAuditRetention;
  /** Archive after days */
  archiveAfterDays: number;
  /** High severity alert */
  highSeverityAlert: boolean;
  /** Critical severity alert */
  criticalSeverityAlert: boolean;
}

/**
 * Audit event for event sourcing
 */
export interface AuditEvent {
  /** Event ID */
  eventId: string;
  /** Aggregate ID */
  aggregateId: string;
  /** Aggregate type */
  aggregateType: string;
  /** Event type */
  eventType: string;
  /** Event version */
  version: number;
  /** Event data */
  data: Record<string, unknown>;
  /** Event metadata */
  metadata: {
    timestamp: Date;
    adminId: ID;
    ipAddress?: string;
    userAgent?: string;
    correlationId?: string;
    causationId?: string;
  };
}

// ============================================================
// Re-export সব ফাংশন ও টাইপ (সুবিধার জন্য)
// ============================================================

export {
  // Admin Audit Core
  ADMIN_AUDIT,
  ADMIN_AUDIT_ACTION_LABELS,
  ADMIN_AUDIT_SEVERITY_LABELS,
  ADMIN_AUDIT_SEVERITY_COLORS,
  ADMIN_AUDIT_SEVERITY_PRIORITY,
  ADMIN_AUDIT_CATEGORY_LABELS,
  ADMIN_AUDIT_STATUS_LABELS,
  ADMIN_AUDIT_STATUS_COLORS,
  ADMIN_AUDIT_SOURCE_LABELS,
  AdminAuditAction,
  AdminAuditSeverity,
  AdminAuditCategory,
  AdminAuditStatus,
  AdminAuditSource,
  AdminAuditRetention,
  // Core functions
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
  // Admin Audit Type
  ADMIN_AUDIT_TYPE,
  ADMIN_AUDIT_TYPE_CATEGORIES,
  ADMIN_AUDIT_TYPE_LABELS_DETAIL,
  AdminAuditTypeDetail,
  getAdminAuditTypeCategory,
  getAdminAuditTypeLabel,
  isAdminAuditSecurity,
  isAdminAuditCompliance,
  isAdminAuditFinancial,
  isAdminAuditUser,
  isAdminAuditSystem,
  // Admin Audit Status
  ADMIN_AUDIT_STATUS,
  ADMIN_AUDIT_STATUS_LABELS_DETAIL,
  ADMIN_AUDIT_STATUS_COLORS_DETAIL,
  ADMIN_AUDIT_STATUS_GROUPS,
  AdminAuditStatusDetail,
  getAdminAuditStatusLabelDetail,
  getAdminAuditStatusColorDetail,
  isAdminAuditSuccessStatusDetail,
  isAdminAuditFailureStatusDetail,
  isAdminAuditPendingStatusDetail,
  isAdminAuditIntermediateStatus,
  isAdminAuditTerminalStatus,
  isAdminAuditActiveStatus,
  isAdminAuditCompliantStatus,
  isAdminAuditNonCompliantStatus,
  getAdminAuditStatusPriority,
  getAdminAuditStatuses,
  getAdminAuditSuccessStatuses,
  getAdminAuditFailureStatuses,
  getAdminAuditPendingStatuses,
  getAdminAuditIntermediateStatuses,
};
