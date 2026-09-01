/**
 * Admin Biometric Types
 * Biometric authentication definitions
 */

import { BaseEntity, ID, Timestamp, Nullable } from '../common/core-primitives.types';

/**
 * Biometric type
 */
export type AdminBiometricType =
  'fingerprint' | 'facial' | 'iris' | 'voice' | 'palm' | 'behavioral' | 'multi_factor';

/**
 * Biometric status
 */
export type AdminBiometricStatus =
  'enrolled' | 'pending' | 'active' | 'inactive' | 'revoked' | 'failed';

/**
 * Biometric device type
 */
export type AdminBiometricDeviceType = 'mobile' | 'desktop' | 'dedicated' | 'embedded' | 'external';

/**
 * Admin biometric interface
 */
export interface AdminBiometric extends BaseEntity {
  /** Biometric record ID */
  id: ID;
  /** Admin ID */
  adminId: ID;
  /** Biometric type */
  type: AdminBiometricType;
  /** Biometric status */
  status: AdminBiometricStatus;
  /** Device type */
  deviceType: AdminBiometricDeviceType;
  /** Device ID/name */
  deviceId: string;
  /** Device model */
  deviceModel?: Nullable<string>;
  /** Device manufacturer */
  deviceManufacturer?: Nullable<string>;
  /** Biometric template (encrypted) */
  template: string;
  /** Template version */
  templateVersion: string;
  /** Confidence threshold */
  threshold: number;
  /** Last verification timestamp */
  lastVerifiedAt?: Nullable<Timestamp>;
  /** Verification attempts */
  attempts: number;
  /** Failed attempts */
  failedAttempts: number;
  /** Is biometric active */
  isActive: boolean;
  /** Is biometric enrolled */
  isEnrolled: boolean;
  /** Expiry timestamp (if applicable) */
  expiresAt?: Nullable<Timestamp>;
}

/**
 * Biometric verification result
 */
export interface AdminBiometricVerificationResult {
  /** Whether verification was successful */
  success: boolean;
  /** Match score (0-100) */
  matchScore: number;
  /** Confidence level */
  confidence: 'low' | 'medium' | 'high';
  /** Whether verification is complete */
  isComplete: boolean;
  /** Error message if failed */
  errorMessage?: string;
  /** Remaining attempts */
  remainingAttempts?: number;
}

/**
 * Biometric enrollment data
 */
export interface AdminBiometricEnrollmentData {
  /** Admin ID */
  adminId: ID;
  /** Biometric type */
  type: AdminBiometricType;
  /** Device ID */
  deviceId: string;
  /** Device type */
  deviceType: AdminBiometricDeviceType;
  /** Biometric template */
  template: string;
  /** Template version */
  templateVersion: string;
  /** Threshold (0-100) */
  threshold?: number;
  /** Expiry in days */
  expiryDays?: number;
}

/**
 * Biometric verification data
 */
export interface AdminBiometricVerifyData {
  /** Biometric ID */
  id: ID;
  /** Biometric template to verify */
  template: string;
  /** Device ID */
  deviceId?: string;
}

/**
 * Biometric filter parameters
 */
export interface AdminBiometricFilterParams {
  /** Filter by admin ID */
  adminId?: ID;
  /** Filter by type */
  type?: AdminBiometricType | AdminBiometricType[];
  /** Filter by status */
  status?: AdminBiometricStatus | AdminBiometricStatus[];
  /** Filter by device type */
  deviceType?: AdminBiometricDeviceType | AdminBiometricDeviceType[];
  /** Filter by active status */
  isActive?: boolean;
  /** Filter by enrolled status */
  isEnrolled?: boolean;
}

/**
 * Biometric statistics
 */
export interface AdminBiometricStatistics {
  /** Total biometric records */
  totalRecords: number;
  /** Active records */
  activeCount: number;
  /** Inactive records */
  inactiveCount: number;
  /** Enrolled records */
  enrolledCount: number;
  /** Count by type */
  typeCounts: Record<AdminBiometricType, number>;
  /** Count by status */
  statusCounts: Record<AdminBiometricStatus, number>;
  /** Count by device type */
  deviceTypeCounts: Record<AdminBiometricDeviceType, number>;
  /** Enrollment rate */
  enrollmentRate: number;
}

/**
 * Get biometric type label
 */
export function getAdminBiometricTypeLabel(type: AdminBiometricType): string {
  const labels: Record<AdminBiometricType, string> = {
    fingerprint: 'Fingerprint',
    facial: 'Facial Recognition',
    iris: 'Iris Scan',
    voice: 'Voice Recognition',
    palm: 'Palm Recognition',
    behavioral: 'Behavioral Biometrics',
    multi_factor: 'Multi-Factor Biometrics',
  };
  return labels[type] || type;
}

/**
 * Get biometric status label
 */
export function getAdminBiometricStatusLabel(status: AdminBiometricStatus): string {
  const labels: Record<AdminBiometricStatus, string> = {
    enrolled: 'Enrolled',
    pending: 'Pending',
    active: 'Active',
    inactive: 'Inactive',
    revoked: 'Revoked',
    failed: 'Failed',
  };
  return labels[status] || status;
}

/**
 * Get biometric status color
 */
export function getAdminBiometricStatusColor(status: AdminBiometricStatus): string {
  const colors: Record<AdminBiometricStatus, string> = {
    enrolled: 'success',
    pending: 'warning',
    active: 'success',
    inactive: 'default',
    revoked: 'error',
    failed: 'error',
  };
  return colors[status] || 'default';
}

/**
 * Get biometric device type label
 */
export function getAdminBiometricDeviceTypeLabel(deviceType: AdminBiometricDeviceType): string {
  const labels: Record<AdminBiometricDeviceType, string> = {
    mobile: 'Mobile Device',
    desktop: 'Desktop Computer',
    dedicated: 'Dedicated Device',
    embedded: 'Embedded Device',
    external: 'External Device',
  };
  return labels[deviceType] || deviceType;
}

/**
 * Check if biometric is active and enrolled
 */
export function isAdminBiometricActive(biometric: AdminBiometric): boolean {
  return biometric.isActive && biometric.isEnrolled;
}

/**
 * Check if biometric is expired
 */
export function isAdminBiometricExpired(biometric: AdminBiometric): boolean {
  if (!biometric.expiresAt) return false;
  return new Date() > biometric.expiresAt;
}

/**
 * Calculate match confidence from score
 */
export function getAdminBiometricConfidence(score: number): 'low' | 'medium' | 'high' {
  if (score >= 80) return 'high';
  if (score >= 60) return 'medium';
  return 'low';
}

/**
 * Create biometric statistics from array
 */
export function createAdminBiometricStatistics(
  records: AdminBiometric[]
): AdminBiometricStatistics {
  const stats: AdminBiometricStatistics = {
    totalRecords: records.length,
    activeCount: 0,
    inactiveCount: 0,
    enrolledCount: 0,
    typeCounts: {
      fingerprint: 0,
      facial: 0,
      iris: 0,
      voice: 0,
      palm: 0,
      behavioral: 0,
      multi_factor: 0,
    },
    statusCounts: {
      enrolled: 0,
      pending: 0,
      active: 0,
      inactive: 0,
      revoked: 0,
      failed: 0,
    },
    deviceTypeCounts: {
      mobile: 0,
      desktop: 0,
      dedicated: 0,
      embedded: 0,
      external: 0,
    },
    enrollmentRate: 0,
  };

  records.forEach((record) => {
    stats.typeCounts[record.type] = (stats.typeCounts[record.type] || 0) + 1;
    stats.statusCounts[record.status] = (stats.statusCounts[record.status] || 0) + 1;
    stats.deviceTypeCounts[record.deviceType] =
      (stats.deviceTypeCounts[record.deviceType] || 0) + 1;

    if (isAdminBiometricActive(record)) stats.activeCount++;
    if (!record.isActive) stats.inactiveCount++;
    if (record.isEnrolled) stats.enrolledCount++;
  });

  stats.enrollmentRate = records.length > 0 ? (stats.enrolledCount / records.length) * 100 : 0;

  return stats;
}
