/**
 * Admin 2FA Type Constants
 * Detailed 2FA type definitions
 */

export const ADMIN_2FA_TYPE = {
  // TOTP based
  TOTP: 'totp',
  TOTP_SHA1: 'totp_sha1',
  TOTP_SHA256: 'totp_sha256',
  TOTP_SHA512: 'totp_sha512',

  // HOTP based
  HOTP: 'hotp',
  HOTP_SHA1: 'hotp_sha1',
  HOTP_SHA256: 'hotp_sha256',
  HOTP_SHA512: 'hotp_sha512',

  // Authenticator apps
  GOOGLE_AUTH: 'google_auth',
  MICROSOFT_AUTH: 'microsoft_auth',
  AUTHY: 'authy',
  DUO: 'duo',
  OKTA: 'okta',
  LASTPASS: 'lastpass',
  BITWARDEN: 'bitwarden',

  // SMS based
  SMS_OTP: 'sms_otp',
  SMS_TOTP: 'sms_totp',

  // Email based
  EMAIL_OTP: 'email_otp',
  EMAIL_LINK: 'email_link',

  // Push based
  PUSH_NOTIFICATION: 'push_notification',
  PUSH_APPROVAL: 'push_approval',

  // Hardware based
  YUBIKEY: 'yubikey',
  SOLO_KEY: 'solo_key',
  NITROKEY: 'nitrokey',
  LEDGER: 'ledger',
  TREZOR: 'trezor',

  // Biometric based
  FINGERPRINT: 'fingerprint',
  FACE_ID: 'face_id',
  IRIS_SCAN: 'iris_scan',
  VOICE_RECOGNITION: 'voice_recognition',

  // Backup based
  BACKUP_CODE: 'backup_code',
  RECOVERY_CODE: 'recovery_code',

  // QR based
  QR_CODE: 'qr_code',
  QR_TOTP: 'qr_totp',

  // Combined
  MIXED: 'mixed',
  MULTI_FACTOR: 'multi_factor',
} as const;

export type Admin2FATypeDetail = (typeof ADMIN_2FA_TYPE)[keyof typeof ADMIN_2FA_TYPE];

export const ADMIN_2FA_TYPE_CATEGORIES: Record<Admin2FATypeDetail, string> = {
  // TOTP based
  [ADMIN_2FA_TYPE.TOTP]: 'totp',
  [ADMIN_2FA_TYPE.TOTP_SHA1]: 'totp',
  [ADMIN_2FA_TYPE.TOTP_SHA256]: 'totp',
  [ADMIN_2FA_TYPE.TOTP_SHA512]: 'totp',

  // HOTP based
  [ADMIN_2FA_TYPE.HOTP]: 'hotp',
  [ADMIN_2FA_TYPE.HOTP_SHA1]: 'hotp',
  [ADMIN_2FA_TYPE.HOTP_SHA256]: 'hotp',
  [ADMIN_2FA_TYPE.HOTP_SHA512]: 'hotp',

  // Authenticator apps
  [ADMIN_2FA_TYPE.GOOGLE_AUTH]: 'authenticator',
  [ADMIN_2FA_TYPE.MICROSOFT_AUTH]: 'authenticator',
  [ADMIN_2FA_TYPE.AUTHY]: 'authenticator',
  [ADMIN_2FA_TYPE.DUO]: 'authenticator',
  [ADMIN_2FA_TYPE.OKTA]: 'authenticator',
  [ADMIN_2FA_TYPE.LASTPASS]: 'authenticator',
  [ADMIN_2FA_TYPE.BITWARDEN]: 'authenticator',

  // SMS based
  [ADMIN_2FA_TYPE.SMS_OTP]: 'sms',
  [ADMIN_2FA_TYPE.SMS_TOTP]: 'sms',

  // Email based
  [ADMIN_2FA_TYPE.EMAIL_OTP]: 'email',
  [ADMIN_2FA_TYPE.EMAIL_LINK]: 'email',

  // Push based
  [ADMIN_2FA_TYPE.PUSH_NOTIFICATION]: 'push',
  [ADMIN_2FA_TYPE.PUSH_APPROVAL]: 'push',

  // Hardware based
  [ADMIN_2FA_TYPE.YUBIKEY]: 'hardware',
  [ADMIN_2FA_TYPE.SOLO_KEY]: 'hardware',
  [ADMIN_2FA_TYPE.NITROKEY]: 'hardware',
  [ADMIN_2FA_TYPE.LEDGER]: 'hardware',
  [ADMIN_2FA_TYPE.TREZOR]: 'hardware',

  // Biometric based
  [ADMIN_2FA_TYPE.FINGERPRINT]: 'biometric',
  [ADMIN_2FA_TYPE.FACE_ID]: 'biometric',
  [ADMIN_2FA_TYPE.IRIS_SCAN]: 'biometric',
  [ADMIN_2FA_TYPE.VOICE_RECOGNITION]: 'biometric',

  // Backup based
  [ADMIN_2FA_TYPE.BACKUP_CODE]: 'backup',
  [ADMIN_2FA_TYPE.RECOVERY_CODE]: 'backup',

  // QR based
  [ADMIN_2FA_TYPE.QR_CODE]: 'qr',
  [ADMIN_2FA_TYPE.QR_TOTP]: 'qr',

  // Combined
  [ADMIN_2FA_TYPE.MIXED]: 'mixed',
  [ADMIN_2FA_TYPE.MULTI_FACTOR]: 'mixed',
};

export const ADMIN_2FA_TYPE_LABELS_DETAIL: Record<Admin2FATypeDetail, string> = {
  // TOTP based
  [ADMIN_2FA_TYPE.TOTP]: 'Time-based OTP',
  [ADMIN_2FA_TYPE.TOTP_SHA1]: 'TOTP (SHA1)',
  [ADMIN_2FA_TYPE.TOTP_SHA256]: 'TOTP (SHA256)',
  [ADMIN_2FA_TYPE.TOTP_SHA512]: 'TOTP (SHA512)',

  // HOTP based
  [ADMIN_2FA_TYPE.HOTP]: 'HMAC-based OTP',
  [ADMIN_2FA_TYPE.HOTP_SHA1]: 'HOTP (SHA1)',
  [ADMIN_2FA_TYPE.HOTP_SHA256]: 'HOTP (SHA256)',
  [ADMIN_2FA_TYPE.HOTP_SHA512]: 'HOTP (SHA512)',

  // Authenticator apps
  [ADMIN_2FA_TYPE.GOOGLE_AUTH]: 'Google Authenticator',
  [ADMIN_2FA_TYPE.MICROSOFT_AUTH]: 'Microsoft Authenticator',
  [ADMIN_2FA_TYPE.AUTHY]: 'Authy',
  [ADMIN_2FA_TYPE.DUO]: 'Duo Security',
  [ADMIN_2FA_TYPE.OKTA]: 'Okta Verify',
  [ADMIN_2FA_TYPE.LASTPASS]: 'LastPass Authenticator',
  [ADMIN_2FA_TYPE.BITWARDEN]: 'Bitwarden Authenticator',

  // SMS based
  [ADMIN_2FA_TYPE.SMS_OTP]: 'SMS OTP',
  [ADMIN_2FA_TYPE.SMS_TOTP]: 'SMS TOTP',

  // Email based
  [ADMIN_2FA_TYPE.EMAIL_OTP]: 'Email OTP',
  [ADMIN_2FA_TYPE.EMAIL_LINK]: 'Email Link',

  // Push based
  [ADMIN_2FA_TYPE.PUSH_NOTIFICATION]: 'Push Notification',
  [ADMIN_2FA_TYPE.PUSH_APPROVAL]: 'Push Approval',

  // Hardware based
  [ADMIN_2FA_TYPE.YUBIKEY]: 'YubiKey',
  [ADMIN_2FA_TYPE.SOLO_KEY]: 'SoloKey',
  [ADMIN_2FA_TYPE.NITROKEY]: 'NitroKey',
  [ADMIN_2FA_TYPE.LEDGER]: 'Ledger',
  [ADMIN_2FA_TYPE.TREZOR]: 'Trezor',

  // Biometric based
  [ADMIN_2FA_TYPE.FINGERPRINT]: 'Fingerprint',
  [ADMIN_2FA_TYPE.FACE_ID]: 'Face ID',
  [ADMIN_2FA_TYPE.IRIS_SCAN]: 'Iris Scan',
  [ADMIN_2FA_TYPE.VOICE_RECOGNITION]: 'Voice Recognition',

  // Backup based
  [ADMIN_2FA_TYPE.BACKUP_CODE]: 'Backup Code',
  [ADMIN_2FA_TYPE.RECOVERY_CODE]: 'Recovery Code',

  // QR based
  [ADMIN_2FA_TYPE.QR_CODE]: 'QR Code',
  [ADMIN_2FA_TYPE.QR_TOTP]: 'QR TOTP',

  // Combined
  [ADMIN_2FA_TYPE.MIXED]: 'Mixed Method',
  [ADMIN_2FA_TYPE.MULTI_FACTOR]: 'Multi-Factor',
};

export function get2faAdminTypeCategory(type: Admin2FATypeDetail): string {
  return ADMIN_2FA_TYPE_CATEGORIES[type] || 'other';
}

export function get2faAdminTypeLabel(type: Admin2FATypeDetail): string {
  return ADMIN_2FA_TYPE_LABELS_DETAIL[type] || 'Unknown 2FA Type';
}

export function is2faAdminTOTPType(type: Admin2FATypeDetail): boolean {
  return get2faAdminTypeCategory(type) === 'totp';
}

export function is2faAdminHOTPType(type: Admin2FATypeDetail): boolean {
  return get2faAdminTypeCategory(type) === 'hotp';
}

export function is2faAdminAuthenticatorType(type: Admin2FATypeDetail): boolean {
  return get2faAdminTypeCategory(type) === 'authenticator';
}

export function is2faAdminHardwareType(type: Admin2FATypeDetail): boolean {
  return get2faAdminTypeCategory(type) === 'hardware';
}

export function is2faAdminBiometricType(type: Admin2FATypeDetail): boolean {
  return get2faAdminTypeCategory(type) === 'biometric';
}

export function is2faAdminBackupType(type: Admin2FATypeDetail): boolean {
  return get2faAdminTypeCategory(type) === 'backup';
}

export function is2faAdminSMSBased(type: Admin2FATypeDetail): boolean {
  return get2faAdminTypeCategory(type) === 'sms';
}

export function is2faAdminEmailBased(type: Admin2FATypeDetail): boolean {
  return get2faAdminTypeCategory(type) === 'email';
}

export function is2faAdminPushBased(type: Admin2FATypeDetail): boolean {
  return get2faAdminTypeCategory(type) === 'push';
}

export function is2faAdminQRBased(type: Admin2FATypeDetail): boolean {
  return get2faAdminTypeCategory(type) === 'qr';
}
