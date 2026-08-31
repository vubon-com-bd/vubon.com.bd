/**
 * User Activity Types
 * Types for user activity management, tracking, and analysis
 */

import type { ID, Timestamp, JsonObject } from '../common/core-primitives.types';
import {
  USER_ACTIVITY_TYPE,
  USER_ACTIVITY_STATUS,
  USER_ACTIVITY_CATEGORY,
  USER_ACTIVITY_SEVERITY,
  USER_ACTIVITY_TYPE_LABELS,
  USER_ACTIVITY_STATUS_LABELS,
  USER_ACTIVITY_CATEGORY_LABELS,
  USER_ACTIVITY_SEVERITY_LABELS,
} from '@vubon/shared-constants';

// ============================================================
// USER ACTIVITY TYPE CATEGORY MAP (Local definition)
// ============================================================

/**
 * User activity category from type map
 */
export const USER_ACTIVITY_TYPE_CATEGORY_MAP: Record<UserActivityType, UserActivityCategory> = {
  login: 'authentication',
  logout: 'authentication',
  registration: 'authentication',
  profile_update: 'profile',
  password_change: 'security',
  email_verification: 'verification',
  phone_verification: 'verification',
  kyc_submission: 'verification',
  kyc_update: 'verification',
  document_upload: 'document',
  document_delete: 'document',
  address_add: 'address',
  address_update: 'address',
  address_delete: 'address',
  contact_add: 'contact',
  contact_update: 'contact',
  contact_delete: 'contact',
  preference_update: 'preference',
  settings_update: 'settings',
  device_add: 'device',
  device_remove: 'device',
  session_start: 'session',
  session_end: 'session',
  two_fa_enable: 'security',
  two_fa_disable: 'security',
  subscription_create: 'subscription',
  subscription_cancel: 'subscription',
  subscription_renew: 'subscription',
  payment_success: 'payment',
  payment_failed: 'payment',
  export_data: 'data',
  account_delete: 'account',
  account_restore: 'account',
  account_lock: 'account',
  account_unlock: 'account',
  security_alert: 'security',
  suspicious_detected: 'security',
  api_access: 'api',
  webhook: 'api',
};

// ============================================================
// USER ACTIVITY TYPE SEVERITY MAP (Local definition)
// ============================================================

/**
 * User activity severity from type map
 */
export const USER_ACTIVITY_TYPE_SEVERITY_MAP: Record<UserActivityType, UserActivitySeverity> = {
  login: 'info',
  logout: 'info',
  registration: 'info',
  profile_update: 'low',
  password_change: 'high',
  email_verification: 'medium',
  phone_verification: 'medium',
  kyc_submission: 'high',
  kyc_update: 'high',
  document_upload: 'medium',
  document_delete: 'high',
  address_add: 'low',
  address_update: 'low',
  address_delete: 'medium',
  contact_add: 'low',
  contact_update: 'low',
  contact_delete: 'medium',
  preference_update: 'low',
  settings_update: 'medium',
  device_add: 'high',
  device_remove: 'high',
  session_start: 'info',
  session_end: 'info',
  two_fa_enable: 'high',
  two_fa_disable: 'high',
  subscription_create: 'medium',
  subscription_cancel: 'high',
  subscription_renew: 'medium',
  payment_success: 'info',
  payment_failed: 'high',
  export_data: 'high',
  account_delete: 'critical',
  account_restore: 'critical',
  account_lock: 'critical',
  account_unlock: 'critical',
  security_alert: 'critical',
  suspicious_detected: 'critical',
  api_access: 'medium',
  webhook: 'medium',
};

// ============================================================
// USER ACTIVITY TYPES
// ============================================================

/**
 * User activity type
 */
export type UserActivityType = (typeof USER_ACTIVITY_TYPE)[keyof typeof USER_ACTIVITY_TYPE];

/**
 * User activity status
 */
export type UserActivityStatus = (typeof USER_ACTIVITY_STATUS)[keyof typeof USER_ACTIVITY_STATUS];

/**
 * User activity category
 */
export type UserActivityCategory =
  (typeof USER_ACTIVITY_CATEGORY)[keyof typeof USER_ACTIVITY_CATEGORY];

/**
 * User activity severity
 */
export type UserActivitySeverity =
  (typeof USER_ACTIVITY_SEVERITY)[keyof typeof USER_ACTIVITY_SEVERITY];

// ============================================================
// USER ACTIVITY RECORD
// ============================================================

/**
 * User activity record
 */
export interface UserActivityRecord {
  /** Unique identifier */
  id: ID;
  /** User ID */
  userId: ID;
  /** Activity type */
  type: UserActivityType;
  /** Activity status */
  status: UserActivityStatus;
  /** Activity category */
  category: UserActivityCategory;
  /** Activity severity */
  severity: UserActivitySeverity;
  /** Activity description */
  description: string;
  /** Detailed activity data */
  data?: JsonObject;
  /** IP address of the request */
  ipAddress?: string;
  /** User agent of the request */
  userAgent?: string;
  /** Session ID */
  sessionId?: ID;
  /** Device ID */
  deviceId?: ID;
  /** Request ID for tracing */
  requestId?: string;
  /** When the activity started */
  startedAt: Timestamp;
  /** When the activity completed (if applicable) */
  completedAt?: Timestamp;
  /** Duration in milliseconds */
  durationMs?: number;
  /** Additional metadata */
  metadata?: JsonObject;
}

// ============================================================
// USER ACTIVITY FILTER
// ============================================================

/**
 * User activity filter
 */
export interface UserActivityFilter {
  /** Filter by user ID */
  userId?: ID;
  /** Filter by activity type */
  type?: UserActivityType | UserActivityType[];
  /** Filter by activity status */
  status?: UserActivityStatus | UserActivityStatus[];
  /** Filter by activity category */
  category?: UserActivityCategory | UserActivityCategory[];
  /** Filter by activity severity */
  severity?: UserActivitySeverity | UserActivitySeverity[];
  /** Filter by session ID */
  sessionId?: ID;
  /** Filter by device ID */
  deviceId?: ID;
  /** Filter by date range */
  dateRange?: {
    start?: Date;
    end?: Date;
  };
  /** Search by description or data */
  search?: string;
  /** Filter by completed activities only */
  completedOnly?: boolean;
  /** Filter by in-progress activities only */
  inProgressOnly?: boolean;
  /** Filter by failed activities only */
  failedOnly?: boolean;
}

// ============================================================
// USER ACTIVITY SUMMARY
// ============================================================

/**
 * User activity summary
 */
export interface UserActivitySummary {
  /** Total number of activities */
  totalActivities: number;
  /** Number of activities by type */
  activitiesByType: Record<UserActivityType, number>;
  /** Number of activities by status */
  activitiesByStatus: Record<UserActivityStatus, number>;
  /** Number of activities by category */
  activitiesByCategory: Record<UserActivityCategory, number>;
  /** Number of activities by severity */
  activitiesBySeverity: Record<UserActivitySeverity, number>;
  /** Most recent activity */
  latestActivity?: UserActivityRecord;
  /** Average duration in milliseconds */
  averageDurationMs: number;
  /** Time period covered */
  period: {
    start: Date;
    end: Date;
  };
}

// ============================================================
// USER ACTIVITY STATISTICS
// ============================================================

/**
 * User activity statistics
 */
export interface UserActivityStatistics {
  /** Total activities in period */
  total: number;
  /** Average activities per day */
  averagePerDay: number;
  /** Peak activity time (hour of day) */
  peakHour: number;
  /** Success rate (completed / total) */
  successRate: number;
  /** Most active user */
  mostActiveUser?: {
    userId: ID;
    activityCount: number;
  };
  /** Most common activity type */
  mostCommonType?: UserActivityType;
  /** Most common activity category */
  mostCommonCategory?: UserActivityCategory;
  /** Critical activities count */
  criticalCount: number;
}

// ============================================================
// USER ACTIVITY TIMELINE
// ============================================================

/**
 * User activity timeline event
 */
export interface UserActivityTimelineEvent {
  /** Activity record */
  activity: UserActivityRecord;
  /** Formatted time */
  time: string;
  /** Display label */
  label: string;
  /** CSS class or color */
  type: 'info' | 'success' | 'warning' | 'error' | 'critical';
}

/**
 * User activity timeline
 */
export interface UserActivityTimeline {
  /** User ID */
  userId: ID;
  /** Timeline events */
  events: UserActivityTimelineEvent[];
  /** Total events */
  total: number;
  /** Date range */
  period: {
    start: Date;
    end: Date;
  };
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if user activity type is valid
 */
export function isValidUserActivityType(type: string): type is UserActivityType {
  return Object.values(USER_ACTIVITY_TYPE).includes(type as UserActivityType);
}

/**
 * Check if user activity status is valid
 */
export function isValidUserActivityStatus(status: string): status is UserActivityStatus {
  return Object.values(USER_ACTIVITY_STATUS).includes(status as UserActivityStatus);
}

/**
 * Check if user activity category is valid
 */
export function isValidUserActivityCategory(category: string): category is UserActivityCategory {
  return Object.values(USER_ACTIVITY_CATEGORY).includes(category as UserActivityCategory);
}

/**
 * Check if user activity severity is valid
 */
export function isValidUserActivitySeverity(severity: string): severity is UserActivitySeverity {
  return Object.values(USER_ACTIVITY_SEVERITY).includes(severity as UserActivitySeverity);
}

/**
 * Get user activity type display name
 */
export function getUserActivityTypeDisplayName(type: UserActivityType): string {
  return USER_ACTIVITY_TYPE_LABELS[type] || type;
}

/**
 * Get user activity status display name
 */
export function getUserActivityStatusDisplayName(status: UserActivityStatus): string {
  return USER_ACTIVITY_STATUS_LABELS[status] || status;
}

/**
 * Get user activity category display name
 */
export function getUserActivityCategoryDisplayName(category: UserActivityCategory): string {
  return USER_ACTIVITY_CATEGORY_LABELS[category] || category;
}

/**
 * Get user activity severity display name
 */
export function getUserActivitySeverityDisplayName(severity: UserActivitySeverity): string {
  return USER_ACTIVITY_SEVERITY_LABELS[severity] || severity;
}

/**
 * Get user activity category from type
 */
export function getUserActivityCategoryFromType(type: UserActivityType): UserActivityCategory {
  return USER_ACTIVITY_TYPE_CATEGORY_MAP[type] || USER_ACTIVITY_CATEGORY.PROFILE;
}

/**
 * Get user activity severity from type
 */
export function getUserActivitySeverityFromType(type: UserActivityType): UserActivitySeverity {
  return USER_ACTIVITY_TYPE_SEVERITY_MAP[type] || USER_ACTIVITY_SEVERITY.INFO;
}

/**
 * Check if activity is completed
 */
export function isUserActivityCompleted(status: UserActivityStatus): boolean {
  return status === USER_ACTIVITY_STATUS.COMPLETED;
}

/**
 * Check if activity is in progress
 */
export function isUserActivityInProgress(status: UserActivityStatus): boolean {
  return status === USER_ACTIVITY_STATUS.IN_PROGRESS || status === USER_ACTIVITY_STATUS.PROCESSING;
}

/**
 * Check if activity is failed
 */
export function isUserActivityFailed(status: UserActivityStatus): boolean {
  return status === USER_ACTIVITY_STATUS.FAILED;
}

/**
 * Check if activity is pending
 */
export function isUserActivityPending(status: UserActivityStatus): boolean {
  return status === USER_ACTIVITY_STATUS.PENDING || status === USER_ACTIVITY_STATUS.ON_HOLD;
}

/**
 * Get all user activity types
 */
export function getAllUserActivityTypes(): UserActivityType[] {
  return Object.values(USER_ACTIVITY_TYPE);
}

/**
 * Get all user activity statuses
 */
export function getAllUserActivityStatuses(): UserActivityStatus[] {
  return Object.values(USER_ACTIVITY_STATUS);
}

/**
 * Get all user activity categories
 */
export function getAllUserActivityCategories(): UserActivityCategory[] {
  return Object.values(USER_ACTIVITY_CATEGORY);
}

/**
 * Get all user activity severities
 */
export function getAllUserActivitySeverities(): UserActivitySeverity[] {
  return Object.values(USER_ACTIVITY_SEVERITY);
}

/**
 * Get authentication activity types
 */
export function getAuthenticationActivityTypes(): UserActivityType[] {
  return ['login', 'logout', 'registration'];
}

/**
 * Get security activity types
 */
export function getSecurityActivityTypes(): UserActivityType[] {
  return [
    'password_change',
    'two_fa_enable',
    'two_fa_disable',
    'security_alert',
    'suspicious_detected',
  ];
}

/**
 * Get account activity types
 */
export function getAccountActivityTypes(): UserActivityType[] {
  return ['account_delete', 'account_restore', 'account_lock', 'account_unlock'];
}

/**
 * Get subscription activity types
 */
export function getSubscriptionActivityTypes(): UserActivityType[] {
  return ['subscription_create', 'subscription_cancel', 'subscription_renew'];
}

/**
 * Get payment activity types
 */
export function getPaymentActivityTypes(): UserActivityType[] {
  return ['payment_success', 'payment_failed'];
}

/**
 * Create user activity record
 */
export function createUserActivityRecord(
  userId: ID,
  type: UserActivityType,
  description: string,
  data?: JsonObject
): Omit<UserActivityRecord, 'id' | 'startedAt'> {
  const category = getUserActivityCategoryFromType(type);
  const severity = getUserActivitySeverityFromType(type);

  return {
    userId,
    type,
    status: 'in_progress',
    category,
    severity,
    description,
    data,
  };
}

/**
 * Complete user activity record
 */
export function completeUserActivityRecord(
  activity: UserActivityRecord,
  status: UserActivityStatus = 'completed'
): UserActivityRecord {
  return {
    ...activity,
    status,
    completedAt: new Date(),
    durationMs: activity.startedAt ? Date.now() - activity.startedAt.getTime() : undefined,
  };
}

/**
 * Check if activity is critical
 */
export function isUserActivityCritical(severity: UserActivitySeverity): boolean {
  return severity === USER_ACTIVITY_SEVERITY.CRITICAL;
}

/**
 * Check if activity is high severity
 */
export function isUserActivityHighSeverity(severity: UserActivitySeverity): boolean {
  return severity === USER_ACTIVITY_SEVERITY.HIGH || severity === USER_ACTIVITY_SEVERITY.CRITICAL;
}

/**
 * Get activity severity color
 */
export function getUserActivitySeverityColor(severity: UserActivitySeverity): string {
  const colors: Record<UserActivitySeverity, string> = {
    info: '#2196F3',
    low: '#4CAF50',
    medium: '#FFC107',
    high: '#FF9800',
    critical: '#F44336',
  };
  return colors[severity] || '#2196F3';
}

/**
 * Get activity severity icon
 */
export function getUserActivitySeverityIcon(severity: UserActivitySeverity): string {
  const icons: Record<UserActivitySeverity, string> = {
    info: 'info',
    low: 'check_circle',
    medium: 'warning',
    high: 'error',
    critical: 'dangerous',
  };
  return icons[severity] || 'info';
}
