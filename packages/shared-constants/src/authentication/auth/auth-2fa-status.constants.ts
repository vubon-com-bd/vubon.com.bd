// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * 2FA status enum
 */
export const TWO_FA_STATUS = {
  ENABLED: 'enabled',
  DISABLED: 'disabled',
  PENDING: 'pending',
  VERIFIED: 'verified',
  EXPIRED: 'expired',
  LOCKED: 'locked',
  REQUIRED: 'required',
  SETUP: 'setup',
} as const;

/**
 * 2FA is enabled and active
 */
export const TWO_FA_STATUS_ENABLED = TWO_FA_STATUS.ENABLED;

/**
 * 2FA is disabled
 */
export const TWO_FA_STATUS_DISABLED = TWO_FA_STATUS.DISABLED;

/**
 * 2FA setup is pending (setup in progress)
 */
export const TWO_FA_STATUS_PENDING = TWO_FA_STATUS.PENDING;

/**
 * 2FA has been verified successfully
 */
export const TWO_FA_STATUS_VERIFIED = TWO_FA_STATUS.VERIFIED;

/**
 * 2FA has expired
 */
export const TWO_FA_STATUS_EXPIRED = TWO_FA_STATUS.EXPIRED;

/**
 * 2FA is locked (too many attempts)
 */
export const TWO_FA_STATUS_LOCKED = TWO_FA_STATUS.LOCKED;

/**
 * 2FA is required (must be enabled)
 */
export const TWO_FA_STATUS_REQUIRED = TWO_FA_STATUS.REQUIRED;

/**
 * 2FA is in setup mode
 */
export const TWO_FA_STATUS_SETUP = TWO_FA_STATUS.SETUP;

/**
 * Type for 2FA status
 */
export type TwoFaStatus = (typeof TWO_FA_STATUS)[keyof typeof TWO_FA_STATUS];
