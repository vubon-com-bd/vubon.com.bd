// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Authentication error codes enum
 */
export const AUTH_ERROR_CODE = {
  INVALID_CREDENTIALS: 'AUTH_001',
  ACCOUNT_LOCKED: 'AUTH_002',
  ACCOUNT_NOT_VERIFIED: 'AUTH_003',
  TOKEN_EXPIRED: 'AUTH_004',
  INVALID_TOKEN: 'AUTH_005',
  MFA_REQUIRED: 'AUTH_006',
  INVALID_MFA: 'AUTH_007',
  SESSION_EXPIRED: 'AUTH_008',
  RATE_LIMIT_EXCEEDED: 'AUTH_009',
} as const;

/**
 * Invalid credentials error
 */
export const INVALID_CREDENTIALS = AUTH_ERROR_CODE.INVALID_CREDENTIALS;

/**
 * Account locked error
 */
export const ACCOUNT_LOCKED = AUTH_ERROR_CODE.ACCOUNT_LOCKED;

/**
 * Account not verified error
 */
export const ACCOUNT_NOT_VERIFIED = AUTH_ERROR_CODE.ACCOUNT_NOT_VERIFIED;

/**
 * Token expired error
 */
export const TOKEN_EXPIRED = AUTH_ERROR_CODE.TOKEN_EXPIRED;

/**
 * Invalid token error
 */
export const INVALID_TOKEN = AUTH_ERROR_CODE.INVALID_TOKEN;

/**
 * MFA required error
 */
export const MFA_REQUIRED = AUTH_ERROR_CODE.MFA_REQUIRED;

/**
 * Invalid MFA error
 */
export const INVALID_MFA = AUTH_ERROR_CODE.INVALID_MFA;

/**
 * Session expired error
 */
export const SESSION_EXPIRED = AUTH_ERROR_CODE.SESSION_EXPIRED;

/**
 * Rate limit exceeded error
 */
export const RATE_LIMIT_EXCEEDED = AUTH_ERROR_CODE.RATE_LIMIT_EXCEEDED;

/**
 * Authentication error messages
 */
export const AUTH_ERROR_MESSAGE = {
  [AUTH_ERROR_CODE.INVALID_CREDENTIALS]: 'Invalid email or password',
  [AUTH_ERROR_CODE.ACCOUNT_LOCKED]: 'Your account has been locked. Please contact support',
  [AUTH_ERROR_CODE.ACCOUNT_NOT_VERIFIED]: 'Please verify your email address first',
  [AUTH_ERROR_CODE.TOKEN_EXPIRED]: 'Your session token has expired. Please login again',
  [AUTH_ERROR_CODE.INVALID_TOKEN]: 'Invalid or malformed token provided',
  [AUTH_ERROR_CODE.MFA_REQUIRED]: 'Multi-factor authentication is required',
  [AUTH_ERROR_CODE.INVALID_MFA]: 'Invalid multi-factor authentication code',
  [AUTH_ERROR_CODE.SESSION_EXPIRED]: 'Your session has expired. Please login again',
  [AUTH_ERROR_CODE.RATE_LIMIT_EXCEEDED]: 'Too many attempts. Please try again later',
} as const;

/**
 * Type for authentication error code
 */
export type AuthErrorCode = (typeof AUTH_ERROR_CODE)[keyof typeof AUTH_ERROR_CODE];

/**
 * Type for authentication error message
 */
export type AuthErrorMessage = (typeof AUTH_ERROR_MESSAGE)[keyof typeof AUTH_ERROR_MESSAGE];
