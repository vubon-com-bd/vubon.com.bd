// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * MFA type enum
 */
export const MFA_TYPE = {
  MFA_TOTP: 'totp',
  MFA_SMS: 'sms',
  MFA_EMAIL: 'email',
  MFA_AUTHENTICATOR: 'authenticator',
  MFA_HARDWARE_TOKEN: 'hardware_token',
  MFA_PUSH_NOTIFICATION: 'push_notification',
  MFA_RECOVERY_CODE: 'recovery_code',
} as const;

/**
 * Time-based One-Time Password (Google Authenticator, Authy)
 */
export const MFA_TOTP = MFA_TYPE.MFA_TOTP;

/**
 * SMS-based OTP verification
 */
export const MFA_SMS = MFA_TYPE.MFA_SMS;

/**
 * Email-based OTP verification
 */
export const MFA_EMAIL = MFA_TYPE.MFA_EMAIL;

/**
 * Authenticator app verification
 */
export const MFA_AUTHENTICATOR = MFA_TYPE.MFA_AUTHENTICATOR;

/**
 * Hardware token verification (YubiKey)
 */
export const MFA_HARDWARE_TOKEN = MFA_TYPE.MFA_HARDWARE_TOKEN;

/**
 * Push notification verification
 */
export const MFA_PUSH_NOTIFICATION = MFA_TYPE.MFA_PUSH_NOTIFICATION;

/**
 * Recovery code verification
 */
export const MFA_RECOVERY_CODE = MFA_TYPE.MFA_RECOVERY_CODE;

/**
 * Type for MFA type
 */
export type MfaType = (typeof MFA_TYPE)[keyof typeof MFA_TYPE];
