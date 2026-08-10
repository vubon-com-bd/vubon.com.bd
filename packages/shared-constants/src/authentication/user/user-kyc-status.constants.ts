// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * KYC status enum
 */
export const USER_KYC_STATUS = {
  NOT_SUBMITTED: 'not_submitted',
  PENDING: 'pending',
  IN_REVIEW: 'in_review',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
  EXPIRED: 'expired',
  NEEDS_REVISION: 'needs_revision',
  FLAGGED: 'flagged',
} as const;

/**
 * KYC has not been submitted
 */
export const USER_KYC_STATUS_NOT_SUBMITTED = USER_KYC_STATUS.NOT_SUBMITTED;

/**
 * KYC is pending review
 */
export const USER_KYC_STATUS_PENDING = USER_KYC_STATUS.PENDING;

/**
 * KYC is currently in review
 */
export const USER_KYC_STATUS_IN_REVIEW = USER_KYC_STATUS.IN_REVIEW;

/**
 * KYC has been verified
 */
export const USER_KYC_STATUS_VERIFIED = USER_KYC_STATUS.VERIFIED;

/**
 * KYC has been rejected
 */
export const USER_KYC_STATUS_REJECTED = USER_KYC_STATUS.REJECTED;

/**
 * KYC has expired
 */
export const USER_KYC_STATUS_EXPIRED = USER_KYC_STATUS.EXPIRED;

/**
 * KYC needs revision (resubmit required)
 */
export const USER_KYC_STATUS_NEEDS_REVISION = USER_KYC_STATUS.NEEDS_REVISION;

/**
 * KYC has been flagged (suspicious)
 */
export const USER_KYC_STATUS_FLAGGED = USER_KYC_STATUS.FLAGGED;

/**
 * Type for KYC status
 */
export type UserKycStatusEnum = (typeof USER_KYC_STATUS)[keyof typeof USER_KYC_STATUS];
