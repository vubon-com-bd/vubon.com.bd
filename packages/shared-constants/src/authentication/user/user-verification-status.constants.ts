// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * User verification status enum
 */
export const USER_VERIFICATION_STATUS = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
  EXPIRED: 'expired',
  FAILED: 'failed',
  SKIPPED: 'skipped',
} as const;

/**
 * Verification is pending
 */
export const USER_VERIFICATION_STATUS_PENDING = USER_VERIFICATION_STATUS.PENDING;

/**
 * Verification has been verified
 */
export const USER_VERIFICATION_STATUS_VERIFIED = USER_VERIFICATION_STATUS.VERIFIED;

/**
 * Verification has been rejected
 */
export const USER_VERIFICATION_STATUS_REJECTED = USER_VERIFICATION_STATUS.REJECTED;

/**
 * Verification has expired
 */
export const USER_VERIFICATION_STATUS_EXPIRED = USER_VERIFICATION_STATUS.EXPIRED;

/**
 * Verification has failed
 */
export const USER_VERIFICATION_STATUS_FAILED = USER_VERIFICATION_STATUS.FAILED;

/**
 * Verification has been skipped
 */
export const USER_VERIFICATION_STATUS_SKIPPED = USER_VERIFICATION_STATUS.SKIPPED;

/**
 * Type for user verification status
 */
export type UserVerificationStatus =
  (typeof USER_VERIFICATION_STATUS)[keyof typeof USER_VERIFICATION_STATUS];
