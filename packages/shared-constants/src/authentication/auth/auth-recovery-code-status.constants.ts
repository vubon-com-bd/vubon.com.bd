// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Recovery code status enum
 */
export const RECOVERY_CODE_STATUS = {
  ACTIVE: 'active',
  USED: 'used',
  EXPIRED: 'expired',
  REVOKED: 'revoked',
  PENDING: 'pending',
} as const;

/**
 * Recovery code is active and usable
 */
export const RECOVERY_CODE_ACTIVE = RECOVERY_CODE_STATUS.ACTIVE;

/**
 * Recovery code has been used
 */
export const RECOVERY_CODE_USED = RECOVERY_CODE_STATUS.USED;

/**
 * Recovery code has expired
 */
export const RECOVERY_CODE_EXPIRED = RECOVERY_CODE_STATUS.EXPIRED;

/**
 * Recovery code has been revoked
 */
export const RECOVERY_CODE_REVOKED = RECOVERY_CODE_STATUS.REVOKED;

/**
 * Recovery code is pending
 */
export const RECOVERY_CODE_PENDING = RECOVERY_CODE_STATUS.PENDING;

/**
 * Type for recovery code status
 */
export type RecoveryCodeStatus = (typeof RECOVERY_CODE_STATUS)[keyof typeof RECOVERY_CODE_STATUS];
