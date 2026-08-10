// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Recovery code length
 */
export const RECOVERY_CODE_LENGTH = 8;

/**
 * Number of recovery codes to generate
 */
export const RECOVERY_CODE_COUNT = 10;

/**
 * Recovery code expiry in days (30 days)
 */
export const RECOVERY_CODE_EXPIRY = 30;

/**
 * Recovery code format
 */
export const RECOVERY_CODE_FORMAT = 'alphanumeric' as const;

/**
 * Maximum number of times a recovery code can be used
 */
export const RECOVERY_MAX_USAGE = 1;

/**
 * Character set used for generating recovery codes
 */
export const RECOVERY_CODE_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

/**
 * Recovery session timeout in seconds (15 minutes)
 */
export const RECOVERY_SESSION_TIMEOUT = 900;

/**
 * Recovery code configuration
 */
export const RECOVERY_CONFIG = {
  CODE_LENGTH: RECOVERY_CODE_LENGTH,
  CODE_COUNT: RECOVERY_CODE_COUNT,
  CODE_EXPIRY: RECOVERY_CODE_EXPIRY,
  CODE_FORMAT: RECOVERY_CODE_FORMAT,
  MAX_USAGE: RECOVERY_MAX_USAGE,
  CODE_CHARSET: RECOVERY_CODE_CHARSET,
  SESSION_TIMEOUT: RECOVERY_SESSION_TIMEOUT,
} as const;

/**
 * Type for recovery code format
 */
export type RecoveryCodeFormat = typeof RECOVERY_CODE_FORMAT;

/**
 * Type for recovery configuration
 */
export type RecoveryConfig = typeof RECOVERY_CONFIG;
