/**
 * Authentication Session Schema
 * Zod schemas for session management, tracking, and lifecycle
 */

import { z } from 'zod';
import {
  AUTH_SESSION_STATUS,
  AUTH_SESSION_TYPES,
  AUTH_SESSION_CONFIG,
  AUTH_SESSION_DEVICE_TYPES,
  AUTH_SESSION_PLATFORMS,
  AUTH_SESSION_EXPIRY_REASONS,
  ACTIVE_AUTH_SESSION_STATUSES,
  INVALID_AUTH_SESSION_STATUSES,
  AUTH_SESSION_STATUS_MESSAGES,
  type AuthSessionStatus,
  type AuthSessionType,
  type AuthSessionDeviceType,
  type AuthSessionPlatform,
  type AuthSessionExpiryReason,
} from '@vubon/shared-constants';
import { idSchema, timestampSchema, jsonObjectSchema } from '../common/core-primitives.schema';

// ============================================================
// AUTH SESSION TYPE & STATUS SCHEMAS
// ============================================================

/**
 * Auth session status schema
 */
export const authSessionStatusSchema = z.enum([
  AUTH_SESSION_STATUS.ACTIVE,
  AUTH_SESSION_STATUS.EXPIRED,
  AUTH_SESSION_STATUS.INVALID,
  AUTH_SESSION_STATUS.TERMINATED,
  AUTH_SESSION_STATUS.IDLE,
  AUTH_SESSION_STATUS.ABOUT_TO_EXPIRE,
]);

/**
 * Auth session type schema
 */
export const authSessionTypeSchema = z.enum([
  AUTH_SESSION_TYPES.WEB,
  AUTH_SESSION_TYPES.MOBILE,
  AUTH_SESSION_TYPES.API,
  AUTH_SESSION_TYPES.ADMIN,
  AUTH_SESSION_TYPES.VENDOR,
  AUTH_SESSION_TYPES.SERVICE,
]);

/**
 * Auth session device type schema
 */
export const authSessionDeviceTypeSchema = z.enum([
  AUTH_SESSION_DEVICE_TYPES.DESKTOP,
  AUTH_SESSION_DEVICE_TYPES.LAPTOP,
  AUTH_SESSION_DEVICE_TYPES.TABLET,
  AUTH_SESSION_DEVICE_TYPES.MOBILE,
  AUTH_SESSION_DEVICE_TYPES.TV,
  AUTH_SESSION_DEVICE_TYPES.CONSOLE,
  AUTH_SESSION_DEVICE_TYPES.OTHER,
]);

/**
 * Auth session platform schema
 */
export const authSessionPlatformSchema = z.enum([
  AUTH_SESSION_PLATFORMS.WEB,
  AUTH_SESSION_PLATFORMS.ANDROID,
  AUTH_SESSION_PLATFORMS.IOS,
  AUTH_SESSION_PLATFORMS.REACT_NATIVE,
  AUTH_SESSION_PLATFORMS.API,
  AUTH_SESSION_PLATFORMS.ADMIN,
  AUTH_SESSION_PLATFORMS.VENDOR,
  AUTH_SESSION_PLATFORMS.SERVICE,
]);

/**
 * Auth session expiry reason schema
 */
export const authSessionExpiryReasonSchema = z.enum([
  AUTH_SESSION_EXPIRY_REASONS.TIMEOUT,
  AUTH_SESSION_EXPIRY_REASONS.IDLE,
  AUTH_SESSION_EXPIRY_REASONS.LOGOUT,
  AUTH_SESSION_EXPIRY_REASONS.TERMINATED,
  AUTH_SESSION_EXPIRY_REASONS.ADMIN_ACTION,
  AUTH_SESSION_EXPIRY_REASONS.DEVICE_REMOVED,
  AUTH_SESSION_EXPIRY_REASONS.PASSWORD_CHANGED,
  AUTH_SESSION_EXPIRY_REASONS.SECURITY_ISSUE,
]);

// ============================================================
// AUTH SESSION RECORD SCHEMA
// ============================================================

/**
 * Auth session record schema
 */
export const authSessionSchema = z.object({
  id: idSchema,
  userId: idSchema,
  tokenHash: z.string().min(1),
  status: authSessionStatusSchema,
  type: authSessionTypeSchema,
  deviceType: authSessionDeviceTypeSchema,
  platform: authSessionPlatformSchema,
  deviceId: idSchema.optional(),
  ipAddress: z.string().ip(),
  userAgent: z.string().min(1),
  location: z
    .object({
      country: z.string().optional(),
      city: z.string().optional(),
      latitude: z.number().optional(),
      longitude: z.number().optional(),
    })
    .optional(),
  createdAt: timestampSchema,
  lastActivityAt: timestampSchema,
  expiresAt: timestampSchema,
  terminatedAt: timestampSchema.optional(),
  expiryReason: authSessionExpiryReasonSchema.optional(),
  metadata: jsonObjectSchema.optional(),
  isActive: z.boolean().default(true),
  isRemembered: z.boolean().default(false),
});

// ============================================================
// AUTH SESSION REQUEST SCHEMAS
// ============================================================

/**
 * Auth session create request schema
 */
export const authSessionCreateRequestSchema = z.object({
  userId: idSchema,
  type: authSessionTypeSchema,
  deviceId: idSchema.optional(),
  ipAddress: z.string().ip(),
  userAgent: z.string().min(1),
  location: z
    .object({
      country: z.string().optional(),
      city: z.string().optional(),
      latitude: z.number().optional(),
      longitude: z.number().optional(),
    })
    .optional(),
  remember: z.boolean().optional(),
  metadata: jsonObjectSchema.optional(),
});

/**
 * Auth session update request schema
 */
export const authSessionUpdateRequestSchema = z.object({
  sessionId: idSchema,
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().optional(),
  location: z
    .object({
      country: z.string().optional(),
      city: z.string().optional(),
      latitude: z.number().optional(),
      longitude: z.number().optional(),
    })
    .optional(),
  updateActivity: z.boolean().optional(),
  metadata: jsonObjectSchema.optional(),
});

/**
 * Auth session terminate request schema
 */
export const authSessionTerminateRequestSchema = z.object({
  sessionId: idSchema,
  reason: authSessionExpiryReasonSchema.optional(),
  terminatedBy: z.union([idSchema, z.enum(['user', 'admin', 'system'])]).optional(),
});

// ============================================================
// AUTH SESSION RESPONSE SCHEMAS
// ============================================================

/**
 * Auth session response schema
 */
export const authSessionResponseSchema = z.object({
  success: z.boolean(),
  session: authSessionSchema.optional(),
  token: z.string().optional(),
  error: z.string().optional(),
});

/**
 * Auth session validation response schema
 */
export const authSessionValidationResponseSchema = z.object({
  isValid: z.boolean(),
  status: authSessionStatusSchema,
  session: authSessionSchema.optional(),
  needsRenewal: z.boolean(),
  remainingSeconds: z.number().int().min(0),
});

// ============================================================
// AUTH SESSION FILTER SCHEMA
// ============================================================

/**
 * Auth session filter schema
 */
export const authSessionFilterSchema = z.object({
  userId: idSchema.optional(),
  status: z.union([authSessionStatusSchema, z.array(authSessionStatusSchema)]).optional(),
  type: z.union([authSessionTypeSchema, z.array(authSessionTypeSchema)]).optional(),
  deviceType: z
    .union([authSessionDeviceTypeSchema, z.array(authSessionDeviceTypeSchema)])
    .optional(),
  platform: z.union([authSessionPlatformSchema, z.array(authSessionPlatformSchema)]).optional(),
  deviceId: idSchema.optional(),
  ipAddress: z.string().ip().optional(),
  activeOnly: z.boolean().optional(),
  rememberedOnly: z.boolean().optional(),
  createdDateRange: z
    .object({
      start: z.date().optional(),
      end: z.date().optional(),
    })
    .optional(),
});

// ============================================================
// AUTH SESSION SUMMARY SCHEMA
// ============================================================

/**
 * Auth session summary schema
 */
export const authSessionSummarySchema = z.object({
  userId: idSchema,
  totalSessions: z.number().int().min(0),
  activeSessions: z.number().int().min(0),
  expiredSessions: z.number().int().min(0),
  terminatedSessions: z.number().int().min(0),
  currentSession: authSessionSchema.optional(),
  sessions: z.array(authSessionSchema),
  sessionsByType: z.record(authSessionTypeSchema, z.number().int().min(0)),
  sessionsByDevice: z.record(authSessionDeviceTypeSchema, z.number().int().min(0)),
  sessionsByPlatform: z.record(authSessionPlatformSchema, z.number().int().min(0)),
});

// ============================================================
// AUTH SESSION CONFIG SCHEMA
// ============================================================

/**
 * Auth session config schema
 */
export const authSessionConfigSchema = z.object({
  timeout: z.number().int().positive().default(AUTH_SESSION_CONFIG.TIMEOUT),
  idleTimeout: z.number().int().positive().default(AUTH_SESSION_CONFIG.IDLE_TIMEOUT),
  extensionTime: z.number().int().positive().default(AUTH_SESSION_CONFIG.EXTENSION_TIME),
  maxConcurrentSessions: z
    .number()
    .int()
    .positive()
    .default(AUTH_SESSION_CONFIG.MAX_CONCURRENT_SESSIONS),
  checkInterval: z.number().int().positive().default(AUTH_SESSION_CONFIG.CHECK_INTERVAL),
  cleanupInterval: z.number().int().positive().default(AUTH_SESSION_CONFIG.CLEANUP_INTERVAL),
  maxAge: z.number().int().positive().default(AUTH_SESSION_CONFIG.MAX_AGE),
  renewalThreshold: z.number().int().positive().default(AUTH_SESSION_CONFIG.RENEWAL_THRESHOLD),
});

// ============================================================
// TYPE INFERENCES (Zod থেকে টাইপ বের করা)
// ============================================================

export type AuthSession = z.infer<typeof authSessionSchema>;
export type AuthSessionCreateRequest = z.infer<typeof authSessionCreateRequestSchema>;
export type AuthSessionUpdateRequest = z.infer<typeof authSessionUpdateRequestSchema>;
export type AuthSessionTerminateRequest = z.infer<typeof authSessionTerminateRequestSchema>;
export type AuthSessionResponse = z.infer<typeof authSessionResponseSchema>;
export type AuthSessionValidationResponse = z.infer<typeof authSessionValidationResponseSchema>;
export type AuthSessionFilter = z.infer<typeof authSessionFilterSchema>;
export type AuthSessionSummary = z.infer<typeof authSessionSummarySchema>;
export type AuthSessionConfig = z.infer<typeof authSessionConfigSchema>;

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if session status is active
 */
export function isAuthSessionActive(status: AuthSessionStatus): boolean {
  return ACTIVE_AUTH_SESSION_STATUSES.includes(status);
}

/**
 * Check if session status is invalid
 */
export function isAuthSessionInvalid(status: AuthSessionStatus): boolean {
  return INVALID_AUTH_SESSION_STATUSES.includes(status);
}

/**
 * Check if session is valid (active or about to expire)
 */
export function isAuthSessionValid(status: AuthSessionStatus): boolean {
  return status === AUTH_SESSION_STATUS.ACTIVE || status === AUTH_SESSION_STATUS.ABOUT_TO_EXPIRE;
}

/**
 * Check if session is expired
 */
export function isAuthSessionExpired(status: AuthSessionStatus): boolean {
  return status === AUTH_SESSION_STATUS.EXPIRED;
}

/**
 * Check if session is terminated
 */
export function isAuthSessionTerminated(status: AuthSessionStatus): boolean {
  return status === AUTH_SESSION_STATUS.TERMINATED;
}

/**
 * Check if session is idle
 */
export function isAuthSessionIdle(status: AuthSessionStatus): boolean {
  return status === AUTH_SESSION_STATUS.IDLE;
}

/**
 * Check if session type is valid
 */
export function isValidAuthSessionType(type: string): type is AuthSessionType {
  return Object.values(AUTH_SESSION_TYPES).includes(type as AuthSessionType);
}

/**
 * Check if session device type is valid
 */
export function isValidAuthSessionDeviceType(
  deviceType: string
): deviceType is AuthSessionDeviceType {
  return Object.values(AUTH_SESSION_DEVICE_TYPES).includes(deviceType as AuthSessionDeviceType);
}

/**
 * Check if session platform is valid
 */
export function isValidAuthSessionPlatform(platform: string): platform is AuthSessionPlatform {
  return Object.values(AUTH_SESSION_PLATFORMS).includes(platform as AuthSessionPlatform);
}

/**
 * Check if session expiry reason is valid
 */
export function isValidAuthSessionExpiryReason(reason: string): reason is AuthSessionExpiryReason {
  return Object.values(AUTH_SESSION_EXPIRY_REASONS).includes(reason as AuthSessionExpiryReason);
}

/**
 * Get session status label
 */
export function getAuthSessionStatusLabel(status: AuthSessionStatus): string {
  const labels: Record<AuthSessionStatus, string> = {
    active: 'Active',
    expired: 'Expired',
    invalid: 'Invalid',
    terminated: 'Terminated',
    idle: 'Idle',
    about_to_expire: 'About to Expire',
  };
  return labels[status] || 'Unknown Status';
}

/**
 * Get session status message
 */
export function getAuthSessionStatusMessage(status: AuthSessionStatus): string {
  return AUTH_SESSION_STATUS_MESSAGES[status] || 'Unknown session status';
}

/**
 * Get session type label
 */
export function getAuthSessionTypeLabel(type: AuthSessionType): string {
  const labels: Record<AuthSessionType, string> = {
    web: 'Web Browser',
    mobile: 'Mobile App',
    api: 'API',
    admin: 'Admin Panel',
    vendor: 'Vendor Panel',
    service: 'Service',
  };
  return labels[type] || 'Unknown Type';
}

/**
 * Get session device label
 */
export function getAuthSessionDeviceLabel(deviceType: AuthSessionDeviceType): string {
  const labels: Record<AuthSessionDeviceType, string> = {
    desktop: 'Desktop',
    laptop: 'Laptop',
    tablet: 'Tablet',
    mobile: 'Mobile',
    tv: 'TV',
    console: 'Console',
    other: 'Other',
  };
  return labels[deviceType] || 'Unknown Device';
}

/**
 * Get session platform label
 */
export function getAuthSessionPlatformLabel(platform: AuthSessionPlatform): string {
  const labels: Record<AuthSessionPlatform, string> = {
    web: 'Web',
    android: 'Android',
    ios: 'iOS',
    react_native: 'React Native',
    api: 'API',
    admin: 'Admin Panel',
    vendor: 'Vendor Panel',
    service: 'Service',
  };
  return labels[platform] || 'Unknown Platform';
}

/**
 * Get session expiry reason label
 */
export function getAuthSessionExpiryReasonLabel(reason: AuthSessionExpiryReason): string {
  const labels: Record<AuthSessionExpiryReason, string> = {
    timeout: 'Timeout',
    idle: 'Idle Timeout',
    logout: 'User Logout',
    terminated: 'Terminated',
    admin_action: 'Admin Action',
    device_removed: 'Device Removed',
    password_changed: 'Password Changed',
    security_issue: 'Security Issue',
  };
  return labels[reason] || 'Unknown Reason';
}

/**
 * Get session expiry reason message
 */
export function getAuthSessionExpiryMessage(reason: AuthSessionExpiryReason): string {
  const messages: Record<AuthSessionExpiryReason, string> = {
    timeout: 'Session timed out',
    idle: 'Session idle timeout',
    logout: 'User logged out',
    terminated: 'Session terminated',
    admin_action: 'Session terminated by admin',
    device_removed: 'Device removed',
    password_changed: 'Password changed',
    security_issue: 'Security issue detected',
  };
  return messages[reason] || 'Unknown reason';
}

/**
 * Check if session needs renewal
 */
export function doesAuthSessionNeedRenewal(
  createdAt: Date,
  maxAge: number = AUTH_SESSION_CONFIG.MAX_AGE,
  renewalThreshold: number = AUTH_SESSION_CONFIG.RENEWAL_THRESHOLD
): boolean {
  const now = Date.now();
  const sessionAge = now - createdAt.getTime();
  return sessionAge >= maxAge - renewalThreshold;
}

/**
 * Check if session has expired by time
 */
export function isAuthSessionExpiredByTime(
  createdAt: Date,
  maxAge: number = AUTH_SESSION_CONFIG.MAX_AGE
): boolean {
  const now = Date.now();
  const sessionAge = now - createdAt.getTime();
  return sessionAge >= maxAge;
}

/**
 * Check if session is idle by time
 */
export function isAuthSessionIdleByTime(
  lastActivityAt: Date,
  idleTimeout: number = AUTH_SESSION_CONFIG.IDLE_TIMEOUT
): boolean {
  const now = Date.now();
  const idleTime = now - lastActivityAt.getTime();
  return idleTime >= idleTimeout;
}

/**
 * Get remaining session time in seconds
 */
export function getAuthSessionRemainingTime(expiresAt: Date): number {
  const now = Date.now();
  const remaining = expiresAt.getTime() - now;
  return Math.max(0, Math.floor(remaining / 1000));
}

/**
 * Check if session is about to expire
 */
export function isAuthSessionAboutToExpire(
  expiresAt: Date,
  thresholdSeconds: number = 300
): boolean {
  const remaining = getAuthSessionRemainingTime(expiresAt);
  return remaining > 0 && remaining <= thresholdSeconds;
}

/**
 * Get default session config
 */
export function getAuthDefaultSessionConfig(): AuthSessionConfig {
  return {
    timeout: AUTH_SESSION_CONFIG.TIMEOUT,
    idleTimeout: AUTH_SESSION_CONFIG.IDLE_TIMEOUT,
    extensionTime: AUTH_SESSION_CONFIG.EXTENSION_TIME,
    maxConcurrentSessions: AUTH_SESSION_CONFIG.MAX_CONCURRENT_SESSIONS,
    checkInterval: AUTH_SESSION_CONFIG.CHECK_INTERVAL,
    cleanupInterval: AUTH_SESSION_CONFIG.CLEANUP_INTERVAL,
    maxAge: AUTH_SESSION_CONFIG.MAX_AGE,
    renewalThreshold: AUTH_SESSION_CONFIG.RENEWAL_THRESHOLD,
  };
}

/**
 * Get session device type from user agent
 */
export function getAuthSessionDeviceTypeFromUserAgent(userAgent: string): AuthSessionDeviceType {
  const ua = userAgent.toLowerCase();
  if (ua.includes('mobile')) return AUTH_SESSION_DEVICE_TYPES.MOBILE;
  if (ua.includes('tablet')) return AUTH_SESSION_DEVICE_TYPES.TABLET;
  if (ua.includes('tv')) return AUTH_SESSION_DEVICE_TYPES.TV;
  if (ua.includes('console')) return AUTH_SESSION_DEVICE_TYPES.CONSOLE;
  if (ua.includes('mac') || ua.includes('windows') || ua.includes('linux')) {
    return AUTH_SESSION_DEVICE_TYPES.DESKTOP;
  }
  return AUTH_SESSION_DEVICE_TYPES.OTHER;
}

/**
 * Get session platform from user agent
 */
export function getAuthSessionPlatformFromUserAgent(userAgent: string): AuthSessionPlatform {
  const ua = userAgent.toLowerCase();
  if (ua.includes('android')) return AUTH_SESSION_PLATFORMS.ANDROID;
  if (ua.includes('ios') || ua.includes('iphone') || ua.includes('ipad')) {
    return AUTH_SESSION_PLATFORMS.IOS;
  }
  if (ua.includes('react-native')) return AUTH_SESSION_PLATFORMS.REACT_NATIVE;
  if (ua.includes('admin') || ua.includes('dashboard')) return AUTH_SESSION_PLATFORMS.ADMIN;
  if (ua.includes('vendor')) return AUTH_SESSION_PLATFORMS.VENDOR;
  if (ua.includes('service') || ua.includes('api')) return AUTH_SESSION_PLATFORMS.SERVICE;
  return AUTH_SESSION_PLATFORMS.WEB;
}

/**
 * Create session expiry reason
 */
export function createAuthSessionExpiryReason(
  reason: AuthSessionExpiryReason,
  metadata?: Record<string, unknown>
): { reason: AuthSessionExpiryReason; metadata?: Record<string, unknown> } {
  return {
    reason,
    metadata,
  };
}
