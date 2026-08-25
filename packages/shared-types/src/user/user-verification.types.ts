/**
 * User Verification Types
 * Type definitions for user verification based on shared-constants
 * @module UserVerificationTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants user verification
// ============================================================
import {
  // Core Verification Constants
  USER_VERIFICATION,
  UserVerificationPurpose,
  UserVerificationChannel,
  UserVerificationCodeLength,
  getVerificationPurposeLabel,
  getVerificationChannelLabel,
  getVerificationStatusMessage,
  isVerificationComplete,
  isVerificationPending,
  isVerificationExpired,
  canResendVerification,
  isVerificationExpiredByTime,
  getRemainingTimeInSeconds,
  getVerificationCode,
  generateVerificationToken,
  getChannelForType,
  getVerificationPurposeForType,
  getVerificationExpiryTime,
  getMaxAttemptsForType,
  // Verification Type Constants
  USER_VERIFICATION_TYPE,
  USER_VERIFICATION_TYPE_LABELS,
  USER_VERIFICATION_TYPE_DESCRIPTIONS,
  CONTACT_VERIFICATION_TYPES,
  SECURITY_VERIFICATION_TYPES,
  FINANCIAL_VERIFICATION_TYPES,
  ACCOUNT_VERIFICATION_TYPES,
  UserVerificationType,
  isContactVerification,
  isSecurityVerification,
  isFinancialVerification,
  isAccountVerification,
  getVerificationTypeLabel,
  getVerificationTypeDescription,
  getVerificationTypeByValue,
  // Verification Status Constants
  USER_VERIFICATION_STATUS,
  USER_VERIFICATION_STATUS_LABELS,
  USER_VERIFICATION_STATUS_COLORS,
  ACTIVE_VERIFICATION_STATUSES,
  COMPLETED_VERIFICATION_STATUSES,
  FAILED_VERIFICATION_STATUSES,
  VALID_VERIFICATION_STATUSES,
  UserVerificationStatus,
  isVerificationStatusPending,
  isVerificationVerified,
  isVerificationFailed,
  isVerificationStatusComplete,
  canRetryVerification,
  getVerificationStatusLabel,
  getVerificationStatusColor,
} from '@vubon/shared-constants';

// ============================================================
// User Verification Extended Types
// ============================================================

/**
 * User verification with additional metadata
 */
export interface UserVerificationExtended extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: UserVerificationType;
  status: UserVerificationStatus;
  purpose: UserVerificationPurpose;
  channel: UserVerificationChannel;
  code?: string;
  token?: string;
  expiresAt: Date;
  verifiedAt?: Date;
  attempts: number;
  maxAttempts: number;
  isComplete: boolean;
  isPending: boolean;
  isExpired: boolean;
  isFailed: boolean;
  isVerified: boolean;
  isContactVerification: boolean;
  isSecurityVerification: boolean;
  isFinancialVerification: boolean;
  isAccountVerification: boolean;
  canResend: boolean;
  canRetry: boolean;
  remainingTime: number;
  metadata?: Metadata;
}

/**
 * User verification filter
 */
export interface UserVerificationFilter {
  userIds?: ID[];
  types?: UserVerificationType[];
  statuses?: UserVerificationStatus[];
  purposes?: UserVerificationPurpose[];
  channels?: UserVerificationChannel[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isComplete?: boolean;
  isPending?: boolean;
  isExpired?: boolean;
  isFailed?: boolean;
  isVerified?: boolean;
  isContactVerification?: boolean;
  isSecurityVerification?: boolean;
  isFinancialVerification?: boolean;
  isAccountVerification?: boolean;
  searchTerm?: string;
}

/**
 * User verification statistics
 */
export interface UserVerificationStatistics {
  userId: ID;
  totalVerifications: number;
  completedVerifications: number;
  pendingVerifications: number;
  expiredVerifications: number;
  failedVerifications: number;
  verifiedVerifications: number;
  byType: Record<UserVerificationType, number>;
  byStatus: Record<UserVerificationStatus, number>;
  byPurpose: Record<UserVerificationPurpose, number>;
  byChannel: Record<UserVerificationChannel, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageCompletionTime: number;
  successRate: number;
  failureRate: number;
  mostFrequentType: UserVerificationType;
  mostFrequentPurpose: UserVerificationPurpose;
  mostFrequentChannel: UserVerificationChannel;
}

/**
 * User verification summary
 */
export interface UserVerificationSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  completed: number;
  pending: number;
  expired: number;
  failed: number;
  verified: number;
  byType: Record<UserVerificationType, number>;
  byStatus: Record<UserVerificationStatus, number>;
  byPurpose: Record<UserVerificationPurpose, number>;
  byChannel: Record<UserVerificationChannel, number>;
  verificationTrend: {
    date: Date;
    total: number;
    completed: number;
    failed: number;
  }[];
  topTypes: {
    type: UserVerificationType;
    count: number;
    label: string;
  }[];
  topPurposes: {
    purpose: UserVerificationPurpose;
    count: number;
    label: string;
  }[];
}

/**
 * User verification configuration
 */
export interface UserVerificationConfiguration {
  enabled: boolean;
  defaultPurposes: UserVerificationPurpose[];
  defaultChannels: UserVerificationChannel[];
  codeLength: UserVerificationCodeLength;
  expirySeconds: number;
  maxAttempts: number;
  maxResendsPerHour: number;
  requireVerifiedContact: boolean;
  requireVerifiedAddress: boolean;
  notificationOnVerify: boolean;
  notificationOnFail: boolean;
  notificationOnExpire: boolean;
  alertConfig?: UserVerificationAlertConfig;
}

/**
 * User verification alert configuration
 */
export interface UserVerificationAlertConfig {
  enabled: boolean;
  failedAttemptAlert: boolean;
  maxAttemptsAlert: boolean;
  expiredVerificationAlert: boolean;
  suspiciousActivityAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'push' | 'in_app')[];
  cooldownMinutes: number;
  failedAttemptThreshold: number;
}

/**
 * User verification history
 */
export interface UserVerificationHistory extends BaseEntity, Timestamp {
  id: ID;
  verificationId: ID;
  userId: ID;
  action: 'create' | 'attempt' | 'verify' | 'fail' | 'expire' | 'resend' | 'cancel';
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
 * User verification attempt
 */
export interface UserVerificationAttempt extends BaseEntity, Timestamp {
  id: ID;
  verificationId: ID;
  userId: ID;
  code?: string;
  token?: string;
  isSuccess: boolean;
  errorMessage?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Metadata;
}

/**
 * User verification code
 */
export interface UserVerificationCode extends BaseEntity, Timestamp {
  id: ID;
  verificationId: ID;
  userId: ID;
  code: string;
  type: UserVerificationType;
  purpose: UserVerificationPurpose;
  channel: UserVerificationChannel;
  expiresAt: Date;
  isUsed: boolean;
  usedAt?: Date;
  metadata?: Metadata;
}

/**
 * User verification token
 */
export interface UserVerificationToken extends BaseEntity, Timestamp {
  id: ID;
  verificationId: ID;
  userId: ID;
  token: string;
  type: UserVerificationType;
  purpose: UserVerificationPurpose;
  expiresAt: Date;
  isUsed: boolean;
  usedAt?: Date;
  metadata?: Metadata;
}

/**
 * User verification export
 */
export interface UserVerificationExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: UserVerificationFilter;
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
  // Core Verification Constants
  USER_VERIFICATION,
  UserVerificationPurpose,
  UserVerificationChannel,
  UserVerificationCodeLength,
  getVerificationPurposeLabel,
  getVerificationChannelLabel,
  getVerificationStatusMessage,
  isVerificationComplete,
  isVerificationPending,
  isVerificationExpired,
  canResendVerification,
  isVerificationExpiredByTime,
  getRemainingTimeInSeconds,
  getVerificationCode,
  generateVerificationToken,
  getChannelForType,
  getVerificationPurposeForType,
  getVerificationExpiryTime,
  getMaxAttemptsForType,
  // Verification Type Constants
  USER_VERIFICATION_TYPE,
  USER_VERIFICATION_TYPE_LABELS,
  USER_VERIFICATION_TYPE_DESCRIPTIONS,
  CONTACT_VERIFICATION_TYPES,
  SECURITY_VERIFICATION_TYPES,
  FINANCIAL_VERIFICATION_TYPES,
  ACCOUNT_VERIFICATION_TYPES,
  UserVerificationType,
  isContactVerification,
  isSecurityVerification,
  isFinancialVerification,
  isAccountVerification,
  getVerificationTypeLabel,
  getVerificationTypeDescription,
  getVerificationTypeByValue,
  // Verification Status Constants
  USER_VERIFICATION_STATUS,
  USER_VERIFICATION_STATUS_LABELS,
  USER_VERIFICATION_STATUS_COLORS,
  ACTIVE_VERIFICATION_STATUSES,
  COMPLETED_VERIFICATION_STATUSES,
  FAILED_VERIFICATION_STATUSES,
  VALID_VERIFICATION_STATUSES,
  UserVerificationStatus,
  isVerificationStatusPending,
  isVerificationVerified,
  isVerificationFailed,
  isVerificationStatusComplete,
  canRetryVerification,
  getVerificationStatusLabel,
  getVerificationStatusColor,
};
