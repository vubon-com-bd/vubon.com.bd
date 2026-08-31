/**
 * Authentication Session Constants
 * Session management and configuration constants
 */

import { ERROR_CODE } from '../common/error.constants';

// ============================================================
// AUTH SESSION STATUS
// ============================================================
export const AUTH_SESSION_STATUS = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
  INVALID: 'invalid',
  TERMINATED: 'terminated',
  IDLE: 'idle',
  ABOUT_TO_EXPIRE: 'about_to_expire',
} as const;

export type AuthSessionStatus = (typeof AUTH_SESSION_STATUS)[keyof typeof AUTH_SESSION_STATUS];

// ============================================================
// AUTH SESSION TYPES
// ============================================================
export const AUTH_SESSION_TYPES = {
  WEB: 'web',
  MOBILE: 'mobile',
  API: 'api',
  ADMIN: 'admin',
  VENDOR: 'vendor',
  SERVICE: 'service',
} as const;

export type AuthSessionType = (typeof AUTH_SESSION_TYPES)[keyof typeof AUTH_SESSION_TYPES];

// ============================================================
// AUTH SESSION CONFIG
// ============================================================
export const AUTH_SESSION_CONFIG = {
  TIMEOUT: 86400000,
  IDLE_TIMEOUT: 1800000,
  EXTENSION_TIME: 300000,
  MAX_CONCURRENT_SESSIONS: 5,
  CHECK_INTERVAL: 60000,
  CLEANUP_INTERVAL: 3600000,
  MAX_AGE: 604800000,
  RENEWAL_THRESHOLD: 3600000,
} as const;

export type AuthSessionConfig = (typeof AUTH_SESSION_CONFIG)[keyof typeof AUTH_SESSION_CONFIG];

// ============================================================
// AUTH SESSION ERRORS
// ============================================================
export const AUTH_SESSION_ERRORS = {
  SESSION_EXPIRED: ERROR_CODE.EXPIRED_SESSION,
  SESSION_INVALID: ERROR_CODE.INVALID_SESSION,
  SESSION_NOT_FOUND: ERROR_CODE.SESSION_NOT_FOUND,
  SESSION_TERMINATED: 'Session has been terminated',
  SESSION_IDLE: 'Session is idle and needs to be reactivated',
  SESSION_LIMIT_EXCEEDED: 'Maximum concurrent sessions exceeded',
  SESSION_CREATION_FAILED: 'Failed to create session',
  SESSION_REFRESH_FAILED: 'Failed to refresh session',
  SESSION_TERMINATION_FAILED: 'Failed to terminate session',
  INVALID_SESSION_ID: 'Invalid session ID',
  SESSION_ALREADY_EXISTS: 'Session already exists',
  SESSION_DEVICE_MISMATCH: 'Session device mismatch',
  SESSION_IP_MISMATCH: 'Session IP address mismatch',
  SESSION_USER_AGENT_MISMATCH: 'Session user agent mismatch',
} as const;

export type AuthSessionError = (typeof AUTH_SESSION_ERRORS)[keyof typeof AUTH_SESSION_ERRORS];

// ============================================================
// AUTH SESSION SUCCESS
// ============================================================
export const AUTH_SESSION_SUCCESS = {
  CREATED: 'Session created successfully',
  REFRESHED: 'Session refreshed successfully',
  TERMINATED: 'Session terminated successfully',
  EXTENDED: 'Session extended successfully',
  VALIDATED: 'Session validated successfully',
} as const;

export type AuthSessionSuccess = (typeof AUTH_SESSION_SUCCESS)[keyof typeof AUTH_SESSION_SUCCESS];

// ============================================================
// AUTH SESSION STATUS MESSAGES
// ============================================================
export const AUTH_SESSION_STATUS_MESSAGES: Record<AuthSessionStatus, string> = {
  [AUTH_SESSION_STATUS.ACTIVE]: 'Session is active',
  [AUTH_SESSION_STATUS.EXPIRED]: 'Session has expired',
  [AUTH_SESSION_STATUS.INVALID]: 'Session is invalid',
  [AUTH_SESSION_STATUS.TERMINATED]: 'Session has been terminated',
  [AUTH_SESSION_STATUS.IDLE]: 'Session is idle',
  [AUTH_SESSION_STATUS.ABOUT_TO_EXPIRE]: 'Session is about to expire',
} as const;

// ============================================================
// AUTH SESSION STATUS HTTP MAP
// ============================================================
export const AUTH_SESSION_STATUS_HTTP_MAP: Record<AuthSessionStatus, number> = {
  [AUTH_SESSION_STATUS.ACTIVE]: 200,
  [AUTH_SESSION_STATUS.EXPIRED]: 401,
  [AUTH_SESSION_STATUS.INVALID]: 401,
  [AUTH_SESSION_STATUS.TERMINATED]: 401,
  [AUTH_SESSION_STATUS.IDLE]: 401,
  [AUTH_SESSION_STATUS.ABOUT_TO_EXPIRE]: 200,
} as const;

// ============================================================
// ACTIVE AUTH SESSION STATUSES
// ============================================================
export const ACTIVE_AUTH_SESSION_STATUSES: AuthSessionStatus[] = [
  AUTH_SESSION_STATUS.ACTIVE,
  AUTH_SESSION_STATUS.ABOUT_TO_EXPIRE,
] as const;

// ============================================================
// INVALID AUTH SESSION STATUSES
// ============================================================
export const INVALID_AUTH_SESSION_STATUSES: AuthSessionStatus[] = [
  AUTH_SESSION_STATUS.EXPIRED,
  AUTH_SESSION_STATUS.INVALID,
  AUTH_SESSION_STATUS.TERMINATED,
  AUTH_SESSION_STATUS.IDLE,
] as const;

// ============================================================
// AUTH SESSION DEVICE TYPES
// ============================================================
export const AUTH_SESSION_DEVICE_TYPES = {
  DESKTOP: 'desktop',
  LAPTOP: 'laptop',
  TABLET: 'tablet',
  MOBILE: 'mobile',
  TV: 'tv',
  CONSOLE: 'console',
  OTHER: 'other',
} as const;

export type AuthSessionDeviceType =
  (typeof AUTH_SESSION_DEVICE_TYPES)[keyof typeof AUTH_SESSION_DEVICE_TYPES];

// ============================================================
// AUTH SESSION PLATFORMS
// ============================================================
export const AUTH_SESSION_PLATFORMS = {
  WEB: 'web',
  ANDROID: 'android',
  IOS: 'ios',
  REACT_NATIVE: 'react_native',
  API: 'api',
  ADMIN: 'admin',
  VENDOR: 'vendor',
  SERVICE: 'service',
} as const;

export type AuthSessionPlatform =
  (typeof AUTH_SESSION_PLATFORMS)[keyof typeof AUTH_SESSION_PLATFORMS];

// ============================================================
// AUTH SESSION EXPIRY REASONS
// ============================================================
export const AUTH_SESSION_EXPIRY_REASONS = {
  TIMEOUT: 'timeout',
  IDLE: 'idle',
  LOGOUT: 'logout',
  TERMINATED: 'terminated',
  ADMIN_ACTION: 'admin_action',
  DEVICE_REMOVED: 'device_removed',
  PASSWORD_CHANGED: 'password_changed',
  SECURITY_ISSUE: 'security_issue',
} as const;

export type AuthSessionExpiryReason =
  (typeof AUTH_SESSION_EXPIRY_REASONS)[keyof typeof AUTH_SESSION_EXPIRY_REASONS];

// ============================================================
// AUTH SESSION MAIN OBJECT
// ============================================================
export const authSession = {
  STATUS: AUTH_SESSION_STATUS,
  TYPES: AUTH_SESSION_TYPES,
  CONFIG: AUTH_SESSION_CONFIG,
  ERRORS: AUTH_SESSION_ERRORS,
  SUCCESS: AUTH_SESSION_SUCCESS,
  STATUS_MESSAGES: AUTH_SESSION_STATUS_MESSAGES,
  STATUS_HTTP_MAP: AUTH_SESSION_STATUS_HTTP_MAP,
  ACTIVE_STATUSES: ACTIVE_AUTH_SESSION_STATUSES,
  INVALID_STATUSES: INVALID_AUTH_SESSION_STATUSES,
  DEVICE_TYPES: AUTH_SESSION_DEVICE_TYPES,
  PLATFORMS: AUTH_SESSION_PLATFORMS,
  EXPIRY_REASONS: AUTH_SESSION_EXPIRY_REASONS,
} as const;

export type AuthSession = typeof authSession;

// ============================================================
// HELPER FUNCTIONS
// ============================================================
export function isActiveAuthSessionStatus(status: AuthSessionStatus): boolean {
  return ACTIVE_AUTH_SESSION_STATUSES.includes(status);
}

export function isInvalidAuthSessionStatus(status: AuthSessionStatus): boolean {
  return INVALID_AUTH_SESSION_STATUSES.includes(status);
}

export function isValidAuthSessionStatus(status: string): status is AuthSessionStatus {
  return Object.values(AUTH_SESSION_STATUS).includes(status as AuthSessionStatus);
}

export function getAuthSessionStatusMessage(status: AuthSessionStatus): string {
  return AUTH_SESSION_STATUS_MESSAGES[status] || 'Unknown session status';
}

export function getHttpStatusForAuthSessionStatus(status: AuthSessionStatus): number {
  return AUTH_SESSION_STATUS_HTTP_MAP[status] || 500;
}

export function isValidAuthSession(status: AuthSessionStatus): boolean {
  return status === AUTH_SESSION_STATUS.ACTIVE || status === AUTH_SESSION_STATUS.ABOUT_TO_EXPIRE;
}

export function needsAuthSessionRenewal(
  createdAt: Date,
  sessionConfig: typeof AUTH_SESSION_CONFIG
): boolean {
  const now = Date.now();
  const sessionAge = now - createdAt.getTime();
  return sessionAge >= sessionConfig.MAX_AGE - sessionConfig.RENEWAL_THRESHOLD;
}

export function isAuthSessionExpired(
  createdAt: Date,
  sessionConfig: typeof AUTH_SESSION_CONFIG
): boolean {
  const now = Date.now();
  const sessionAge = now - createdAt.getTime();
  return sessionAge >= sessionConfig.MAX_AGE;
}

export function isAuthSessionIdle(
  lastActivityAt: Date,
  sessionConfig: typeof AUTH_SESSION_CONFIG
): boolean {
  const now = Date.now();
  const idleTime = now - lastActivityAt.getTime();
  return idleTime >= sessionConfig.IDLE_TIMEOUT;
}

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

export function getAuthSessionExpiryReasonMessage(reason: AuthSessionExpiryReason): string {
  const messages: Record<AuthSessionExpiryReason, string> = {
    [AUTH_SESSION_EXPIRY_REASONS.TIMEOUT]: 'Session timed out',
    [AUTH_SESSION_EXPIRY_REASONS.IDLE]: 'Session idle timeout',
    [AUTH_SESSION_EXPIRY_REASONS.LOGOUT]: 'User logged out',
    [AUTH_SESSION_EXPIRY_REASONS.TERMINATED]: 'Session terminated',
    [AUTH_SESSION_EXPIRY_REASONS.ADMIN_ACTION]: 'Terminated by admin',
    [AUTH_SESSION_EXPIRY_REASONS.DEVICE_REMOVED]: 'Device removed',
    [AUTH_SESSION_EXPIRY_REASONS.PASSWORD_CHANGED]: 'Password changed',
    [AUTH_SESSION_EXPIRY_REASONS.SECURITY_ISSUE]: 'Security issue detected',
  };
  return messages[reason] || 'Unknown reason';
}
