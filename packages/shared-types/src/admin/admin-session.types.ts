/**
 * Admin Session Types
 * Session management definitions
 */

import { BaseEntity, ID, Timestamp, Nullable, JsonObject } from '../common/core-primitives.types';
import type { AdminRole } from './admin-role.types';
import type { AdminPermissionString } from './admin-permission.types';

/**
 * Session status type
 * Based on SESSION_STATUS from constants
 */
export type AdminSessionStatus =
  'active' | 'expired' | 'revoked' | 'terminated' | 'suspended' | 'pending' | 'validating';

/**
 * Session type
 * Based on SESSION_TYPE from constants
 */
export type AdminSessionType =
  'web' | 'mobile' | 'api' | 'admin' | 'service' | 'system' | 'token' | 'refresh';

/**
 * Session security level
 * Based on SESSION_SECURITY from constants
 */
export type AdminSessionSecurityLevel = 0 | 1 | 2 | 3;

/**
 * Session data keys
 */
export type AdminSessionDataKey =
  | 'userId'
  | 'adminId'
  | 'role'
  | 'permissions'
  | 'ip'
  | 'userAgent'
  | 'deviceId'
  | 'location'
  | 'lastActivity'
  | 'createdAt'
  | 'expiresAt';

/**
 * Session event type
 * Based on SESSION_EVENT from constants
 */
export type AdminSessionEvent =
  | 'session.created'
  | 'session.validated'
  | 'session.refreshed'
  | 'session.expired'
  | 'session.revoked'
  | 'session.terminated'
  | 'session.suspended'
  | 'session.resumed'
  | 'session.extended';

/**
 * Session error code
 * Based on SESSION_ERROR from constants
 */
export type AdminSessionErrorCode =
  | 'ERR_SESSION_001'
  | 'ERR_SESSION_002'
  | 'ERR_SESSION_003'
  | 'ERR_SESSION_004'
  | 'ERR_SESSION_005'
  | 'ERR_SESSION_006'
  | 'ERR_SESSION_007'
  | 'ERR_SESSION_008';

/**
 * Admin session interface
 * Represents an admin session
 */
export interface AdminSession extends BaseEntity {
  /** Session ID (token ID) */
  id: ID;
  /** Admin ID associated with session */
  adminId: ID;
  /** Session type */
  type: AdminSessionType;
  /** Session status */
  status: AdminSessionStatus;
  /** Security level */
  securityLevel: AdminSessionSecurityLevel;
  /** Session token (hashed) */
  tokenHash: string;
  /** Refresh token (hashed) */
  refreshTokenHash?: Nullable<string>;
  /** Session duration in seconds */
  duration: number;
  /** Admin role at session creation */
  role: AdminRole;
  /** Admin permissions at session creation */
  permissions: AdminPermissionString[];
  /** IP address */
  ipAddress: string;
  /** User agent */
  userAgent: string;
  /** Device ID */
  deviceId?: Nullable<string>;
  /** Location information */
  location?: Nullable<{
    country?: string;
    city?: string;
    lat?: number;
    lng?: number;
  }>;
  /** Last activity timestamp */
  lastActivityAt: Timestamp;
  /** Expiry timestamp */
  expiresAt: Timestamp;
  /** Additional metadata */
  metadata?: Nullable<JsonObject>;
  /** Whether session is validated */
  isValidated: boolean;
  /** Validation timestamp */
  validatedAt?: Nullable<Timestamp>;
  /** Whether session is revoked */
  isRevoked: boolean;
  /** Revocation reason */
  revocationReason?: Nullable<string>;
  /** Whether session is terminated */
  isTerminated: boolean;
  /** Termination reason */
  terminationReason?: Nullable<string>;
  /** Whether session is suspended */
  isSuspended: boolean;
  /** Suspension reason */
  suspensionReason?: Nullable<string>;
  /** Suspension expiry (if temporary) */
  suspensionExpiry?: Nullable<Timestamp>;
}

/**
 * Session create data
 */
export interface AdminSessionCreateData {
  /** Admin ID */
  adminId: ID;
  /** Session type */
  type: AdminSessionType;
  /** Session duration in seconds */
  duration: number;
  /** Admin role */
  role: AdminRole;
  /** Admin permissions */
  permissions: AdminPermissionString[];
  /** IP address */
  ipAddress: string;
  /** User agent */
  userAgent: string;
  /** Device ID */
  deviceId?: string;
  /** Location information */
  location?: {
    country?: string;
    city?: string;
    lat?: number;
    lng?: number;
  };
  /** Additional metadata */
  metadata?: JsonObject;
}

/**
 * Session update data
 */
export interface AdminSessionUpdateData {
  /** Session status */
  status?: AdminSessionStatus;
  /** Security level */
  securityLevel?: AdminSessionSecurityLevel;
  /** Last activity timestamp */
  lastActivityAt?: Timestamp;
  /** Expiry timestamp */
  expiresAt?: Timestamp;
  /** Whether session is validated */
  isValidated?: boolean;
  /** Whether session is revoked */
  isRevoked?: boolean;
  /** Revocation reason */
  revocationReason?: string;
  /** Whether session is terminated */
  isTerminated?: boolean;
  /** Termination reason */
  terminationReason?: string;
  /** Whether session is suspended */
  isSuspended?: boolean;
  /** Suspension reason */
  suspensionReason?: string;
  /** Suspension expiry */
  suspensionExpiry?: Timestamp;
}

/**
 * Session filter parameters
 */
export interface AdminSessionFilterParams {
  /** Filter by admin ID */
  adminId?: ID;
  /** Filter by session type */
  type?: AdminSessionType | AdminSessionType[];
  /** Filter by status */
  status?: AdminSessionStatus | AdminSessionStatus[];
  /** Filter by security level */
  securityLevel?: AdminSessionSecurityLevel | AdminSessionSecurityLevel[];
  /** Filter by device ID */
  deviceId?: string;
  /** Filter by IP address */
  ipAddress?: string;
  /** Filter by validated status */
  isValidated?: boolean;
  /** Filter by revoked status */
  isRevoked?: boolean;
  /** Filter by terminated status */
  isTerminated?: boolean;
  /** Filter by suspended status */
  isSuspended?: boolean;
  /** Filter by session age (created after) */
  createdAfter?: Date;
  /** Filter by session age (created before) */
  createdBefore?: Date;
  /** Filter by expiry (expires after) */
  expiresAfter?: Date;
  /** Filter by expiry (expires before) */
  expiresBefore?: Date;
  /** Filter by last activity (after) */
  activeAfter?: Date;
  /** Filter by last activity (before) */
  activeBefore?: Date;
}

/**
 * Session statistics
 */
export interface AdminSessionStatistics {
  /** Total number of sessions */
  totalSessions: number;
  /** Count by type */
  typeCounts: Record<AdminSessionType, number>;
  /** Count by status */
  statusCounts: Record<AdminSessionStatus, number>;
  /** Count by security level */
  securityLevelCounts: Record<AdminSessionSecurityLevel, number>;
  /** Active sessions count */
  activeSessions: number;
  /** Expired sessions count */
  expiredSessions: number;
  /** Revoked sessions count */
  revokedSessions: number;
  /** Terminated sessions count */
  terminatedSessions: number;
  /** Suspended sessions count */
  suspendedSessions: number;
  /** Average session duration (seconds) */
  averageDuration: number;
  /** Maximum concurrent sessions */
  maxConcurrentSessions: number;
}

/**
 * Session validation result
 */
export interface AdminSessionValidationResult {
  /** Whether session is valid */
  isValid: boolean;
  /** Session if valid */
  session?: AdminSession;
  /** Error code if invalid */
  errorCode?: AdminSessionErrorCode;
  /** Error message if invalid */
  errorMessage?: string;
  /** Whether session needs renewal */
  needsRenewal?: boolean;
  /** Time until renewal needed (seconds) */
  timeUntilRenewal?: number;
}

/**
 * Get session duration label
 */
export function getAdminSessionDurationLabel(duration: number): string {
  const labels: Record<number, string> = {
    300: 'OTP Session',
    900: 'Short Session',
    1800: 'Medium Session',
    3600: 'Standard Session',
    14400: 'Extended Session',
    28800: 'Work Session',
    43200: 'Long Session',
    86400: 'Day Session',
    604800: 'Week Session',
    2592000: 'Month Session',
  };
  return labels[duration] || 'Custom Session';
}

/**
 * Check if session is active
 */
export function isAdminSessionActive(status: AdminSessionStatus): boolean {
  return status === 'active' || status === 'validating';
}

/**
 * Check if session is invalid
 */
export function isAdminSessionInvalid(status: AdminSessionStatus): boolean {
  return (
    status === 'expired' ||
    status === 'revoked' ||
    status === 'terminated' ||
    status === 'suspended'
  );
}

/**
 * Get session status color
 */
export function getAdminSessionStatusColor(status: AdminSessionStatus): string {
  const colors: Record<AdminSessionStatus, string> = {
    active: 'success',
    expired: 'default',
    revoked: 'error',
    terminated: 'error',
    suspended: 'warning',
    pending: 'warning',
    validating: 'info',
  };
  return colors[status] || 'default';
}

/**
 * Get session status label
 */
export function getAdminSessionStatusLabel(status: AdminSessionStatus): string {
  const labels: Record<AdminSessionStatus, string> = {
    active: 'Active',
    expired: 'Expired',
    revoked: 'Revoked',
    terminated: 'Terminated',
    suspended: 'Suspended',
    pending: 'Pending',
    validating: 'Validating',
  };
  return labels[status] || status;
}

/**
 * Get session expiry time from duration
 */
export function getAdminSessionExpiryTime(duration: number): Date {
  return new Date(Date.now() + duration * 1000);
}

/**
 * Check if session needs renewal
 */
export function adminSessionNeedsRenewal(createdAt: Date, duration: number): boolean {
  const age = (Date.now() - createdAt.getTime()) / 1000;
  const renewalThreshold = 300; // 5 minutes
  return age > duration - renewalThreshold;
}

/**
 * Check if session is idle
 */
export function isAdminSessionIdle(lastActivityAt: Date): boolean {
  const idleTime = (Date.now() - lastActivityAt.getTime()) / 1000;
  const maxIdleTime = 3600; // 1 hour
  return idleTime > maxIdleTime;
}

/**
 * Validate session duration
 */
export function isValidAdminSessionDuration(duration: number): boolean {
  const maxDuration = 2592000; // 30 days
  return duration > 0 && duration <= maxDuration;
}

/**
 * Create session statistics from array
 */
export function createAdminSessionStatistics(sessions: AdminSession[]): AdminSessionStatistics {
  const stats: AdminSessionStatistics = {
    totalSessions: sessions.length,
    typeCounts: {
      web: 0,
      mobile: 0,
      api: 0,
      admin: 0,
      service: 0,
      system: 0,
      token: 0,
      refresh: 0,
    },
    statusCounts: {
      active: 0,
      expired: 0,
      revoked: 0,
      terminated: 0,
      suspended: 0,
      pending: 0,
      validating: 0,
    },
    securityLevelCounts: {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
    },
    activeSessions: 0,
    expiredSessions: 0,
    revokedSessions: 0,
    terminatedSessions: 0,
    suspendedSessions: 0,
    averageDuration: 0,
    maxConcurrentSessions: 0,
  };

  let totalDuration = 0;
  let durationCount = 0;

  // Count sessions by admin for concurrent sessions
  const adminSessionCounts: Record<ID, number> = {};

  sessions.forEach((session) => {
    // Count by type
    stats.typeCounts[session.type] = (stats.typeCounts[session.type] || 0) + 1;

    // Count by status
    stats.statusCounts[session.status] = (stats.statusCounts[session.status] || 0) + 1;

    // Count by security level
    stats.securityLevelCounts[session.securityLevel] =
      (stats.securityLevelCounts[session.securityLevel] || 0) + 1;

    // Count specific statuses
    if (isAdminSessionActive(session.status)) {
      stats.activeSessions++;
    }
    if (session.status === 'expired') stats.expiredSessions++;
    if (session.isRevoked) stats.revokedSessions++;
    if (session.isTerminated) stats.terminatedSessions++;
    if (session.isSuspended) stats.suspendedSessions++;

    // Calculate average duration
    if (session.duration) {
      totalDuration += session.duration;
      durationCount++;
    }

    // Count concurrent sessions
    if (session.adminId) {
      adminSessionCounts[session.adminId] = (adminSessionCounts[session.adminId] || 0) + 1;
    }
  });

  stats.averageDuration = durationCount > 0 ? totalDuration / durationCount : 0;

  // Find max concurrent sessions
  let maxConcurrent = 0;
  for (const count of Object.values(adminSessionCounts)) {
    if (count > maxConcurrent) {
      maxConcurrent = count;
    }
  }
  stats.maxConcurrentSessions = maxConcurrent;

  return stats;
}
