/**
 * Admin Verification Types
 * Verification and validation definitions
 */

import { BaseEntity, ID, Timestamp, Nullable, JsonObject } from '../common/core-primitives.types';

/**
 * Verification type
 * Based on VERIFICATION_TYPE from constants
 */
export type AdminVerificationType =
  | 'email'
  | 'phone'
  | 'identity'
  | 'address'
  | 'payment'
  | 'two_fa'
  | 'device'
  | 'bio'
  | 'security'
  | 'compliance'
  | 'admin'
  | 'role'
  | 'permission';

/**
 * Verification status
 * Based on VERIFICATION_STATUS from constants
 */
export type AdminVerificationStatus =
  | 'pending'
  | 'verified'
  | 'rejected'
  | 'expired'
  | 'revoked'
  | 'failed'
  | 'in_progress'
  | 'waiting';

/**
 * Verification method
 * Based on VERIFICATION_METHOD from constants
 */
export type AdminVerificationMethod =
  | 'otp'
  | 'email'
  | 'sms'
  | 'whatsapp'
  | 'call'
  | 'qr'
  | 'biometric'
  | 'facial'
  | 'fingerprint'
  | 'iris'
  | 'voice'
  | 'document'
  | 'knowledge'
  | 'device'
  | 'location';

/**
 * OTP type
 * Based on OTP_TYPE from constants
 */
export type AdminOtpType =
  | 'login'
  | 'register'
  | 'password_reset'
  | 'email_verification'
  | 'phone_verification'
  | 'two_fa'
  | 'transaction'
  | 'withdrawal'
  | 'security'
  | 'admin_action';

/**
 * Verification error code
 * Based on VERIFICATION_ERROR from constants
 */
export type AdminVerificationErrorCode =
  | 'ERR_VERIFY_001'
  | 'ERR_VERIFY_002'
  | 'ERR_VERIFY_003'
  | 'ERR_VERIFY_004'
  | 'ERR_VERIFY_005'
  | 'ERR_VERIFY_006'
  | 'ERR_VERIFY_007'
  | 'ERR_VERIFY_008'
  | 'ERR_VERIFY_009';

/**
 * Admin verification interface
 * Represents a verification record
 */
export interface AdminVerification extends BaseEntity {
  /** Verification ID */
  id: ID;
  /** Admin ID being verified */
  adminId: ID;
  /** Verification type */
  type: AdminVerificationType;
  /** Verification status */
  status: AdminVerificationStatus;
  /** Verification method */
  method: AdminVerificationMethod;
  /** Verification code (hashed) */
  codeHash?: Nullable<string>;
  /** Target (email, phone, etc.) */
  target: string;
  /** OTP type (if applicable) */
  otpType?: Nullable<AdminOtpType>;
  /** Verification duration in seconds */
  duration: number;
  /** Expiry timestamp */
  expiresAt: Timestamp;
  /** Attempts count */
  attempts: number;
  /** Max attempts allowed */
  maxAttempts: number;
  /** Verification metadata */
  metadata?: Nullable<JsonObject>;
  /** Verified timestamp */
  verifiedAt?: Nullable<Timestamp>;
  /** Verified by admin ID */
  verifiedBy?: Nullable<ID>;
  /** Rejection reason (if rejected) */
  rejectionReason?: Nullable<string>;
  /** Whether verification is complete */
  isComplete: boolean;
  /** Whether verification is archived */
  isArchived: boolean;
}

/**
 * Verification request data
 */
export interface AdminVerificationRequestData {
  /** Admin ID */
  adminId: ID;
  /** Verification type */
  type: AdminVerificationType;
  /** Verification method */
  method: AdminVerificationMethod;
  /** Target (email, phone, etc.) */
  target: string;
  /** OTP type (if applicable) */
  otpType?: AdminOtpType;
  /** Duration in seconds */
  duration?: number;
  /** Max attempts */
  maxAttempts?: number;
  /** Metadata */
  metadata?: JsonObject;
}

/**
 * Verification verify data
 */
export interface AdminVerificationVerifyData {
  /** Verification ID */
  verificationId: ID;
  /** Code provided by user */
  code: string;
  /** Verified by admin ID */
  verifiedBy?: ID;
  /** Additional metadata */
  metadata?: JsonObject;
}

/**
 * Verification filter parameters
 */
export interface AdminVerificationFilterParams {
  /** Filter by admin ID */
  adminId?: ID;
  /** Filter by verification type */
  type?: AdminVerificationType | AdminVerificationType[];
  /** Filter by status */
  status?: AdminVerificationStatus | AdminVerificationStatus[];
  /** Filter by method */
  method?: AdminVerificationMethod | AdminVerificationMethod[];
  /** Filter by target */
  target?: string;
  /** Filter by OTP type */
  otpType?: AdminOtpType | AdminOtpType[];
  /** Filter by complete status */
  isComplete?: boolean;
  /** Filter by archived status */
  isArchived?: boolean;
  /** Date range filter */
  dateRange?: {
    start?: Date;
    end?: Date;
  };
  /** Search term */
  search?: string;
}

/**
 * Verification statistics
 */
export interface AdminVerificationStatistics {
  /** Total verifications */
  totalVerifications: number;
  /** Count by type */
  typeCounts: Record<AdminVerificationType, number>;
  /** Count by status */
  statusCounts: Record<AdminVerificationStatus, number>;
  /** Count by method */
  methodCounts: Record<AdminVerificationMethod, number>;
  /** Completed verifications */
  completedCount: number;
  /** Pending verifications */
  pendingCount: number;
  /** Failed verifications */
  failedCount: number;
  /** Average attempts per verification */
  averageAttempts: number;
  /** Success rate */
  successRate: number;
}

/**
 * Verification result
 */
export interface AdminVerificationResult {
  /** Whether verification was successful */
  success: boolean;
  /** Verification if successful */
  verification?: AdminVerification;
  /** Error code if failed */
  errorCode?: AdminVerificationErrorCode;
  /** Error message if failed */
  errorMessage?: string;
  /** Whether verification was completed */
  isComplete?: boolean;
}

/**
 * Get verification status label
 */
export function getAdminVerificationStatusLabel(status: AdminVerificationStatus): string {
  const labels: Record<AdminVerificationStatus, string> = {
    pending: 'Pending Verification',
    verified: 'Verified',
    rejected: 'Rejected',
    expired: 'Expired',
    revoked: 'Revoked',
    failed: 'Failed',
    in_progress: 'In Progress',
    waiting: 'Waiting',
  };
  return labels[status] || status;
}

/**
 * Get verification status color
 */
export function getAdminVerificationStatusColor(status: AdminVerificationStatus): string {
  const colors: Record<AdminVerificationStatus, string> = {
    pending: 'warning',
    verified: 'success',
    rejected: 'error',
    expired: 'default',
    revoked: 'error',
    failed: 'error',
    in_progress: 'info',
    waiting: 'warning',
  };
  return colors[status] || 'default';
}

/**
 * Get OTP type label
 */
export function getAdminOtpTypeLabel(type: AdminOtpType): string {
  const labels: Record<AdminOtpType, string> = {
    login: 'Login OTP',
    register: 'Registration OTP',
    password_reset: 'Password Reset OTP',
    email_verification: 'Email Verification OTP',
    phone_verification: 'Phone Verification OTP',
    two_fa: '2FA OTP',
    transaction: 'Transaction OTP',
    withdrawal: 'Withdrawal OTP',
    security: 'Security OTP',
    admin_action: 'Admin Action OTP',
  };
  return labels[type] || type;
}

/**
 * Check if verification is complete
 */
export function isAdminVerificationComplete(status: AdminVerificationStatus): boolean {
  return status === 'verified';
}

/**
 * Check if verification is in progress
 */
export function isAdminVerificationInProgress(status: AdminVerificationStatus): boolean {
  return status === 'pending' || status === 'in_progress' || status === 'waiting';
}

/**
 * Check if verification has failed
 */
export function isAdminVerificationFailed(status: AdminVerificationStatus): boolean {
  return status === 'rejected' || status === 'failed' || status === 'revoked';
}

/**
 * Get verification expiry time
 */
export function getAdminVerificationExpiryTime(type: AdminVerificationType): Date {
  const durations: Record<AdminVerificationType, number> = {
    email: 86400, // 24 hours
    phone: 86400,
    identity: 604800, // 7 days
    address: 604800,
    payment: 86400, // 24 hours
    two_fa: 300, // 5 minutes
    device: 3600, // 1 hour
    bio: 86400,
    security: 3600,
    compliance: 2592000, // 30 days
    admin: 86400,
    role: 86400,
    permission: 86400,
  };
  const duration = durations[type] || 3600;
  return new Date(Date.now() + duration * 1000);
}

/**
 * Check if verification is expired
 */
export function isAdminVerificationExpired(createdAt: Date, type: AdminVerificationType): boolean {
  const durations: Record<AdminVerificationType, number> = {
    email: 86400,
    phone: 86400,
    identity: 604800,
    address: 604800,
    payment: 86400,
    two_fa: 300,
    device: 3600,
    bio: 86400,
    security: 3600,
    compliance: 2592000,
    admin: 86400,
    role: 86400,
    permission: 86400,
  };
  const duration = durations[type] || 3600;
  const age = (Date.now() - createdAt.getTime()) / 1000;
  return age > duration;
}

/**
 * Create verification statistics from array
 */
export function createAdminVerificationStatistics(
  verifications: AdminVerification[]
): AdminVerificationStatistics {
  const stats: AdminVerificationStatistics = {
    totalVerifications: verifications.length,
    typeCounts: {
      email: 0,
      phone: 0,
      identity: 0,
      address: 0,
      payment: 0,
      two_fa: 0,
      device: 0,
      bio: 0,
      security: 0,
      compliance: 0,
      admin: 0,
      role: 0,
      permission: 0,
    },
    statusCounts: {
      pending: 0,
      verified: 0,
      rejected: 0,
      expired: 0,
      revoked: 0,
      failed: 0,
      in_progress: 0,
      waiting: 0,
    },
    methodCounts: {
      otp: 0,
      email: 0,
      sms: 0,
      whatsapp: 0,
      call: 0,
      qr: 0,
      biometric: 0,
      facial: 0,
      fingerprint: 0,
      iris: 0,
      voice: 0,
      document: 0,
      knowledge: 0,
      device: 0,
      location: 0,
    },
    completedCount: 0,
    pendingCount: 0,
    failedCount: 0,
    averageAttempts: 0,
    successRate: 0,
  };

  let totalAttempts = 0;

  verifications.forEach((verification) => {
    stats.typeCounts[verification.type] = (stats.typeCounts[verification.type] || 0) + 1;
    stats.statusCounts[verification.status] = (stats.statusCounts[verification.status] || 0) + 1;
    stats.methodCounts[verification.method] = (stats.methodCounts[verification.method] || 0) + 1;

    if (isAdminVerificationComplete(verification.status)) {
      stats.completedCount++;
    }
    if (isAdminVerificationInProgress(verification.status)) {
      stats.pendingCount++;
    }
    if (isAdminVerificationFailed(verification.status)) {
      stats.failedCount++;
    }

    totalAttempts += verification.attempts;
  });

  stats.averageAttempts = verifications.length > 0 ? totalAttempts / verifications.length : 0;
  stats.successRate =
    verifications.length > 0 ? (stats.completedCount / verifications.length) * 100 : 0;

  return stats;
}
