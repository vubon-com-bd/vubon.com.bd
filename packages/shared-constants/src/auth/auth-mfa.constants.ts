/**
 * Auth MFA Constants
 * প্রমাণীকরণ মাল্টি-ফ্যাক্টর অথেনটিকেশন সম্পর্কিত কনস্ট্যান্টস
 */

export const AUTH_MFA = {
  // MFA types
  TYPES: {
    TOTP: 'totp',
    SMS: 'sms',
    EMAIL: 'email',
    BACKUP_CODE: 'backup_code',
    WEBAUTHN: 'webauthn',
    HARDWARE_TOKEN: 'hardware_token',
    SMART_CARD: 'smart_card',
    BIOMETRIC: 'biometric',
    PUSH_NOTIFICATION: 'push_notification',
    RECOVERY_CODE: 'recovery_code',
  },

  // MFA status
  STATUS: {
    ENABLED: 'enabled',
    DISABLED: 'disabled',
    PENDING: 'pending',
    VERIFIED: 'verified',
    FAILED: 'failed',
    LOCKED: 'locked',
    EXPIRED: 'expired',
  },

  // MFA methods
  METHODS: {
    AUTHENTICATOR_APP: 'authenticator_app',
    SMS_OTP: 'sms_otp',
    EMAIL_OTP: 'email_otp',
    BACKUP_CODES: 'backup_codes',
    WEBAUTHN_PASSKEY: 'webauthn_passkey',
    YUBIKEY: 'yubikey',
    SMART_CARD: 'smart_card',
    FINGERPRINT: 'fingerprint',
    FACE_ID: 'face_id',
    IRIS_SCAN: 'iris_scan',
  },

  // Default values
  DEFAULTS: {
    TOTP_INTERVAL: 30,
    TOTP_DIGITS: 6,
    TOTP_ALGORITHM: 'SHA1',
    BACKUP_CODE_COUNT: 10,
    BACKUP_CODE_LENGTH: 8,
    MAX_ATTEMPTS: 3,
    LOCKOUT_DURATION: 300, // 5 minutes
    RECOVERY_CODE_EXPIRY: 86400, // 24 hours
  },
} as const;

export type AuthMFAType = (typeof AUTH_MFA.TYPES)[keyof typeof AUTH_MFA.TYPES];
export type AuthMFAStatus = (typeof AUTH_MFA.STATUS)[keyof typeof AUTH_MFA.STATUS];
export type AuthMFAMethod = (typeof AUTH_MFA.METHODS)[keyof typeof AUTH_MFA.METHODS];
