// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Verification type enum
 */
export const VERIFICATION_TYPE = {
  EMAIL_VERIFICATION: 'email',
  PHONE_VERIFICATION: 'phone',
} as const;

/**
 * Email verification type
 */
export const EMAIL_VERIFICATION = VERIFICATION_TYPE.EMAIL_VERIFICATION;

/**
 * Phone verification type
 */
export const PHONE_VERIFICATION = VERIFICATION_TYPE.PHONE_VERIFICATION;

/**
 * Verification code length
 */
export const VERIFICATION_CODE_LENGTH = 6;

/**
 * Verification code expiry in seconds (10 minutes)
 */
export const VERIFICATION_CODE_EXPIRY = 600;

/**
 * Maximum number of verification attempts
 */
export const VERIFICATION_MAX_ATTEMPTS = 5;

/**
 * Verification code configuration
 */
export const VERIFICATION_CONFIG = {
  CODE_LENGTH: VERIFICATION_CODE_LENGTH,
  CODE_EXPIRY: VERIFICATION_CODE_EXPIRY,
  MAX_ATTEMPTS: VERIFICATION_MAX_ATTEMPTS,
} as const;

/**
 * Type for verification type
 */
export type VerificationType = (typeof VERIFICATION_TYPE)[keyof typeof VERIFICATION_TYPE];

/**
 * Type for verification configuration
 */
export type VerificationConfig = typeof VERIFICATION_CONFIG;
