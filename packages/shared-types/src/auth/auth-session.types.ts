/**
 * Auth Session Types
 * Type definitions for authentication sessions based on shared-constants
 * @module AuthSessionTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, DeviceInfo } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants auth session
// ============================================================
import {
  // Session Constants
  AUTH_SESSION,
  ACTIVE_SESSION_STATUSES,
  INACTIVE_SESSION_STATUSES,
  // Session Types
  AuthSessionStatus,
  AuthSessionType,
  AuthSessionEvent,
  AuthSessionKey,
  // Session Functions
  isSessionActive,
  isSessionInactive,
  getSessionStatusLabel,
  getSessionTypeLabel,
  isSessionExpired,
  getRemainingSessionTime,
  shouldExtendSession,
} from '@vubon/shared-constants';

// ============================================================
// Auth Session Extended Types
// ============================================================

/**
 * Auth session with additional metadata
 */
export interface AuthSessionExtended extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  token: string;
  type: AuthSessionType;
  status: AuthSessionStatus;
  expiresAt: Date;
  lastActivityAt: Date;
  ipAddress?: string;
  userAgent?: string;
  deviceInfo?: DeviceInfo;
  refreshToken?: string;
  refreshTokenExpiresAt?: Date;
  isActive: boolean;
  isInactive: boolean;
  isExpired: boolean;
  metadata?: Metadata;
}

/**
 * Auth session filter
 */
export interface AuthSessionFilter {
  userIds?: ID[];
  types?: AuthSessionType[];
  statuses?: AuthSessionStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  ipAddress?: string;
  isActive?: boolean;
  isInactive?: boolean;
  isExpired?: boolean;
  expiresBefore?: Date;
  expiresAfter?: Date;
  lastActivityBefore?: Date;
  lastActivityAfter?: Date;
  searchTerm?: string;
}

/**
 * Auth session statistics
 */
export interface AuthSessionStatistics {
  userId: ID;
  totalSessions: number;
  activeSessions: number;
  inactiveSessions: number;
  expiredSessions: number;
  byType: Record<AuthSessionType, number>;
  byStatus: Record<AuthSessionStatus, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageSessionDuration: number;
  averageActiveDuration: number;
  maxConcurrentSessions: number;
  sessionTimeoutCount: number;
  mostFrequentType: AuthSessionType;
  mostFrequentStatus: AuthSessionStatus;
}

/**
 * Auth session summary
 */
export interface AuthSessionSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  inactive: number;
  expired: number;
  byType: Record<AuthSessionType, number>;
  byStatus: Record<AuthSessionStatus, number>;
  sessionTrend: {
    date: Date;
    active: number;
    new: number;
    expired: number;
  }[];
  topTypes: {
    type: AuthSessionType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: AuthSessionStatus;
    count: number;
    label: string;
  }[];
}

/**
 * Auth session configuration
 */
export interface AuthSessionConfiguration {
  enabled: boolean;
  maxConcurrentSessions: number;
  defaultType: AuthSessionType;
  sessionLifetime: number; // seconds
  refreshTokenEnabled: boolean;
  refreshTokenLifetime: number; // seconds
  extendOnActivity: boolean;
  extendThreshold: number; // seconds
  validateIP: boolean;
  validateUserAgent: boolean;
  requireMFA: boolean;
  autoTerminateInactive: boolean;
  inactiveTimeout: number; // seconds
  alertConfig?: AuthSessionAlertConfig;
}

/**
 * Auth session alert configuration
 */
export interface AuthSessionAlertConfig {
  enabled: boolean;
  maxConcurrentSessionsAlert: boolean;
  maxConcurrentSessionsThreshold: number;
  inactiveSessionAlert: boolean;
  inactiveSessionThreshold: number; // minutes
  newDeviceAlert: boolean;
  newLocationAlert: boolean;
  failedLoginAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Auth session history
 */
export interface AuthSessionHistory extends BaseEntity, Timestamp {
  id: ID;
  sessionId: ID;
  userId: ID;
  action: 'create' | 'update' | 'refresh' | 'terminate' | 'expire' | 'revoke' | 'extend';
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
 * Auth session device
 */
export interface AuthSessionDevice {
  sessionId: ID;
  userId: ID;
  deviceInfo: DeviceInfo;
  firstSeen: Date;
  lastSeen: Date;
  isTrusted: boolean;
  trustLevel: 'unknown' | 'low' | 'medium' | 'high';
  verificationMethod?: 'email' | 'sms' | 'push' | 'biometric' | 'password';
  verifiedAt?: Date;
  metadata?: Metadata;
}

/**
 * Auth session location
 */
export interface AuthSessionLocation {
  sessionId: ID;
  userId: ID;
  ipAddress: string;
  country?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  firstSeen: Date;
  lastSeen: Date;
  isVerified: boolean;
  verificationMethod?: 'ip' | 'geo' | 'manual';
  verifiedAt?: Date;
  metadata?: Metadata;
}

/**
 * Auth session export
 */
export interface AuthSessionExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: AuthSessionFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Auth session revocation
 */
export interface AuthSessionRevocation extends BaseEntity, Timestamp {
  id: ID;
  sessionId: ID;
  userId: ID;
  revokedBy: ID;
  reason: 'user_action' | 'admin_action' | 'security' | 'expired' | 'compromised' | 'other';
  description?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Constants
  AUTH_SESSION,
  ACTIVE_SESSION_STATUSES,
  INACTIVE_SESSION_STATUSES,
  // Types
  AuthSessionStatus,
  AuthSessionType,
  AuthSessionEvent,
  AuthSessionKey,
  // Functions
  isSessionActive,
  isSessionInactive,
  getSessionStatusLabel,
  getSessionTypeLabel,
  isSessionExpired,
  getRemainingSessionTime,
  shouldExtendSession,
};
