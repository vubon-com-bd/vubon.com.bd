// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * MFA status enum
 */
export const MFA_STATUS = {
  MFA_STATUS_ENABLED: 'enabled',
  MFA_STATUS_DISABLED: 'disabled',
  MFA_STATUS_PENDING: 'pending',
  MFA_STATUS_VERIFIED: 'verified',
  MFA_STATUS_EXPIRED: 'expired',
  MFA_STATUS_LOCKED: 'locked',
  MFA_STATUS_REQUIRED: 'required',
} as const;

/**
 * MFA is enabled and active
 */
export const MFA_STATUS_ENABLED = MFA_STATUS.MFA_STATUS_ENABLED;

/**
 * MFA is disabled
 */
export const MFA_STATUS_DISABLED = MFA_STATUS.MFA_STATUS_DISABLED;

/**
 * MFA setup is pending (setup in progress)
 */
export const MFA_STATUS_PENDING = MFA_STATUS.MFA_STATUS_PENDING;

/**
 * MFA has been verified successfully
 */
export const MFA_STATUS_VERIFIED = MFA_STATUS.MFA_STATUS_VERIFIED;

/**
 * MFA has expired
 */
export const MFA_STATUS_EXPIRED = MFA_STATUS.MFA_STATUS_EXPIRED;

/**
 * MFA is locked (too many attempts)
 */
export const MFA_STATUS_LOCKED = MFA_STATUS.MFA_STATUS_LOCKED;

/**
 * MFA is required (must be enabled)
 */
export const MFA_STATUS_REQUIRED = MFA_STATUS.MFA_STATUS_REQUIRED;

/**
 * Type for MFA status
 */
export type MfaStatus = (typeof MFA_STATUS)[keyof typeof MFA_STATUS];
