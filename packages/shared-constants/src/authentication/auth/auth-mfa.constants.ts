// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Default MFA enabled status
 */
export const MFA_ENABLED_DEFAULT = false;

/**
 * Maximum number of MFA verification attempts
 */
export const MFA_MAX_ATTEMPTS = 5;

/**
 * MFA retry delay in seconds after failed attempt
 */
export const MFA_RETRY_DELAY = 30;

/**
 * MFA code length
 */
export const MFA_CODE_LENGTH = 6;

/**
 * MFA code expiry in seconds (5 minutes)
 */
export const MFA_CODE_EXPIRY = 300;

/**
 * Number of backup codes to generate
 */
export const MFA_BACKUP_CODES_COUNT = 10;

/**
 * Length of each backup code
 */
export const MFA_BACKUP_CODES_LENGTH = 8;

/**
 * MFA session timeout in seconds (30 minutes)
 */
export const MFA_SESSION_TIMEOUT = 1800;

/**
 * Allowed MFA types
 */
export const MFA_ALLOWED_TYPES = ['totp', 'sms', 'email'] as const;

/**
 * Default MFA type
 */
export const MFA_DEFAULT_TYPE = 'totp';

/**
 * MFA configuration object
 */
export const MFA_CONFIG = {
  ENABLED_DEFAULT: MFA_ENABLED_DEFAULT,
  MAX_ATTEMPTS: MFA_MAX_ATTEMPTS,
  RETRY_DELAY: MFA_RETRY_DELAY,
  CODE_LENGTH: MFA_CODE_LENGTH,
  CODE_EXPIRY: MFA_CODE_EXPIRY,
  BACKUP_CODES_COUNT: MFA_BACKUP_CODES_COUNT,
  BACKUP_CODES_LENGTH: MFA_BACKUP_CODES_LENGTH,
  SESSION_TIMEOUT: MFA_SESSION_TIMEOUT,
  ALLOWED_TYPES: MFA_ALLOWED_TYPES,
  DEFAULT_TYPE: MFA_DEFAULT_TYPE,
} as const;

/**
 * Type for MFA configuration
 */
export type MfaConfig = typeof MFA_CONFIG;

/**
 * Type for MFA allowed types
 */
export type MfaAllowedType = (typeof MFA_ALLOWED_TYPES)[number];
