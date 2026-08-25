/**
 * Admin Biometric Types
 * Type definitions for admin biometric authentication based on shared-constants
 * @module AdminBiometricTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, DeviceInfo } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants admin biometric
// ============================================================
import {
  // Core Biometric Constants
  ADMIN_BIOMETRIC,
  ADMIN_BIOMETRIC_TYPE_LABELS,
  ADMIN_BIOMETRIC_TYPE_ICONS,
  ADMIN_BIOMETRIC_STATUS_LABELS,
  ADMIN_BIOMETRIC_STATUS_COLORS,
  ADMIN_BIOMETRIC_SECURITY_LEVEL_LABELS,
  ADMIN_BIOMETRIC_SECURITY_LEVEL_PRIORITY,
  ADMIN_BIOMETRIC_ACCURACY_LEVEL_LABELS,
  ADMIN_BIOMETRIC_VERIFICATION_METHOD_LABELS,
  ADMIN_BIOMETRIC_CONFIDENCE_LEVEL_LABELS,
  ADMIN_BIOMETRIC_SENSOR_LABELS,
  ADMIN_BIOMETRIC_QUALITY_LEVEL_LABELS,
  ADMIN_BIOMETRIC_CAPTURE_METHOD_LABELS,
  // Core Biometric Types
  AdminBiometricType,
  AdminBiometricStatus,
  AdminBiometricSecurityLevel,
  AdminBiometricAccuracyLevel,
  AdminBiometricVerificationMethod,
  AdminBiometricConfidenceLevel,
  AdminBiometricSensor,
  AdminBiometricQualityLevel,
  AdminBiometricCaptureMethod,
  // Core Biometric Functions
  getAdminBiometricTypeLabel,
  getAdminBiometricTypeIcon,
  getAdminBiometricStatusLabel,
  getAdminBiometricStatusColor,
  getAdminBiometricSecurityLevelLabel,
  getAdminBiometricSecurityLevelPriority,
  getAdminBiometricAccuracyLevelLabel,
  getAdminBiometricVerificationMethodLabel,
  getAdminBiometricConfidenceLevelLabel,
  getAdminBiometricSensorLabel,
  getAdminBiometricQualityLevelLabel,
  getAdminBiometricCaptureMethodLabel,
  isAdminBiometricActive,
  isAdminBiometricInactive,
  isAdminBiometricLocked,
  isAdminBiometricFailed,
  getAdminBiometricTimeout,
  getAdminBiometricSecurityLevel,
  getAdminBiometricAccuracyLevel,
} from '@vubon/shared-constants';

// ============================================================
// Admin Biometric Extended Types
// ============================================================

/**
 * Admin biometric with additional metadata
 */
export interface AdminBiometricExtended extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  type: AdminBiometricType;
  status: AdminBiometricStatus;
  securityLevel: AdminBiometricSecurityLevel;
  accuracyLevel: AdminBiometricAccuracyLevel;
  verificationMethod: AdminBiometricVerificationMethod;
  confidenceLevel: AdminBiometricConfidenceLevel;
  sensor: AdminBiometricSensor;
  qualityLevel: AdminBiometricQualityLevel;
  captureMethod: AdminBiometricCaptureMethod;
  templateHash?: string;
  isActive: boolean;
  isInactive: boolean;
  isLocked: boolean;
  isFailed: boolean;
  lastVerifiedAt?: Date;
  lastFailedAt?: Date;
  failedAttempts: number;
  maxFailedAttempts: number;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * Admin biometric filter
 */
export interface AdminBiometricFilter {
  adminIds?: ID[];
  types?: AdminBiometricType[];
  statuses?: AdminBiometricStatus[];
  securityLevels?: AdminBiometricSecurityLevel[];
  accuracyLevels?: AdminBiometricAccuracyLevel[];
  verificationMethods?: AdminBiometricVerificationMethod[];
  confidenceLevels?: AdminBiometricConfidenceLevel[];
  sensors?: AdminBiometricSensor[];
  qualityLevels?: AdminBiometricQualityLevel[];
  captureMethods?: AdminBiometricCaptureMethod[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isLocked?: boolean;
  isFailed?: boolean;
  searchTerm?: string;
}

/**
 * Admin biometric statistics
 */
export interface AdminBiometricStatistics {
  adminId: ID;
  totalBiometrics: number;
  activeBiometrics: number;
  inactiveBiometrics: number;
  lockedBiometrics: number;
  failedBiometrics: number;
  byType: Record<AdminBiometricType, number>;
  byStatus: Record<AdminBiometricStatus, number>;
  bySecurityLevel: Record<AdminBiometricSecurityLevel, number>;
  byAccuracyLevel: Record<AdminBiometricAccuracyLevel, number>;
  byVerificationMethod: Record<AdminBiometricVerificationMethod, number>;
  byConfidenceLevel: Record<AdminBiometricConfidenceLevel, number>;
  bySensor: Record<AdminBiometricSensor, number>;
  byQualityLevel: Record<AdminBiometricQualityLevel, number>;
  byCaptureMethod: Record<AdminBiometricCaptureMethod, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageFailedAttempts: number;
  mostFrequentType: AdminBiometricType;
  mostFrequentSensor: AdminBiometricSensor;
  mostFrequentVerificationMethod: AdminBiometricVerificationMethod;
}

/**
 * Admin biometric summary
 */
export interface AdminBiometricSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  inactive: number;
  locked: number;
  failed: number;
  byType: Record<AdminBiometricType, number>;
  byStatus: Record<AdminBiometricStatus, number>;
  bySecurityLevel: Record<AdminBiometricSecurityLevel, number>;
  byAccuracyLevel: Record<AdminBiometricAccuracyLevel, number>;
  byVerificationMethod: Record<AdminBiometricVerificationMethod, number>;
  byConfidenceLevel: Record<AdminBiometricConfidenceLevel, number>;
  bySensor: Record<AdminBiometricSensor, number>;
  byQualityLevel: Record<AdminBiometricQualityLevel, number>;
  byCaptureMethod: Record<AdminBiometricCaptureMethod, number>;
  biometricTrend: {
    date: Date;
    total: number;
    active: number;
    failed: number;
  }[];
  topTypes: {
    type: AdminBiometricType;
    count: number;
    label: string;
  }[];
  topSensors: {
    sensor: AdminBiometricSensor;
    count: number;
    label: string;
  }[];
}

/**
 * Admin biometric configuration
 */
export interface AdminBiometricConfiguration {
  enabled: boolean;
  defaultType: AdminBiometricType;
  defaultSecurityLevel: AdminBiometricSecurityLevel;
  defaultAccuracyLevel: AdminBiometricAccuracyLevel;
  defaultVerificationMethod: AdminBiometricVerificationMethod;
  defaultSensor: AdminBiometricSensor;
  defaultQualityLevel: AdminBiometricQualityLevel;
  defaultCaptureMethod: AdminBiometricCaptureMethod;
  maxFailedAttempts: number;
  lockDurationMinutes: number;
  timeoutSeconds: number;
  requireLivenessDetection: boolean;
  requireMultiFactor: boolean;
  allowTypeChange: boolean;
  notificationOnActive: boolean;
  notificationOnLock: boolean;
  notificationOnFailed: boolean;
  alertConfig?: AdminBiometricAlertConfig;
}

/**
 * Admin biometric alert configuration
 */
export interface AdminBiometricAlertConfig {
  enabled: boolean;
  failedAttemptAlert: boolean;
  maxAttemptsAlert: boolean;
  lockAlert: boolean;
  suspiciousActivityAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  failedAttemptThreshold: number;
}

/**
 * Admin biometric history
 */
export interface AdminBiometricHistory extends BaseEntity, Timestamp {
  id: ID;
  biometricId: ID;
  adminId: ID;
  action: 'register' | 'verify' | 'fail' | 'lock' | 'unlock' | 'update' | 'remove' | 'reset';
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
 * Admin biometric verification attempt
 */
export interface AdminBiometricVerificationAttempt extends BaseEntity, Timestamp {
  id: ID;
  biometricId: ID;
  adminId: ID;
  isSuccess: boolean;
  confidenceScore?: number;
  errorMessage?: string;
  ipAddress?: string;
  userAgent?: string;
  deviceInfo?: DeviceInfo;
  metadata?: Metadata;
}

/**
 * Admin biometric template
 */
export interface AdminBiometricTemplate extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  biometricId: ID;
  type: AdminBiometricType;
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
 * Admin biometric device
 */
export interface AdminBiometricDevice extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  biometricId: ID;
  deviceInfo: DeviceInfo;
  sensor: AdminBiometricSensor;
  isTrusted: boolean;
  trustLevel: 'unknown' | 'low' | 'medium' | 'high';
  verifiedAt?: Date;
  lastUsedAt?: Date;
  metadata?: Metadata;
}

/**
 * Admin biometric export
 */
export interface AdminBiometricExport extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: AdminBiometricFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Admin biometric audit
 */
export interface AdminBiometricAudit extends BaseEntity, Timestamp {
  id: ID;
  biometricId: ID;
  adminId: ID;
  action: 'register' | 'verify' | 'fail' | 'lock' | 'unlock' | 'update' | 'remove' | 'reset';
  changes: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  ipAddress?: string;
  userAgent?: string;
  deviceInfo?: DeviceInfo;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Core Constants
  ADMIN_BIOMETRIC,
  ADMIN_BIOMETRIC_TYPE_LABELS,
  ADMIN_BIOMETRIC_TYPE_ICONS,
  ADMIN_BIOMETRIC_STATUS_LABELS,
  ADMIN_BIOMETRIC_STATUS_COLORS,
  ADMIN_BIOMETRIC_SECURITY_LEVEL_LABELS,
  ADMIN_BIOMETRIC_SECURITY_LEVEL_PRIORITY,
  ADMIN_BIOMETRIC_ACCURACY_LEVEL_LABELS,
  ADMIN_BIOMETRIC_VERIFICATION_METHOD_LABELS,
  ADMIN_BIOMETRIC_CONFIDENCE_LEVEL_LABELS,
  ADMIN_BIOMETRIC_SENSOR_LABELS,
  ADMIN_BIOMETRIC_QUALITY_LEVEL_LABELS,
  ADMIN_BIOMETRIC_CAPTURE_METHOD_LABELS,
  // Core Types
  AdminBiometricType,
  AdminBiometricStatus,
  AdminBiometricSecurityLevel,
  AdminBiometricAccuracyLevel,
  AdminBiometricVerificationMethod,
  AdminBiometricConfidenceLevel,
  AdminBiometricSensor,
  AdminBiometricQualityLevel,
  AdminBiometricCaptureMethod,
  // Core Functions
  getAdminBiometricTypeLabel,
  getAdminBiometricTypeIcon,
  getAdminBiometricStatusLabel,
  getAdminBiometricStatusColor,
  getAdminBiometricSecurityLevelLabel,
  getAdminBiometricSecurityLevelPriority,
  getAdminBiometricAccuracyLevelLabel,
  getAdminBiometricVerificationMethodLabel,
  getAdminBiometricConfidenceLevelLabel,
  getAdminBiometricSensorLabel,
  getAdminBiometricQualityLevelLabel,
  getAdminBiometricCaptureMethodLabel,
  isAdminBiometricActive,
  isAdminBiometricInactive,
  isAdminBiometricLocked,
  isAdminBiometricFailed,
  getAdminBiometricTimeout,
  getAdminBiometricSecurityLevel,
  getAdminBiometricAccuracyLevel,
};
