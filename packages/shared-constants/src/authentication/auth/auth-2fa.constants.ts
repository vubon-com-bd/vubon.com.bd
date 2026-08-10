// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Default 2FA enabled status
 */
export const TWO_FA_ENABLED_DEFAULT = false;

/**
 * 2FA code length
 */
export const TWO_FA_CODE_LENGTH = 6;

/**
 * 2FA code expiry in seconds (5 minutes)
 */
export const TWO_FA_CODE_EXPIRY = 300;

/**
 * Maximum number of 2FA verification attempts
 */
export const TWO_FA_MAX_ATTEMPTS = 5;

/**
 * 2FA retry delay in seconds after failed attempt
 */
export const TWO_FA_RETRY_DELAY = 30;

/**
 * 2FA configuration
 */
export const TWO_FA_CONFIG = {
  ENABLED_DEFAULT: TWO_FA_ENABLED_DEFAULT,
  CODE_LENGTH: TWO_FA_CODE_LENGTH,
  CODE_EXPIRY: TWO_FA_CODE_EXPIRY,
  MAX_ATTEMPTS: TWO_FA_MAX_ATTEMPTS,
  RETRY_DELAY: TWO_FA_RETRY_DELAY,
} as const;

/**
 * Type for 2FA configuration
 */
export type TwoFaConfig = typeof TWO_FA_CONFIG;
