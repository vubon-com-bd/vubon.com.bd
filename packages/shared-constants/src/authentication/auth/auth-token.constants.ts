// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Token type enum
 */
export const TOKEN_TYPE = {
  ACCESS: 'access',
  REFRESH: 'refresh',
  VERIFICATION: 'verification',
  PASSWORD_RESET: 'password_reset',
} as const;

/**
 * Access token type
 */
export const ACCESS = TOKEN_TYPE.ACCESS;

/**
 * Refresh token type
 */
export const REFRESH = TOKEN_TYPE.REFRESH;

/**
 * Verification token type
 */
export const VERIFICATION = TOKEN_TYPE.VERIFICATION;

/**
 * Password reset token type
 */
export const PASSWORD_RESET = TOKEN_TYPE.PASSWORD_RESET;

/**
 * Access token expiry in seconds (15 minutes)
 */
export const ACCESS_TOKEN_EXPIRY = 900;

/**
 * Refresh token expiry in seconds (7 days)
 */
export const REFRESH_TOKEN_EXPIRY = 604800;

/**
 * Verification token expiry in seconds (24 hours)
 */
export const VERIFICATION_TOKEN_EXPIRY = 86400;

/**
 * Password reset token expiry in seconds (1 hour)
 */
export const PASSWORD_RESET_TOKEN_EXPIRY = 3600;

/**
 * Token expiry configuration
 */
export const TOKEN_EXPIRY = {
  ACCESS: ACCESS_TOKEN_EXPIRY,
  REFRESH: REFRESH_TOKEN_EXPIRY,
  VERIFICATION: VERIFICATION_TOKEN_EXPIRY,
  PASSWORD_RESET: PASSWORD_RESET_TOKEN_EXPIRY,
} as const;

/**
 * Type for token type
 */
export type TokenType = (typeof TOKEN_TYPE)[keyof typeof TOKEN_TYPE];

/**
 * Type for token expiry configuration
 */
export type TokenExpiry = typeof TOKEN_EXPIRY;
