/**
 * Authentication Session Constants
 * Session management and configuration constants
 */

import { ERROR_CODE } from '../common/error.constants';

/**
 * Session Status
 * Current status of a user session
 */
export const SESSION_STATUS = {
  /** Session is active and valid */
  ACTIVE: 'active',
  /** Session has expired */
  EXPIRED: 'expired',
  /** Session is invalid */
  INVALID: 'invalid',
  /** Session has been terminated */
  TERMINATED: 'terminated',
  /** Session is idle (inactive for a while) */
  IDLE: 'idle',
  /** Session is about to expire */
  ABOUT_TO_EXPIRE: 'about_to_expire',
} as const;

export type SessionStatus = (typeof SESSION_STATUS)[keyof typeof SESSION_STATUS];

/**
 * Session Type
 * Different types of sessions
 */
export const SESSION_TYPES = {
  /** Web browser session */
  WEB: 'web',
  /** Mobile app session */
  MOBILE: 'mobile',
  /** API token session */
  API: 'api',
  /** Admin panel session */
  ADMIN: 'admin',
  /** Vendor panel session */
  VENDOR: 'vendor',
  /** Service-to-service session */
  SERVICE: 'service',
} as const;

export type SessionType = (typeof SESSION_TYPES)[keyof typeof SESSION_TYPES];

/**
 * Session Configuration
 * Default configuration values for sessions
 */
export const SESSION_CONFIG = {
  /** Session timeout in milliseconds (24 hours) */
  TIMEOUT: 86400000,
  /** Session idle timeout in milliseconds (30 minutes) */
  IDLE_TIMEOUT: 1800000,
  /** Session extension time in milliseconds (5 minutes) */
  EXTENSION_TIME: 300000,
  /** Maximum concurrent sessions per user */
  MAX_CONCURRENT_SESSIONS: 5,
  /** Session check interval in milliseconds (1 minute) */
  CHECK_INTERVAL: 60000,
  /** Session cleanup interval in milliseconds (1 hour) */
  CLEANUP_INTERVAL: 3600000,
  /** Maximum session age in milliseconds (7 days) */
  MAX_AGE: 604800000,
  /** Session renewal threshold in milliseconds (1 hour before expiry) */
  RENEWAL_THRESHOLD: 3600000,
} as const;

export type SessionConfig = (typeof SESSION_CONFIG)[keyof typeof SESSION_CONFIG];

/**
 * Session Error Messages
 * Error messages for session-related failures
 */
export const SESSION_ERRORS = {
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

export type SessionError = (typeof SESSION_ERRORS)[keyof typeof SESSION_ERRORS];

/**
 * Session Success Messages
 * Success messages for session operations
 */
export const SESSION_SUCCESS = {
  CREATED: 'Session created successfully',
  REFRESHED: 'Session refreshed successfully',
  TERMINATED: 'Session terminated successfully',
  EXTENDED: 'Session extended successfully',
  VALIDATED: 'Session validated successfully',
} as const;

export type SessionSuccess = (typeof SESSION_SUCCESS)[keyof typeof SESSION_SUCCESS];

/**
 * Session Status Messages
 * Human-readable messages for each session status
 */
export const SESSION_STATUS_MESSAGES: Record<SessionStatus, string> = {
  [SESSION_STATUS.ACTIVE]: 'Session is active',
  [SESSION_STATUS.EXPIRED]: 'Session has expired',
  [SESSION_STATUS.INVALID]: 'Session is invalid',
  [SESSION_STATUS.TERMINATED]: 'Session has been terminated',
  [SESSION_STATUS.IDLE]: 'Session is idle',
  [SESSION_STATUS.ABOUT_TO_EXPIRE]: 'Session is about to expire',
} as const;

/**
 * Session Status HTTP Status Mapping
 * Maps session status to HTTP status codes
 */
export const SESSION_STATUS_HTTP_MAP: Record<SessionStatus, number> = {
  [SESSION_STATUS.ACTIVE]: 200,
  [SESSION_STATUS.EXPIRED]: 401,
  [SESSION_STATUS.INVALID]: 401,
  [SESSION_STATUS.TERMINATED]: 401,
  [SESSION_STATUS.IDLE]: 401,
  [SESSION_STATUS.ABOUT_TO_EXPIRE]: 200,
} as const;

/**
 * Active Session Statuses
 * Statuses that indicate a valid session
 */
export const ACTIVE_SESSION_STATUSES: SessionStatus[] = [
  SESSION_STATUS.ACTIVE,
  SESSION_STATUS.ABOUT_TO_EXPIRE,
] as const;

/**
 * Invalid Session Statuses
 * Statuses that indicate an invalid session
 */
export const INVALID_SESSION_STATUSES: SessionStatus[] = [
  SESSION_STATUS.EXPIRED,
  SESSION_STATUS.INVALID,
  SESSION_STATUS.TERMINATED,
  SESSION_STATUS.IDLE,
] as const;

/**
 * Session Device Types
 * Types of devices used for sessions
 */
export const SESSION_DEVICE_TYPES = {
  DESKTOP: 'desktop',
  LAPTOP: 'laptop',
  TABLET: 'tablet',
  MOBILE: 'mobile',
  TV: 'tv',
  CONSOLE: 'console',
  OTHER: 'other',
} as const;

export type SessionDeviceType = (typeof SESSION_DEVICE_TYPES)[keyof typeof SESSION_DEVICE_TYPES];

/**
 * Session Platforms
 * Platforms where sessions can be created
 */
export const SESSION_PLATFORMS = {
  WEB: 'web',
  ANDROID: 'android',
  IOS: 'ios',
  REACT_NATIVE: 'react_native',
  API: 'api',
  ADMIN: 'admin',
  VENDOR: 'vendor',
  SERVICE: 'service',
} as const;

export type SessionPlatform = (typeof SESSION_PLATFORMS)[keyof typeof SESSION_PLATFORMS];

/**
 * Session Expiry Reasons
 * Reasons why a session might expire
 */
export const SESSION_EXPIRY_REASONS = {
  TIMEOUT: 'timeout',
  IDLE: 'idle',
  LOGOUT: 'logout',
  TERMINATED: 'terminated',
  ADMIN_ACTION: 'admin_action',
  DEVICE_REMOVED: 'device_removed',
  PASSWORD_CHANGED: 'password_changed',
  SECURITY_ISSUE: 'security_issue',
} as const;

export type SessionExpiryReason =
  (typeof SESSION_EXPIRY_REASONS)[keyof typeof SESSION_EXPIRY_REASONS];

/**
 * Helper function to check if session status is active
 */
export function isActiveSessionStatus(status: SessionStatus): boolean {
  return ACTIVE_SESSION_STATUSES.includes(status);
}

/**
 * Helper function to check if session status is invalid
 */
export function isInvalidSessionStatus(status: SessionStatus): boolean {
  return INVALID_SESSION_STATUSES.includes(status);
}

/**
 * Helper function to check if session status is valid
 */
export function isValidSessionStatus(status: string): status is SessionStatus {
  return Object.values(SESSION_STATUS).includes(status as SessionStatus);
}

/**
 * Helper function to get session status message
 */
export function getSessionStatusMessage(status: SessionStatus): string {
  return SESSION_STATUS_MESSAGES[status] || 'Unknown session status';
}

/**
 * Helper function to get HTTP status for session status
 */
export function getHttpStatusForSessionStatus(status: SessionStatus): number {
  return SESSION_STATUS_HTTP_MAP[status] || 500;
}

/**
 * Helper function to check if session is valid
 */
export function isValidSession(status: SessionStatus): boolean {
  return status === SESSION_STATUS.ACTIVE || status === SESSION_STATUS.ABOUT_TO_EXPIRE;
}

/**
 * Helper function to check if session needs renewal
 */
export function needsSessionRenewal(
  createdAt: Date,
  sessionConfig: typeof SESSION_CONFIG
): boolean {
  const now = Date.now();
  const sessionAge = now - createdAt.getTime();
  return sessionAge >= sessionConfig.MAX_AGE - sessionConfig.RENEWAL_THRESHOLD;
}

/**
 * Helper function to check if session has expired
 */
export function isSessionExpired(createdAt: Date, sessionConfig: typeof SESSION_CONFIG): boolean {
  const now = Date.now();
  const sessionAge = now - createdAt.getTime();
  return sessionAge >= sessionConfig.MAX_AGE;
}

/**
 * Helper function to check if session is idle
 */
export function isSessionIdle(lastActivityAt: Date, sessionConfig: typeof SESSION_CONFIG): boolean {
  const now = Date.now();
  const idleTime = now - lastActivityAt.getTime();
  return idleTime >= sessionConfig.IDLE_TIMEOUT;
}

/**
 * Helper function to get session device type from user agent
 * Simple detection based on user agent string
 */
export function getSessionDeviceTypeFromUserAgent(userAgent: string): SessionDeviceType {
  const ua = userAgent.toLowerCase();
  if (ua.includes('mobile')) return SESSION_DEVICE_TYPES.MOBILE;
  if (ua.includes('tablet')) return SESSION_DEVICE_TYPES.TABLET;
  if (ua.includes('tv')) return SESSION_DEVICE_TYPES.TV;
  if (ua.includes('console')) return SESSION_DEVICE_TYPES.CONSOLE;
  if (ua.includes('mac') || ua.includes('windows') || ua.includes('linux')) {
    return SESSION_DEVICE_TYPES.DESKTOP;
  }
  return SESSION_DEVICE_TYPES.OTHER;
}

/**
 * Helper function to get session platform from user agent
 */
export function getSessionPlatformFromUserAgent(userAgent: string): SessionPlatform {
  const ua = userAgent.toLowerCase();
  if (ua.includes('android')) return SESSION_PLATFORMS.ANDROID;
  if (ua.includes('ios') || ua.includes('iphone') || ua.includes('ipad')) {
    return SESSION_PLATFORMS.IOS;
  }
  if (ua.includes('react-native')) return SESSION_PLATFORMS.REACT_NATIVE;
  if (ua.includes('admin') || ua.includes('dashboard')) return SESSION_PLATFORMS.ADMIN;
  if (ua.includes('vendor')) return SESSION_PLATFORMS.VENDOR;
  if (ua.includes('service') || ua.includes('api')) return SESSION_PLATFORMS.SERVICE;
  return SESSION_PLATFORMS.WEB;
}

/**
 * Helper function to format session expiry reason
 */
export function getSessionExpiryReasonMessage(reason: SessionExpiryReason): string {
  const messages: Record<SessionExpiryReason, string> = {
    [SESSION_EXPIRY_REASONS.TIMEOUT]: 'Session timed out',
    [SESSION_EXPIRY_REASONS.IDLE]: 'Session idle timeout',
    [SESSION_EXPIRY_REASONS.LOGOUT]: 'User logged out',
    [SESSION_EXPIRY_REASONS.TERMINATED]: 'Session terminated',
    [SESSION_EXPIRY_REASONS.ADMIN_ACTION]: 'Terminated by admin',
    [SESSION_EXPIRY_REASONS.DEVICE_REMOVED]: 'Device removed',
    [SESSION_EXPIRY_REASONS.PASSWORD_CHANGED]: 'Password changed',
    [SESSION_EXPIRY_REASONS.SECURITY_ISSUE]: 'Security issue detected',
  };
  return messages[reason] || 'Unknown reason';
}
