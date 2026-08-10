// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * User error codes enum
 */
export const USER_ERROR_CODE = {
  USER_NOT_FOUND: 'USR_001',
  USER_ALREADY_EXISTS: 'USR_002',
  USER_INACTIVE: 'USR_003',
  USER_SUSPENDED: 'USR_004',
  USER_BANNED: 'USR_005',
  USER_DELETED: 'USR_006',
  INVALID_CREDENTIALS: 'USR_007',
  INVALID_EMAIL: 'USR_008',
  INVALID_PHONE: 'USR_009',
  INVALID_PASSWORD: 'USR_010',
  PASSWORD_MISMATCH: 'USR_011',
  EMAIL_NOT_VERIFIED: 'USR_012',
  PHONE_NOT_VERIFIED: 'USR_013',
  KYC_NOT_VERIFIED: 'USR_014',
  INVALID_TOKEN: 'USR_015',
  TOKEN_EXPIRED: 'USR_016',
  RATE_LIMIT_EXCEEDED: 'USR_017',
  INVALID_ROLE: 'USR_018',
  INSUFFICIENT_PERMISSIONS: 'USR_019',
  DUPLICATE_ENTRY: 'USR_020',
  VALIDATION_ERROR: 'USR_021',
} as const;

/**
 * User not found error
 */
export const USER_ERROR_CODE_USER_NOT_FOUND = USER_ERROR_CODE.USER_NOT_FOUND;

/**
 * User already exists error
 */
export const USER_ERROR_CODE_USER_ALREADY_EXISTS = USER_ERROR_CODE.USER_ALREADY_EXISTS;

/**
 * User inactive error
 */
export const USER_ERROR_CODE_USER_INACTIVE = USER_ERROR_CODE.USER_INACTIVE;

/**
 * User suspended error
 */
export const USER_ERROR_CODE_USER_SUSPENDED = USER_ERROR_CODE.USER_SUSPENDED;

/**
 * User banned error
 */
export const USER_ERROR_CODE_USER_BANNED = USER_ERROR_CODE.USER_BANNED;

/**
 * User deleted error
 */
export const USER_ERROR_CODE_USER_DELETED = USER_ERROR_CODE.USER_DELETED;

/**
 * Invalid credentials error
 */
export const USER_ERROR_CODE_INVALID_CREDENTIALS = USER_ERROR_CODE.INVALID_CREDENTIALS;

/**
 * Invalid email error
 */
export const USER_ERROR_CODE_INVALID_EMAIL = USER_ERROR_CODE.INVALID_EMAIL;

/**
 * Invalid phone error
 */
export const USER_ERROR_CODE_INVALID_PHONE = USER_ERROR_CODE.INVALID_PHONE;

/**
 * Invalid password error
 */
export const USER_ERROR_CODE_INVALID_PASSWORD = USER_ERROR_CODE.INVALID_PASSWORD;

/**
 * Password mismatch error
 */
export const USER_ERROR_CODE_PASSWORD_MISMATCH = USER_ERROR_CODE.PASSWORD_MISMATCH;

/**
 * Email not verified error
 */
export const USER_ERROR_CODE_EMAIL_NOT_VERIFIED = USER_ERROR_CODE.EMAIL_NOT_VERIFIED;

/**
 * Phone not verified error
 */
export const USER_ERROR_CODE_PHONE_NOT_VERIFIED = USER_ERROR_CODE.PHONE_NOT_VERIFIED;

/**
 * KYC not verified error
 */
export const USER_ERROR_CODE_KYC_NOT_VERIFIED = USER_ERROR_CODE.KYC_NOT_VERIFIED;

/**
 * Invalid token error
 */
export const USER_ERROR_CODE_INVALID_TOKEN = USER_ERROR_CODE.INVALID_TOKEN;

/**
 * Token expired error
 */
export const USER_ERROR_CODE_TOKEN_EXPIRED = USER_ERROR_CODE.TOKEN_EXPIRED;

/**
 * Rate limit exceeded error
 */
export const USER_ERROR_CODE_RATE_LIMIT_EXCEEDED = USER_ERROR_CODE.RATE_LIMIT_EXCEEDED;

/**
 * Invalid role error
 */
export const USER_ERROR_CODE_INVALID_ROLE = USER_ERROR_CODE.INVALID_ROLE;

/**
 * Insufficient permissions error
 */
export const USER_ERROR_CODE_INSUFFICIENT_PERMISSIONS = USER_ERROR_CODE.INSUFFICIENT_PERMISSIONS;

/**
 * Duplicate entry error
 */
export const USER_ERROR_CODE_DUPLICATE_ENTRY = USER_ERROR_CODE.DUPLICATE_ENTRY;

/**
 * Validation error
 */
export const USER_ERROR_CODE_VALIDATION_ERROR = USER_ERROR_CODE.VALIDATION_ERROR;

/**
 * User error messages
 */
export const USER_ERROR_MESSAGE = {
  [USER_ERROR_CODE.USER_NOT_FOUND]: 'User not found',
  [USER_ERROR_CODE.USER_ALREADY_EXISTS]: 'User already exists',
  [USER_ERROR_CODE.USER_INACTIVE]: 'User account is inactive',
  [USER_ERROR_CODE.USER_SUSPENDED]: 'User account has been suspended',
  [USER_ERROR_CODE.USER_BANNED]: 'User account has been banned',
  [USER_ERROR_CODE.USER_DELETED]: 'User account has been deleted',
  [USER_ERROR_CODE.INVALID_CREDENTIALS]: 'Invalid email or password',
  [USER_ERROR_CODE.INVALID_EMAIL]: 'Invalid email address format',
  [USER_ERROR_CODE.INVALID_PHONE]: 'Invalid phone number format',
  [USER_ERROR_CODE.INVALID_PASSWORD]: 'Invalid password format',
  [USER_ERROR_CODE.PASSWORD_MISMATCH]: 'Passwords do not match',
  [USER_ERROR_CODE.EMAIL_NOT_VERIFIED]: 'Email address is not verified',
  [USER_ERROR_CODE.PHONE_NOT_VERIFIED]: 'Phone number is not verified',
  [USER_ERROR_CODE.KYC_NOT_VERIFIED]: 'KYC verification is required',
  [USER_ERROR_CODE.INVALID_TOKEN]: 'Invalid or malformed token',
  [USER_ERROR_CODE.TOKEN_EXPIRED]: 'Token has expired',
  [USER_ERROR_CODE.RATE_LIMIT_EXCEEDED]: 'Too many requests. Please try again later',
  [USER_ERROR_CODE.INVALID_ROLE]: 'Invalid role specified',
  [USER_ERROR_CODE.INSUFFICIENT_PERMISSIONS]: 'Insufficient permissions to perform this action',
  [USER_ERROR_CODE.DUPLICATE_ENTRY]: 'Duplicate entry found',
  [USER_ERROR_CODE.VALIDATION_ERROR]: 'Validation error occurred',
} as const;

/**
 * Type for user error code
 */
export type UserErrorCode = (typeof USER_ERROR_CODE)[keyof typeof USER_ERROR_CODE];

/**
 * Type for user error message
 */
export type UserErrorMessage = (typeof USER_ERROR_MESSAGE)[keyof typeof USER_ERROR_MESSAGE];
