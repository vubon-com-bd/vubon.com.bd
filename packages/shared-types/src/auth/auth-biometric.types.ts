/**
 * Auth Biometric Types
 * Type definitions for biometric authentication based on shared-constants
 * @module AuthBiometricTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, DeviceInfo } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants auth biometric
// ============================================================
import {
  // Core Biometric Constants
  AUTH_BIOMETRIC,
  AUTH_BIOMETRIC_CONFIG,
  AUTH_BIOMETRIC_TYPES,
  AUTH_BIOMETRIC_EVENTS,
  // Core Biometric Types
  AuthBiometricConfig,
  AuthBiometricType,
  AuthBiometricEvent,
  AuthBiometricDefaults,
  AuthBiometricStatusType,
  // Core Biometric Status Types
  AuthBiometricStatus,
  // Core Biometric Functions
  getAuthbiometricTypeLabel,
  getAuthbiometricTypeIcon,
  getAuthbiometricTypeSecurityLevel,
  getAuthbiometricTypeAccuracy,
  getAuthbiometricMaxDevices,
  getAuthbiometricMaxAttempts,
  getAuthbiometricLockoutDuration,
  getAuthbiometricSessionTimeout,
  getAuthbiometricReauthInterval,
  getAuthbiometricMinConfidence,
  getAuthbiometricMaxRetries,
  isAuthbiometricTypeSupported,
  getAuthbiometricSupportedTypes,
  isAuthbiometricEnabled,
  isAuthbiometricLocked,
  getAuthbiometricTypeCategory,
} from '@vubon/shared-constants';

// ============================================================
// Auth Biometric Extended Types
// ============================================================

/**
 * Auth biometric with additional metadata
 */
export interface AuthBiometricExtended extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: AuthBiometricType;
  status: AuthBiometricStatus;
  deviceId?: string;
  deviceInfo?: DeviceInfo;
  confidence: number;
  isActive: boolean;
  isPending: boolean;
  isInactive: boolean;
  isFailed: boolean;
  isSecurityIssue: boolean;
  isTrusted: boolean;
  isUntrusted: boolean;
  isPhysical: boolean;
  isBehavioral: boolean;
  isPhysiological: boolean;
  isMobile: boolean;
  isPlatform: boolean;
  isCommon: boolean;
  lastVerifiedAt?: Date;
  lastFailedAt?: Date;
  failedAttempts: number;
  maxFailedAttempts: number;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * Auth biometric filter
 */
export interface AuthBiometricFilter {
  userIds?: ID[];
  types?: AuthBiometricType[];
  statuses?: AuthBiometricStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isPending?: boolean;
  isInactive?: boolean;
  isFailed?: boolean;
  isTrusted?: boolean;
  isUntrusted?: boolean;
  isPhysical?: boolean;
  isBehavioral?: boolean;
  isPhysiological?: boolean;
  isMobile?: boolean;
  isPlatform?: boolean;
  isCommon?: boolean;
  minConfidence?: number;
  searchTerm?: string;
}

/**
 * Auth biometric statistics
 */
export interface AuthBiometricStatistics {
  userId: ID;
  totalBiometrics: number;
  activeBiometrics: number;
  pendingBiometrics: number;
  inactiveBiometrics: number;
  failedBiometrics: number;
  trustedBiometrics: number;
  untrustedBiometrics: number;
  byType: Record<AuthBiometricType, number>;
  byStatus: Record<AuthBiometricStatus, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageConfidence: number;
  enablementRate: number;
  failureRate: number;
  mostFrequentType: AuthBiometricType;
  mostFrequentStatus: AuthBiometricStatus;
}

/**
 * Auth biometric summary
 */
export interface AuthBiometricSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  pending: number;
  inactive: number;
  failed: number;
  trusted: number;
  untrusted: number;
  byType: Record<AuthBiometricType, number>;
  byStatus: Record<AuthBiometricStatus, number>;
  biometricTrend: {
    date: Date;
    total: number;
    active: number;
    trusted: number;
  }[];
  topTypes: {
    type: AuthBiometricType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: AuthBiometricStatus;
    count: number;
    label: string;
  }[];
}

/**
 * Auth biometric configuration
 */
export interface AuthBiometricConfiguration {
  enabled: boolean;
  defaultType: AuthBiometricType;
  maxDevices: number;
  maxAttempts: number;
  lockoutDurationMinutes: number;
  sessionTimeoutSeconds: number;
  reauthIntervalSeconds: number;
  minConfidence: number;
  maxRetries: number;
  requirePhysical: boolean;
  requireBehavioral: boolean;
  allowMobile: boolean;
  allowPlatform: boolean;
  notificationOnEnable: boolean;
  notificationOnDisable: boolean;
  notificationOnLockout: boolean;
  alertConfig?: AuthBiometricAlertConfig;
}

/**
 * Auth biometric alert configuration
 */
export interface AuthBiometricAlertConfig {
  enabled: boolean;
  failedAttemptAlert: boolean;
  maxAttemptsAlert: boolean;
  lockoutAlert: boolean;
  suspiciousActivityAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  failedAttemptThreshold: number;
}

/**
 * Auth biometric history
 */
export interface AuthBiometricHistory extends BaseEntity, Timestamp {
  id: ID;
  biometricId: ID;
  userId: ID;
  action: 'register' | 'verify' | 'fail' | 'lockout' | 'unlock' | 'update' | 'remove';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  ipAddress?: string;
  userAgent?: string;
  deviceInfo?: DeviceInfo;
  metadata?: Metadata;
}

/**
 * Auth biometric verification attempt
 */
export interface AuthBiometricVerificationAttempt extends BaseEntity, Timestamp {
  id: ID;
  biometricId: ID;
  userId: ID;
  type: AuthBiometricType;
  confidence: number;
  isSuccess: boolean;
  errorMessage?: string;
  ipAddress?: string;
  userAgent?: string;
  deviceInfo?: DeviceInfo;
  metadata?: Metadata;
}

/**
 * Auth biometric device
 */
export interface AuthBiometricDevice extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  biometricId: ID;
  deviceInfo: DeviceInfo;
  isTrusted: boolean;
  trustLevel: 'low' | 'medium' | 'high';
  verifiedAt: Date;
  expiresAt?: Date;
  lastUsedAt?: Date;
  metadata?: Metadata;
}

/**
 * Auth biometric template
 */
export interface AuthBiometricTemplate extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  biometricId: ID;
  type: AuthBiometricType;
  templateHash: string;
  templateData?: string;
  version: string;
  algorithm: string;
  qualityScore: number;
  isActive: boolean;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * Auth biometric export
 */
export interface AuthBiometricExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: AuthBiometricFilter;
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
  // Core Constants
  AUTH_BIOMETRIC,
  AUTH_BIOMETRIC_CONFIG,
  AUTH_BIOMETRIC_TYPES,
  AUTH_BIOMETRIC_EVENTS,
  // Core Types
  AuthBiometricConfig,
  AuthBiometricType,
  AuthBiometricEvent,
  AuthBiometricDefaults,
  AuthBiometricStatusType,
  AuthBiometricStatus,
  // Core Functions
  getAuthbiometricTypeLabel,
  getAuthbiometricTypeIcon,
  getAuthbiometricTypeSecurityLevel,
  getAuthbiometricTypeAccuracy,
  getAuthbiometricMaxDevices,
  getAuthbiometricMaxAttempts,
  getAuthbiometricLockoutDuration,
  getAuthbiometricSessionTimeout,
  getAuthbiometricReauthInterval,
  getAuthbiometricMinConfidence,
  getAuthbiometricMaxRetries,
  isAuthbiometricTypeSupported,
  getAuthbiometricSupportedTypes,
  isAuthbiometricEnabled,
  isAuthbiometricLocked,
  getAuthbiometricTypeCategory,
};
