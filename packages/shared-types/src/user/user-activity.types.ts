/**
 * User Activity Types
 * Type definitions for user activity based on shared-constants
 * @module UserActivityTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, DeviceInfo } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants user activity
// ============================================================
import {
  // Core Activity Constants
  USER_ACTIVITY,
  UserActivitySeverity,
  UserActivityTimeframe,
  UserActivityMetadataKey,
  getSeverityLabel,
  getSeverityColor,
  getSeverityPriority,
  getActivityStatusMessage,
  isActivityActive,
  isActivityCompleted,
  isActivityFailed,
  isActivityRead,
  isActivityArchived,
  getActivityTimeframeLabel,
  getTimeframeDateRange,
  getActivityMetadataValue,
  hasActivityMetadata,
  getActivityDescription,
  shouldArchiveActivity,
  getActivitySeverityFromType,
  // Activity Type Constants
  USER_ACTIVITY_TYPE,
  USER_ACTIVITY_TYPE_LABELS,
  USER_ACTIVITY_TYPE_CATEGORIES,
  UserActivityType,
  UserActivityCategory,
  getActivityTypeLabel,
  getActivityCategory,
  getActivityTypesByCategory,
  isAuthenticationActivity,
  isOrderActivity,
  isPaymentActivity,
  isProductActivity,
  isSocialActivity,
  isSupportActivity,
  // Activity Status Constants
  USER_ACTIVITY_STATUS,
  USER_ACTIVITY_STATUS_LABELS,
  USER_ACTIVITY_STATUS_COLORS,
  ACTIVE_ACTIVITY_STATUSES,
  COMPLETED_ACTIVITY_STATUSES,
  FAILED_ACTIVITY_STATUSES,
  ARCHIVED_ACTIVITY_STATUSES,
  ALL_ACTIVITY_STATUSES,
  UserActivityStatus,
  isActivityStatusActive,
  isActivityStatusCompleted,
  isActivityStatusFailed,
  isActivityStatusArchived,
  isActivityFinished,
  getActivityStatusLabel,
  getActivityStatusColor,
} from '@vubon/shared-constants';

// ============================================================
// User Activity Extended Types
// ============================================================

/**
 * User activity with additional metadata
 */
export interface UserActivityExtended extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: UserActivityType;
  status: UserActivityStatus;
  severity: UserActivitySeverity;
  category: UserActivityCategory;
  description: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  deviceInfo?: DeviceInfo;
  isActive: boolean;
  isCompleted: boolean;
  isFailed: boolean;
  isRead: boolean;
  isArchived: boolean;
  isFinished: boolean;
  isAuthentication: boolean;
  isOrder: boolean;
  isPayment: boolean;
  isProduct: boolean;
  isSocial: boolean;
  isSupport: boolean;
  timeframe?: UserActivityTimeframe;
  timeframeDateRange?: {
    start: Date;
    end: Date;
  };
  shouldArchive: boolean;
}

/**
 * User activity filter
 */
export interface UserActivityFilter {
  userIds?: ID[];
  types?: UserActivityType[];
  statuses?: UserActivityStatus[];
  severities?: UserActivitySeverity[];
  categories?: UserActivityCategory[];
  timeframes?: UserActivityTimeframe[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isCompleted?: boolean;
  isFailed?: boolean;
  isRead?: boolean;
  isArchived?: boolean;
  isFinished?: boolean;
  isAuthentication?: boolean;
  isOrder?: boolean;
  isPayment?: boolean;
  isProduct?: boolean;
  isSocial?: boolean;
  isSupport?: boolean;
  searchTerm?: string;
}

/**
 * User activity statistics
 */
export interface UserActivityStatistics {
  userId: ID;
  totalActivities: number;
  activeActivities: number;
  completedActivities: number;
  failedActivities: number;
  readActivities: number;
  archivedActivities: number;
  finishedActivities: number;
  byType: Record<UserActivityType, number>;
  byStatus: Record<UserActivityStatus, number>;
  bySeverity: Record<UserActivitySeverity, number>;
  byCategory: Record<UserActivityCategory, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageActivityDuration: number;
  mostFrequentType: UserActivityType;
  mostFrequentCategory: UserActivityCategory;
  mostFrequentSeverity: UserActivitySeverity;
}

/**
 * User activity summary
 */
export interface UserActivitySummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  completed: number;
  failed: number;
  read: number;
  archived: number;
  finished: number;
  byType: Record<UserActivityType, number>;
  byStatus: Record<UserActivityStatus, number>;
  bySeverity: Record<UserActivitySeverity, number>;
  byCategory: Record<UserActivityCategory, number>;
  activityTrend: {
    date: Date;
    total: number;
    active: number;
    completed: number;
  }[];
  topTypes: {
    type: UserActivityType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: UserActivityCategory;
    count: number;
    label: string;
  }[];
}

/**
 * User activity configuration
 */
export interface UserActivityConfiguration {
  enabled: boolean;
  logAllActivities: boolean;
  logAuthentication: boolean;
  logOrders: boolean;
  logPayments: boolean;
  logProducts: boolean;
  logSocial: boolean;
  logSupport: boolean;
  retentionDays: number;
  archiveAfterDays: number;
  autoArchive: boolean;
  notificationOnFailed: boolean;
  notificationOnSecurity: boolean;
  alertConfig?: UserActivityAlertConfig;
}

/**
 * User activity alert configuration
 */
export interface UserActivityAlertConfig {
  enabled: boolean;
  failedActivityAlert: boolean;
  securityActivityAlert: boolean;
  suspiciousActivityAlert: boolean;
  highSeverityAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'push' | 'in_app')[];
  cooldownMinutes: number;
  failedActivityThreshold: number;
}

/**
 * User activity history
 */
export interface UserActivityHistory extends BaseEntity, Timestamp {
  id: ID;
  activityId: ID;
  userId: ID;
  action: 'create' | 'update' | 'read' | 'archive' | 'delete' | 'restore';
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
 * User activity export
 */
export interface UserActivityExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: UserActivityFilter;
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
  // Core Activity Constants
  USER_ACTIVITY,
  UserActivitySeverity,
  UserActivityTimeframe,
  UserActivityMetadataKey,
  getSeverityLabel,
  getSeverityColor,
  getSeverityPriority,
  getActivityStatusMessage,
  isActivityActive,
  isActivityCompleted,
  isActivityFailed,
  isActivityRead,
  isActivityArchived,
  getActivityTimeframeLabel,
  getTimeframeDateRange,
  getActivityMetadataValue,
  hasActivityMetadata,
  getActivityDescription,
  shouldArchiveActivity,
  getActivitySeverityFromType,
  // Activity Type Constants
  USER_ACTIVITY_TYPE,
  USER_ACTIVITY_TYPE_LABELS,
  USER_ACTIVITY_TYPE_CATEGORIES,
  UserActivityType,
  UserActivityCategory,
  getActivityTypeLabel,
  getActivityCategory,
  getActivityTypesByCategory,
  isAuthenticationActivity,
  isOrderActivity,
  isPaymentActivity,
  isProductActivity,
  isSocialActivity,
  isSupportActivity,
  // Activity Status Constants
  USER_ACTIVITY_STATUS,
  USER_ACTIVITY_STATUS_LABELS,
  USER_ACTIVITY_STATUS_COLORS,
  ACTIVE_ACTIVITY_STATUSES,
  COMPLETED_ACTIVITY_STATUSES,
  FAILED_ACTIVITY_STATUSES,
  ARCHIVED_ACTIVITY_STATUSES,
  ALL_ACTIVITY_STATUSES,
  UserActivityStatus,
  isActivityStatusActive,
  isActivityStatusCompleted,
  isActivityStatusFailed,
  isActivityStatusArchived,
  isActivityFinished,
  getActivityStatusLabel,
  getActivityStatusColor,
};
