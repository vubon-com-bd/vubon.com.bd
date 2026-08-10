// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * 2FA type enum
 */
export const TWO_FA_TYPE = {
  TOTP: 'totp',
  SMS: 'sms',
  EMAIL: 'email',
  AUTHENTICATOR: 'authenticator',
  HARDWARE_TOKEN: 'hardware_token',
  PUSH_NOTIFICATION: 'push_notification',
  BACKUP_CODE: 'backup_code',
} as const;

/**
 * Time-based One-Time Password (Google Authenticator, Authy)
 */
export const TWO_FA_TYPE_TOTP = TWO_FA_TYPE.TOTP;

/**
 * SMS-based OTP verification
 */
export const TWO_FA_TYPE_SMS = TWO_FA_TYPE.SMS;

/**
 * Email-based OTP verification
 */
export const TWO_FA_TYPE_EMAIL = TWO_FA_TYPE.EMAIL;

/**
 * Authenticator app verification
 */
export const TWO_FA_TYPE_AUTHENTICATOR = TWO_FA_TYPE.AUTHENTICATOR;

/**
 * Hardware token verification (YubiKey)
 */
export const TWO_FA_TYPE_HARDWARE_TOKEN = TWO_FA_TYPE.HARDWARE_TOKEN;

/**
 * Push notification verification
 */
export const TWO_FA_TYPE_PUSH_NOTIFICATION = TWO_FA_TYPE.PUSH_NOTIFICATION;

/**
 * Backup code verification
 */
export const TWO_FA_TYPE_BACKUP_CODE = TWO_FA_TYPE.BACKUP_CODE;

/**
 * Type for 2FA type
 */
export type TwoFaType = (typeof TWO_FA_TYPE)[keyof typeof TWO_FA_TYPE];
