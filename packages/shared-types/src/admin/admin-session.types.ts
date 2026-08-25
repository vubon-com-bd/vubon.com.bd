/**
 * Admin Session Types
 * Type definitions for admin sessions based on shared-constants
 * @module AdminSessionTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, DeviceInfo } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants admin session
// ============================================================
import {
  // Core Session Constants
  ADMIN_SESSION,
  ADMIN_SESSION_STATUS_LABELS,
  ADMIN_SESSION_STATUS_COLORS,
  ADMIN_SESSION_TYPE_LABELS,
  ADMIN_SESSION_TYPE_ICONS,
  ADMIN_SESSION_SECURITY_LABELS,
  ADMIN_SESSION_SECURITY_PRIORITY,
  // Core Session Types
  AdminSessionStatus,
  AdminSessionType,
  AdminSessionSecurityLevel,
  AdminSessionTimeout,
  AdminSessionStorage,
  AdminSessionFlag,
  // Core Session Functions
  getAdminSessionStatusLabel,
  getAdminSessionStatusColor,
  getAdminSessionTypeLabel,
  getAdminSessionTypeIcon,
  getAdminSessionSecurityLabel,
  getAdminSessionSecurityPriority,
  getAdminSessionTimeout,
  isAdminSessionActive,
  isAdminSessionInactive,
  isAdminSessionTerminated,
  isAdminValidSessionType,
  isAdminHighSecurityLevel,
  shouldAdminValidateIP,
  getAdminSessionLifetime,
  getAdminSessionTimeoutSeconds,
} from '@vubon/shared-constants';

// ============================================================
// Admin Session Extended Types
// ============================================================

/**
 * Admin session with additional metadata
 */
export interface AdminSessionExtended extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  token: string;
  type: AdminSessionType;
  status: AdminSessionStatus;
  securityLevel: AdminSessionSecurityLevel;
  timeout: AdminSessionTimeout;
  storage: AdminSessionStorage;
  flags: AdminSessionFlag[];
  expiresAt: Date;
  lastActivityAt: Date;
  ipAddress?: string;
  userAgent?: string;
  deviceInfo?: DeviceInfo;
  refreshToken?: string;
  refreshTokenExpiresAt?: Date;
  isActive: boolean;
  isInactive: boolean;
  isTerminated: boolean;
  isValidType: boolean;
  isHighSecurity: boolean;
  shouldValidateIp: boolean;
  metadata?: Metadata;
}

/**
 * Admin session filter
 */
export interface AdminSessionFilter {
  adminIds?: ID[];
  types?: AdminSessionType[];
  statuses?: AdminSessionStatus[];
  securityLevels?: AdminSessionSecurityLevel[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  ipAddress?: string;
  isActive?: boolean;
  isInactive?: boolean;
  isTerminated?: boolean;
  expiresBefore?: Date;
  expiresAfter?: Date;
  lastActivityBefore?: Date;
  lastActivityAfter?: Date;
}

/**
 * Admin session statistics
 */
export interface AdminSessionStatistics {
  adminId: ID;
  totalSessions: number;
  activeSessions: number;
  inactiveSessions: number;
  terminatedSessions: number;
  byType: Record<AdminSessionType, number>;
  byStatus: Record<AdminSessionStatus, number>;
  bySecurityLevel: Record<AdminSessionSecurityLevel, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageSessionDuration: number;
  averageActiveDuration: number;
  maxConcurrentSessions: number;
  sessionTimeoutCount: number;
  mostFrequentType: AdminSessionType;
  mostFrequentSecurityLevel: AdminSessionSecurityLevel;
}

/**
 * Admin session summary
 */
export interface AdminSessionSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  inactive: number;
  terminated: number;
  byType: Record<AdminSessionType, number>;
  byStatus: Record<AdminSessionStatus, number>;
  bySecurityLevel: Record<AdminSessionSecurityLevel, number>;
  sessionTrend: {
    date: Date;
    active: number;
    new: number;
    terminated: number;
  }[];
  topTypes: {
    type: AdminSessionType;
    count: number;
    label: string;
  }[];
  topSecurityLevels: {
    level: AdminSessionSecurityLevel;
    count: number;
    label: string;
  }[];
}

/**
 * Admin session configuration
 */
export interface AdminSessionConfiguration {
  enabled: boolean;
  maxConcurrentSessions: number;
  defaultType: AdminSessionType;
  defaultSecurityLevel: AdminSessionSecurityLevel;
  defaultTimeout: AdminSessionTimeout;
  sessionLifetime: number; // seconds
  refreshTokenEnabled: boolean;
  refreshTokenLifetime: number; // seconds
  validateIP: boolean;
  validateUserAgent: boolean;
  requireMFA: boolean;
  autoTerminateInactive: boolean;
  inactiveTimeout: number; // seconds
  storage: AdminSessionStorage;
  flags: AdminSessionFlag[];
  alertConfig?: AdminSessionAlertConfig;
}

/**
 * Admin session alert configuration
 */
export interface AdminSessionAlertConfig {
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
 * Admin session history
 */
export interface AdminSessionHistory extends BaseEntity, Timestamp {
  id: ID;
  sessionId: ID;
  adminId: ID;
  action: 'create' | 'update' | 'refresh' | 'terminate' | 'expire' | 'revoke';
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
 * Admin session device
 */
export interface AdminSessionDevice {
  sessionId: ID;
  adminId: ID;
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
 * Admin session location
 */
export interface AdminSessionLocation {
  sessionId: ID;
  adminId: ID;
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
 * Admin session export
 */
export interface AdminSessionExport extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: AdminSessionFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Admin session revocation
 */
export interface AdminSessionRevocation extends BaseEntity, Timestamp {
  id: ID;
  sessionId: ID;
  adminId: ID;
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
  // Core Constants
  ADMIN_SESSION,
  ADMIN_SESSION_STATUS_LABELS,
  ADMIN_SESSION_STATUS_COLORS,
  ADMIN_SESSION_TYPE_LABELS,
  ADMIN_SESSION_TYPE_ICONS,
  ADMIN_SESSION_SECURITY_LABELS,
  ADMIN_SESSION_SECURITY_PRIORITY,
  // Core Types
  AdminSessionStatus,
  AdminSessionType,
  AdminSessionSecurityLevel,
  AdminSessionTimeout,
  AdminSessionStorage,
  AdminSessionFlag,
  // Core Functions
  getAdminSessionStatusLabel,
  getAdminSessionStatusColor,
  getAdminSessionTypeLabel,
  getAdminSessionTypeIcon,
  getAdminSessionSecurityLabel,
  getAdminSessionSecurityPriority,
  getAdminSessionTimeout,
  isAdminSessionActive,
  isAdminSessionInactive,
  isAdminSessionTerminated,
  isAdminValidSessionType,
  isAdminHighSecurityLevel,
  shouldAdminValidateIP,
  getAdminSessionLifetime,
  getAdminSessionTimeoutSeconds,
};
