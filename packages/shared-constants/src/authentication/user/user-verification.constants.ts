// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Verification code length
 */
export const USER_VERIFICATION_CODE_LENGTH = 6;

/**
 * Verification code expiry in minutes (10 minutes)
 */
export const USER_VERIFICATION_CODE_EXPIRY = 10;

/**
 * Maximum number of verification attempts
 */
export const USER_VERIFICATION_MAX_ATTEMPTS = 5;

/**
 * Resend delay in seconds (30 seconds)
 */
export const USER_VERIFICATION_RESEND_DELAY = 30;

/**
 * User verification configuration
 */
export const USER_VERIFICATION_CONFIG = {
  CODE_LENGTH: USER_VERIFICATION_CODE_LENGTH,
  CODE_EXPIRY: USER_VERIFICATION_CODE_EXPIRY,
  MAX_ATTEMPTS: USER_VERIFICATION_MAX_ATTEMPTS,
  RESEND_DELAY: USER_VERIFICATION_RESEND_DELAY,
} as const;

/**
 * Type for user verification configuration
 */
export type UserVerificationConfig = typeof USER_VERIFICATION_CONFIG;
