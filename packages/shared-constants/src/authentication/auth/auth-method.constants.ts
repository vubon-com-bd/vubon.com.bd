// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Authentication method enum
 */
export const AUTH_METHOD = {
  PASSWORD: 'password',
  OTP: 'otp',
  MAGIC_LINK: 'magic_link',
  BIOMETRIC: 'biometric',
  TOTP: 'totp',
  SMS: 'sms',
  EMAIL: 'email',
} as const;

/**
 * Password authentication method
 */
export const PASSWORD = AUTH_METHOD.PASSWORD;

/**
 * One-Time Password authentication method
 */
export const OTP = AUTH_METHOD.OTP;

/**
 * Magic Link authentication method
 */
export const MAGIC_LINK = AUTH_METHOD.MAGIC_LINK;

/**
 * Biometric authentication method
 */
export const BIOMETRIC = AUTH_METHOD.BIOMETRIC;

/**
 * Time-Based One-Time Password authentication method
 */
export const TOTP = AUTH_METHOD.TOTP;

/**
 * SMS authentication method
 */
export const SMS = AUTH_METHOD.SMS;

/**
 * Email authentication method
 */
export const EMAIL = AUTH_METHOD.EMAIL;

/**
 * Type for authentication method
 */
export type AuthMethod = (typeof AUTH_METHOD)[keyof typeof AUTH_METHOD];
