/**
 * User Verification Constants Index
 * Export all user verification-related constants and types
 */

// Core Verification Constants
export {
  USER_VERIFICATION,
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
} from './user-verification.constants';

export type {
  UserVerificationPurpose,
  UserVerificationChannel,
  UserVerificationCodeLength,
} from './user-verification.constants';

// Verification Type Constants
export {
  USER_VERIFICATION_TYPE,
  USER_VERIFICATION_TYPE_LABELS,
  USER_VERIFICATION_TYPE_DESCRIPTIONS,
  CONTACT_VERIFICATION_TYPES,
  SECURITY_VERIFICATION_TYPES,
  FINANCIAL_VERIFICATION_TYPES,
  ACCOUNT_VERIFICATION_TYPES,
  isContactVerification,
  isSecurityVerification,
  isFinancialVerification,
  isAccountVerification,
  getVerificationTypeLabel,
  getVerificationTypeDescription,
  getVerificationTypeByValue,
} from './user-verification-type.constants';

export type { UserVerificationType } from './user-verification-type.constants';

// Verification Status Constants
export {
  USER_VERIFICATION_STATUS,
  USER_VERIFICATION_STATUS_LABELS,
  USER_VERIFICATION_STATUS_COLORS,
  ACTIVE_VERIFICATION_STATUSES,
  COMPLETED_VERIFICATION_STATUSES,
  FAILED_VERIFICATION_STATUSES,
  VALID_VERIFICATION_STATUSES,
  isVerificationPending as isVerificationStatusPending,
  isVerificationVerified,
  isVerificationFailed,
  isVerificationComplete as isVerificationStatusComplete,
  canRetryVerification,
  getVerificationStatusLabel,
  getVerificationStatusColor,
} from './user-verification-status.constants';

export type { UserVerificationStatus } from './user-verification-status.constants';
