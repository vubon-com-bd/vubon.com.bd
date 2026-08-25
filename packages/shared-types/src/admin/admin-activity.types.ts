/**
 * Admin Activity Types
 * Type definitions for admin activity based on shared-constants
 * @module AdminActivityTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, DeviceInfo } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants admin activity
// ============================================================
import {
  // Constants
  ADMIN_ACTIVITY,
  ADMIN_ACTIVITY_TYPE_LABELS,
  ADMIN_ACTIVITY_STATUS_LABELS,
  ADMIN_ACTIVITY_SEVERITY_COLORS,
  // Types
  AdminActivityType,
  AdminActivityStatus,
  AdminActivitySeverity,
  AdminActivityCategory,
  AdminActivitySource,
  AdminActivityAction,
  // Functions
  getActivityAdminTypeLabel,
  getActivityAdminStatusLabel,
  getActivityAdminSeverityColor,
  isActivityAdminSuccessful,
  isActivityAdminFailed,
  isActivityAdminPending,
  isActivityAdminTerminal,
} from '@vubon/shared-constants';

// ============================================================
// Admin Activity Extended Types
// ============================================================

/**
 * Admin activity with additional metadata
 */
export interface AdminActivityExtended extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  type: AdminActivityType;
  status: AdminActivityStatus;
  severity: AdminActivitySeverity;
  category: AdminActivityCategory;
  source: AdminActivitySource;
  action: AdminActivityAction;
  description: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  deviceInfo?: DeviceInfo;
  sessionId?: ID;
  duration?: number;
  isSuccessful: boolean;
  isFailed: boolean;
  isPending: boolean;
  isTerminal: boolean;
  metadata?: Metadata;
}

/**
 * Admin activity filter
 */
export interface AdminActivityFilter {
  adminIds?: ID[];
  types?: AdminActivityType[];
  statuses?: AdminActivityStatus[];
  severities?: AdminActivitySeverity[];
  categories?: AdminActivityCategory[];
  sources?: AdminActivitySource[];
  actions?: AdminActivityAction[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  searchTerm?: string;
  isSuccessful?: boolean;
  isFailed?: boolean;
  isPending?: boolean;
  ipAddress?: string;
  sessionId?: ID;
}

/**
 * Admin activity statistics
 */
export interface AdminActivityStatistics {
  adminId: ID;
  totalActivities: number;
  successfulActivities: number;
  failedActivities: number;
  pendingActivities: number;
  byType: Record<AdminActivityType, number>;
  byStatus: Record<AdminActivityStatus, number>;
  bySeverity: Record<AdminActivitySeverity, number>;
  byCategory: Record<AdminActivityCategory, number>;
  bySource: Record<AdminActivitySource, number>;
  byAction: Record<AdminActivityAction, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageDuration: number;
  peakActivityTime: string;
  mostFrequentType: AdminActivityType;
  mostFrequentAction: AdminActivityAction;
}

/**
 * Admin activity timeline
 */
export interface AdminActivityTimeline {
  date: Date;
  activities: AdminActivityExtended[];
  count: number;
  summary: {
    total: number;
    successful: number;
    failed: number;
    pending: number;
    bySeverity: Record<AdminActivitySeverity, number>;
  };
}

/**
 * Admin activity summary
 */
export interface AdminActivitySummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  successful: number;
  failed: number;
  pending: number;
  terminal: number;
  bySeverity: Record<AdminActivitySeverity, number>;
  byCategory: Record<AdminActivityCategory, number>;
  bySource: Record<AdminActivitySource, number>;
  topActivities: {
    type: AdminActivityType;
    count: number;
    label: string;
  }[];
  topActions: {
    action: AdminActivityAction;
    count: number;
    label: string;
  }[];
  activityTrend: {
    date: Date;
    count: number;
  }[];
}

/**
 * Admin activity audit
 */
export interface AdminActivityAudit extends BaseEntity, Timestamp {
  id: ID;
  activityId: ID;
  adminId: ID;
  action: 'create' | 'update' | 'delete' | 'restore';
  changes: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  ipAddress?: string;
  userAgent?: string;
  metadata?: Metadata;
}

/**
 * Admin activity export
 */
export interface AdminActivityExport {
  adminId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: AdminActivityFilter;
  includeMetadata: boolean;
  includeDetails: boolean;
  timestamp: Date;
  filename: string;
  size?: number;
  metadata?: Metadata;
}

/**
 * Admin activity notification
 */
export interface AdminActivityNotification {
  id: ID;
  adminId: ID;
  activityId: ID;
  type: 'email' | 'in_app' | 'push';
  status: 'pending' | 'sent' | 'failed' | 'read';
  title: string;
  message: string;
  sentAt?: Date;
  readAt?: Date;
  metadata?: Metadata;
}

/**
 * Admin activity retention
 */
export interface AdminActivityRetention {
  period: number; // days
  enabled: boolean;
  archiveBefore: Date;
  deleteBefore: Date;
  archiveEnabled: boolean;
  deleteEnabled: boolean;
  notificationBeforeDelete: number; // days
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Constants
  ADMIN_ACTIVITY,
  ADMIN_ACTIVITY_TYPE_LABELS,
  ADMIN_ACTIVITY_STATUS_LABELS,
  ADMIN_ACTIVITY_SEVERITY_COLORS,
  // Types
  AdminActivityType,
  AdminActivityStatus,
  AdminActivitySeverity,
  AdminActivityCategory,
  AdminActivitySource,
  AdminActivityAction,
  // Functions
  getActivityAdminTypeLabel,
  getActivityAdminStatusLabel,
  getActivityAdminSeverityColor,
  isActivityAdminSuccessful,
  isActivityAdminFailed,
  isActivityAdminPending,
  isActivityAdminTerminal,
};
