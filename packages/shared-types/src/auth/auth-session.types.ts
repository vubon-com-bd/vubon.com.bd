/**
 * Authentication Session Types
 * Types for session management, tracking, and lifecycle
 */

import type {
  AuthSessionStatus,
  AuthSessionType,
  AuthSessionDeviceType,
  AuthSessionPlatform,
  AuthSessionExpiryReason,
} from '@vubon/shared-constants';
import {
  AUTH_SESSION_STATUS,
  AUTH_SESSION_TYPES,
  AUTH_SESSION_CONFIG,
  AUTH_SESSION_DEVICE_TYPES,
  AUTH_SESSION_PLATFORMS,
  AUTH_SESSION_EXPIRY_REASONS,
  ACTIVE_AUTH_SESSION_STATUSES,
  INVALID_AUTH_SESSION_STATUSES,
} from '@vubon/shared-constants';
import type { ID, Timestamp } from '../common/core-primitives.types';
import type { AuthIPAddress, AuthUserAgent } from './auth-login-attempt.types';

// ============================================================
// SESSION RECORD
// ============================================================

/**
 * Complete session record
 */
export interface AuthSession {
  /** Unique session ID */
  id: ID;
  /** User ID */
  userId: ID;
  /** Session token (hashed) */
  tokenHash: string;
  /** Session status */
  status: AuthSessionStatus;
  /** Session type */
  type: AuthSessionType;
  /** Session device type */
  deviceType: AuthSessionDeviceType;
  /** Session platform */
  platform: AuthSessionPlatform;
  /** Device ID (if known) */
  deviceId?: ID;
  /** IP address of the session */
  ipAddress: AuthIPAddress;
  /** User agent of the session */
  userAgent: AuthUserAgent;
  /** Session location */
  location?: {
    country?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
  };
  /** When the session was created */
  createdAt: Timestamp;
  /** When the session was last active */
  lastActivityAt: Timestamp;
  /** When the session expires */
  expiresAt: Timestamp;
  /** When the session was terminated (if applicable) */
  terminatedAt?: Timestamp;
  /** Reason for expiry/termination */
  expiryReason?: AuthSessionExpiryReason;
  /** Session metadata */
  metadata?: Record<string, unknown>;
  /** Whether the session is active */
  isActive: boolean;
  /** Whether the session is remembered (persistent) */
  isRemembered: boolean;
}

// ============================================================
// SESSION REQUEST
// ============================================================

/**
 * Request to create a session
 */
export interface AuthSessionCreateRequest {
  /** User ID */
  userId: ID;
  /** Session type */
  type: AuthSessionType;
  /** Device ID (if known) */
  deviceId?: ID;
  /** IP address */
  ipAddress: AuthIPAddress;
  /** User agent */
  userAgent: AuthUserAgent;
  /** Location information */
  location?: {
    country?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
  };
  /** Whether to remember the session */
  remember?: boolean;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Request to update a session
 */
export interface AuthSessionUpdateRequest {
  /** Session ID */
  sessionId: ID;
  /** New IP address (if changed) */
  ipAddress?: AuthIPAddress;
  /** New user agent (if changed) */
  userAgent?: AuthUserAgent;
  /** New location (if changed) */
  location?: {
    country?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
  };
  /** Update last activity timestamp */
  updateActivity?: boolean;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Request to terminate a session
 */
export interface AuthSessionTerminateRequest {
  /** Session ID */
  sessionId: ID;
  /** Reason for termination */
  reason?: AuthSessionExpiryReason;
  /** Who is terminating the session */
  terminatedBy?: ID | 'user' | 'admin' | 'system';
}

// ============================================================
// SESSION RESPONSE
// ============================================================

/**
 * Session operation response
 */
export interface AuthSessionResponse {
  /** Whether the operation was successful */
  success: boolean;
  /** Session record (if applicable) */
  session?: AuthSession;
  /** Session token (only on creation) */
  token?: string;
  /** Error message if failed */
  error?: string;
}

/**
 * Session validation response
 */
export interface AuthSessionValidationResponse {
  /** Whether the session is valid */
  isValid: boolean;
  /** Session status */
  status: AuthSessionStatus;
  /** Session record (if found) */
  session?: AuthSession;
  /** Whether the session needs renewal */
  needsRenewal: boolean;
  /** Remaining time in seconds */
  remainingSeconds: number;
}

// ============================================================
// SESSION FILTER
// ============================================================

/**
 * Filter for querying sessions
 */
export interface AuthSessionFilter {
  /** Filter by user ID */
  userId?: ID;
  /** Filter by session status */
  status?: AuthSessionStatus | AuthSessionStatus[];
  /** Filter by session type */
  type?: AuthSessionType | AuthSessionType[];
  /** Filter by device type */
  deviceType?: AuthSessionDeviceType | AuthSessionDeviceType[];
  /** Filter by platform */
  platform?: AuthSessionPlatform | AuthSessionPlatform[];
  /** Filter by device ID */
  deviceId?: ID;
  /** Filter by IP address */
  ipAddress?: AuthIPAddress;
  /** Filter by active sessions only */
  activeOnly?: boolean;
  /** Filter by remembered sessions */
  rememberedOnly?: boolean;
  /** Filter by date range (created) */
  createdDateRange?: {
    start?: Date;
    end?: Date;
  };
}

// ============================================================
// SESSION SUMMARY
// ============================================================

/**
 * Session summary for a user
 */
export interface AuthSessionSummary {
  /** User ID */
  userId: ID;
  /** Total number of sessions */
  totalSessions: number;
  /** Number of active sessions */
  activeSessions: number;
  /** Number of expired sessions */
  expiredSessions: number;
  /** Number of terminated sessions */
  terminatedSessions: number;
  /** Current session (if any) */
  currentSession?: AuthSession;
  /** Active sessions */
  sessions: AuthSession[];
  /** Sessions by type */
  sessionsByType: Record<AuthSessionType, number>;
  /** Sessions by device type */
  sessionsByDevice: Record<AuthSessionDeviceType, number>;
  /** Sessions by platform */
  sessionsByPlatform: Record<AuthSessionPlatform, number>;
}

// ============================================================
// SESSION CONFIG
// ============================================================

/**
 * Session configuration
 */
export interface AuthSessionConfig {
  /** Session timeout in milliseconds */
  timeout: number;
  /** Idle timeout in milliseconds */
  idleTimeout: number;
  /** Extension time in milliseconds */
  extensionTime: number;
  /** Maximum concurrent sessions per user */
  maxConcurrentSessions: number;
  /** Session check interval in milliseconds */
  checkInterval: number;
  /** Cleanup interval in milliseconds */
  cleanupInterval: number;
  /** Maximum session age in milliseconds */
  maxAge: number;
  /** Renewal threshold in milliseconds */
  renewalThreshold: number;
}

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
 * Get human-readable label for session status
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
 * Get human-readable label for session type
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
 * Get human-readable label for session device type
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
 * Get human-readable label for session platform
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
 * Get human-readable label for expiry reason
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
 * Check if session has expired
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
 * Check if session is idle
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
 * Get all valid session types
 */
export function getAllAuthSessionTypes(): AuthSessionType[] {
  return Object.values(AUTH_SESSION_TYPES);
}

/**
 * Get all valid session device types
 */
export function getAllAuthSessionDeviceTypes(): AuthSessionDeviceType[] {
  return Object.values(AUTH_SESSION_DEVICE_TYPES);
}

/**
 * Get all valid session platforms
 */
export function getAllAuthSessionPlatforms(): AuthSessionPlatform[] {
  return Object.values(AUTH_SESSION_PLATFORMS);
}

/**
 * Get all valid session expiry reasons
 */
export function getAllAuthSessionExpiryReasons(): AuthSessionExpiryReason[] {
  return Object.values(AUTH_SESSION_EXPIRY_REASONS);
}
