/**
 * User Activity Schema
 * Zod schemas for user activity management, tracking, and analysis
 */

import { z } from 'zod';
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
import { idSchema, timestampSchema, jsonObjectSchema } from '../common/core-primitives.schema';

// ============================================================
// USER ACTIVITY TYPE SCHEMAS
// ============================================================

/**
 * User activity type schema
 */
export const userActivityTypeSchema = z.enum([
  USER_ACTIVITY_TYPE.LOGIN,
  USER_ACTIVITY_TYPE.LOGOUT,
  USER_ACTIVITY_TYPE.REGISTRATION,
  USER_ACTIVITY_TYPE.PROFILE_UPDATE,
  USER_ACTIVITY_TYPE.PASSWORD_CHANGE,
  USER_ACTIVITY_TYPE.EMAIL_VERIFICATION,
  USER_ACTIVITY_TYPE.PHONE_VERIFICATION,
  USER_ACTIVITY_TYPE.KYC_SUBMISSION,
  USER_ACTIVITY_TYPE.KYC_UPDATE,
  USER_ACTIVITY_TYPE.DOCUMENT_UPLOAD,
  USER_ACTIVITY_TYPE.DOCUMENT_DELETE,
  USER_ACTIVITY_TYPE.ADDRESS_ADD,
  USER_ACTIVITY_TYPE.ADDRESS_UPDATE,
  USER_ACTIVITY_TYPE.ADDRESS_DELETE,
  USER_ACTIVITY_TYPE.CONTACT_ADD,
  USER_ACTIVITY_TYPE.CONTACT_UPDATE,
  USER_ACTIVITY_TYPE.CONTACT_DELETE,
  USER_ACTIVITY_TYPE.PREFERENCE_UPDATE,
  USER_ACTIVITY_TYPE.SETTINGS_UPDATE,
  USER_ACTIVITY_TYPE.DEVICE_ADD,
  USER_ACTIVITY_TYPE.DEVICE_REMOVE,
  USER_ACTIVITY_TYPE.SESSION_START,
  USER_ACTIVITY_TYPE.SESSION_END,
  USER_ACTIVITY_TYPE.TWO_FA_ENABLE,
  USER_ACTIVITY_TYPE.TWO_FA_DISABLE,
  USER_ACTIVITY_TYPE.SUBSCRIPTION_CREATE,
  USER_ACTIVITY_TYPE.SUBSCRIPTION_CANCEL,
  USER_ACTIVITY_TYPE.SUBSCRIPTION_RENEW,
  USER_ACTIVITY_TYPE.PAYMENT_SUCCESS,
  USER_ACTIVITY_TYPE.PAYMENT_FAILED,
  USER_ACTIVITY_TYPE.EXPORT_DATA,
  USER_ACTIVITY_TYPE.ACCOUNT_DELETE,
  USER_ACTIVITY_TYPE.ACCOUNT_RESTORE,
  USER_ACTIVITY_TYPE.ACCOUNT_LOCK,
  USER_ACTIVITY_TYPE.ACCOUNT_UNLOCK,
  USER_ACTIVITY_TYPE.SECURITY_ALERT,
  USER_ACTIVITY_TYPE.SUSPICIOUS_DETECTED,
  USER_ACTIVITY_TYPE.API_ACCESS,
  USER_ACTIVITY_TYPE.WEBHOOK,
]);

/**
 * User activity status schema
 */
export const userActivityStatusSchema = z.enum([
  USER_ACTIVITY_STATUS.COMPLETED,
  USER_ACTIVITY_STATUS.IN_PROGRESS,
  USER_ACTIVITY_STATUS.PENDING,
  USER_ACTIVITY_STATUS.FAILED,
  USER_ACTIVITY_STATUS.CANCELLED,
  USER_ACTIVITY_STATUS.PROCESSING,
  USER_ACTIVITY_STATUS.ON_HOLD,
  USER_ACTIVITY_STATUS.SCHEDULED,
  USER_ACTIVITY_STATUS.EXPIRED,
]);

/**
 * User activity category schema
 */
export const userActivityCategorySchema = z.enum([
  USER_ACTIVITY_CATEGORY.AUTHENTICATION,
  USER_ACTIVITY_CATEGORY.PROFILE,
  USER_ACTIVITY_CATEGORY.VERIFICATION,
  USER_ACTIVITY_CATEGORY.DOCUMENT,
  USER_ACTIVITY_CATEGORY.ADDRESS,
  USER_ACTIVITY_CATEGORY.CONTACT,
  USER_ACTIVITY_CATEGORY.PREFERENCE,
  USER_ACTIVITY_CATEGORY.SETTINGS,
  USER_ACTIVITY_CATEGORY.DEVICE,
  USER_ACTIVITY_CATEGORY.SESSION,
  USER_ACTIVITY_CATEGORY.SECURITY,
  USER_ACTIVITY_CATEGORY.SUBSCRIPTION,
  USER_ACTIVITY_CATEGORY.PAYMENT,
  USER_ACTIVITY_CATEGORY.DATA,
  USER_ACTIVITY_CATEGORY.ACCOUNT,
  USER_ACTIVITY_CATEGORY.API,
]);

/**
 * User activity severity schema
 */
export const userActivitySeveritySchema = z.enum([
  USER_ACTIVITY_SEVERITY.INFO,
  USER_ACTIVITY_SEVERITY.LOW,
  USER_ACTIVITY_SEVERITY.MEDIUM,
  USER_ACTIVITY_SEVERITY.HIGH,
  USER_ACTIVITY_SEVERITY.CRITICAL,
]);

// ============================================================
// USER ACTIVITY RECORD SCHEMA
// ============================================================

/**
 * User activity record schema
 */
export const userActivityRecordSchema = z.object({
  id: idSchema,
  userId: idSchema,
  type: userActivityTypeSchema,
  status: userActivityStatusSchema,
  category: userActivityCategorySchema,
  severity: userActivitySeveritySchema,
  description: z.string().min(1),
  data: jsonObjectSchema.optional(),
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().optional(),
  sessionId: idSchema.optional(),
  deviceId: idSchema.optional(),
  requestId: z.string().optional(),
  startedAt: timestampSchema,
  completedAt: timestampSchema.optional(),
  durationMs: z.number().int().min(0).optional(),
  metadata: jsonObjectSchema.optional(),
});

// ============================================================
// USER ACTIVITY FILTER SCHEMA
// ============================================================

/**
 * User activity filter schema
 */
export const userActivityFilterSchema = z.object({
  userId: idSchema.optional(),
  type: z.union([userActivityTypeSchema, z.array(userActivityTypeSchema)]).optional(),
  status: z.union([userActivityStatusSchema, z.array(userActivityStatusSchema)]).optional(),
  category: z.union([userActivityCategorySchema, z.array(userActivityCategorySchema)]).optional(),
  severity: z.union([userActivitySeveritySchema, z.array(userActivitySeveritySchema)]).optional(),
  sessionId: idSchema.optional(),
  deviceId: idSchema.optional(),
  dateRange: z
    .object({
      start: z.date().optional(),
      end: z.date().optional(),
    })
    .optional(),
  search: z.string().optional(),
  completedOnly: z.boolean().optional(),
  inProgressOnly: z.boolean().optional(),
  failedOnly: z.boolean().optional(),
});

// ============================================================
// USER ACTIVITY SUMMARY SCHEMA
// ============================================================

/**
 * User activity summary schema
 */
export const userActivitySummarySchema = z.object({
  totalActivities: z.number().int().min(0),
  activitiesByType: z.record(userActivityTypeSchema, z.number().int().min(0)),
  activitiesByStatus: z.record(userActivityStatusSchema, z.number().int().min(0)),
  activitiesByCategory: z.record(userActivityCategorySchema, z.number().int().min(0)),
  activitiesBySeverity: z.record(userActivitySeveritySchema, z.number().int().min(0)),
  latestActivity: userActivityRecordSchema.optional(),
  averageDurationMs: z.number().int().min(0),
  period: z.object({
    start: z.date(),
    end: z.date(),
  }),
});

// ============================================================
// USER ACTIVITY STATISTICS SCHEMA
// ============================================================

/**
 * User activity statistics schema
 */
export const userActivityStatisticsSchema = z.object({
  total: z.number().int().min(0),
  averagePerDay: z.number().min(0),
  peakHour: z.number().int().min(0).max(23),
  successRate: z.number().min(0).max(1),
  mostActiveUser: z
    .object({
      userId: idSchema,
      activityCount: z.number().int().min(0),
    })
    .optional(),
  mostCommonType: userActivityTypeSchema.optional(),
  mostCommonCategory: userActivityCategorySchema.optional(),
  criticalCount: z.number().int().min(0),
});

// ============================================================
// USER ACTIVITY TIMELINE SCHEMA
// ============================================================

/**
 * User activity timeline event schema
 */
export const userActivityTimelineEventSchema = z.object({
  activity: userActivityRecordSchema,
  time: z.string(),
  label: z.string(),
  type: z.enum(['info', 'success', 'warning', 'error', 'critical']),
});

/**
 * User activity timeline schema
 */
export const userActivityTimelineSchema = z.object({
  userId: idSchema,
  events: z.array(userActivityTimelineEventSchema),
  total: z.number().int().min(0),
  period: z.object({
    start: z.date(),
    end: z.date(),
  }),
});

// ============================================================
// TYPE INFERENCES
// ============================================================

export type UserActivityType = z.infer<typeof userActivityTypeSchema>;
export type UserActivityStatus = z.infer<typeof userActivityStatusSchema>;
export type UserActivityCategory = z.infer<typeof userActivityCategorySchema>;
export type UserActivitySeverity = z.infer<typeof userActivitySeveritySchema>;
export type UserActivityRecord = z.infer<typeof userActivityRecordSchema>;
export type UserActivityFilter = z.infer<typeof userActivityFilterSchema>;
export type UserActivitySummary = z.infer<typeof userActivitySummarySchema>;
export type UserActivityStatistics = z.infer<typeof userActivityStatisticsSchema>;
export type UserActivityTimelineEvent = z.infer<typeof userActivityTimelineEventSchema>;
export type UserActivityTimeline = z.infer<typeof userActivityTimelineSchema>;

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
 * Get user activity category from type (local map)
 */
export function getUserActivityCategoryFromType(type: UserActivityType): UserActivityCategory {
  const map: Record<UserActivityType, UserActivityCategory> = {
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
  return map[type] || 'profile';
}

/**
 * Get user activity severity from type (local map)
 */
export function getUserActivitySeverityFromType(type: UserActivityType): UserActivitySeverity {
  const map: Record<UserActivityType, UserActivitySeverity> = {
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
  return map[type] || 'info';
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
