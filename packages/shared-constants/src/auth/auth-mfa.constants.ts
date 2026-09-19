export const AUTH_MFA = {
  ENABLED_DEFAULT: false,
  OTP_LENGTH: 6,
  OTP_EXPIRY_SECONDS: 300,
  MAX_ATTEMPTS: 5,
  BACKUP_CODES_COUNT: 10,
  BACKUP_CODE_LENGTH: 10,
  TOTP_WINDOW: 1,
  TOTP_PERIOD_SECONDS: 30,
  TOTP_DIGITS: 6,
  TOTP_ALGORITHM: 'SHA1',
} as const;

export const AUTH_MFA_METHOD = {
  TOTP: 'totp',
  SMS: 'sms',
  EMAIL: 'email',
  PUSH: 'push',
  WEBAUTHN: 'webauthn',
  BACKUP_CODE: 'backup_code',
} as const;

export type AuthMfaMethodType = (typeof AUTH_MFA_METHOD)[keyof typeof AUTH_MFA_METHOD];
