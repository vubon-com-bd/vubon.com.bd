/**
 * অ্যাডমিন 2FA-এর টাইপ সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// 2FA টাইপ
export const TWO_FA_TYPES = {
  AUTHENTICATOR_APP: 'authenticator_app',
  SMS_OTP: 'sms_otp',
  EMAIL_OTP: 'email_otp',
  HARDWARE_TOKEN: 'hardware_token',
  BIOMETRIC: 'biometric',
  BACKUP_CODE: 'backup_code',
} as const;

// টাইপের আইকন
export const TWO_FA_TYPE_ICONS = {
  AUTHENTICATOR_APP: '🔐',
  SMS_OTP: '📱',
  EMAIL_OTP: '📧',
  HARDWARE_TOKEN: '🔑',
  BIOMETRIC: '🖐️',
  BACKUP_CODE: '📋',
} as const;

// টাইপের কালার কোড
export const TWO_FA_TYPE_COLORS = {
  AUTHENTICATOR_APP: '#3B82F6',
  SMS_OTP: '#22C55E',
  EMAIL_OTP: '#F59E0B',
  HARDWARE_TOKEN: '#8B5CF6',
  BIOMETRIC: '#EC4899',
  BACKUP_CODE: '#14B8A6',
} as const;

// টাইপের ডেসক্রিপশন
export const TWO_FA_TYPE_DESCRIPTIONS = {
  AUTHENTICATOR_APP: 'Authenticator app (Google Authenticator, Authy, etc.)',
  SMS_OTP: 'SMS based one-time password',
  EMAIL_OTP: 'Email based one-time password',
  HARDWARE_TOKEN: 'Physical hardware token (YubiKey, etc.)',
  BIOMETRIC: 'Biometric authentication (fingerprint, face, etc.)',
  BACKUP_CODE: 'Backup codes for emergency access',
} as const;

// টাইপের নিরাপত্তা লেভেল (১ = সর্বোচ্চ)
export const TWO_FA_TYPE_SECURITY_LEVEL = {
  AUTHENTICATOR_APP: 1,
  SMS_OTP: 3,
  EMAIL_OTP: 4,
  HARDWARE_TOKEN: 1,
  BIOMETRIC: 2,
  BACKUP_CODE: 2,
} as const;

// টাইপের সেটআপ প্রক্রিয়া
export const TWO_FA_TYPE_SETUP_PROCESS = {
  AUTHENTICATOR_APP: 'Scan QR code and enter OTP',
  SMS_OTP: 'Verify phone number and enter OTP',
  EMAIL_OTP: 'Verify email and enter OTP',
  HARDWARE_TOKEN: 'Plug in hardware token and press button',
  BIOMETRIC: 'Setup biometric authentication on device',
  BACKUP_CODE: 'Generate and save backup codes',
} as const;

// টাইপের রিকভারি পদ্ধতি
export const TWO_FA_TYPE_RECOVERY_METHOD = {
  AUTHENTICATOR_APP: 'Backup codes or email verification',
  SMS_OTP: 'Email verification or backup codes',
  EMAIL_OTP: 'SMS verification or backup codes',
  HARDWARE_TOKEN: 'Backup codes or admin intervention',
  BIOMETRIC: 'Password or backup codes',
  BACKUP_CODE: 'Admin intervention or new setup',
} as const;

// টাইপ গ্রুপ
export const TWO_FA_TYPE_GROUPS = {
  OTP_BASED: ['authenticator_app', 'sms_otp', 'email_otp'],
  PHYSICAL_BASED: ['hardware_token', 'biometric'],
  BACKUP_BASED: ['backup_code'],
} as const;

// টাইপের লেবেল (বাংলা)
export const TWO_FA_TYPE_LABELS_BN = {
  AUTHENTICATOR_APP: 'অথেন্টিকেটর অ্যাপ',
  SMS_OTP: 'এসএমএস ওটিপি',
  EMAIL_OTP: 'ইমেইল ওটিপি',
  HARDWARE_TOKEN: 'হার্ডওয়্যার টোকেন',
  BIOMETRIC: 'বায়োমেট্রিক',
  BACKUP_CODE: 'ব্যাকআপ কোড',
} as const;

// টাইপের লেবেল (ইংরেজি)
export const TWO_FA_TYPE_LABELS_EN = {
  AUTHENTICATOR_APP: 'Authenticator App',
  SMS_OTP: 'SMS OTP',
  EMAIL_OTP: 'Email OTP',
  HARDWARE_TOKEN: 'Hardware Token',
  BIOMETRIC: 'Biometric',
  BACKUP_CODE: 'Backup Code',
} as const;

// টাইপের CSS ক্লাস
export const TWO_FA_TYPE_CSS_CLASSES = {
  AUTHENTICATOR_APP: '2fa-authenticator',
  SMS_OTP: '2fa-sms',
  EMAIL_OTP: '2fa-email',
  HARDWARE_TOKEN: '2fa-hardware',
  BIOMETRIC: '2fa-biometric',
  BACKUP_CODE: '2fa-backup',
} as const;

// টাইপের জন্য ইমোজি
export const TWO_FA_TYPE_EMOJIS = {
  AUTHENTICATOR_APP: '🛡️',
  SMS_OTP: '💬',
  EMAIL_OTP: '✉️',
  HARDWARE_TOKEN: '🔒',
  BIOMETRIC: '👆',
  BACKUP_CODE: '🗝️',
} as const;

// টাইপের সেটআপ সময় (মিনিটে)
export const TWO_FA_TYPE_SETUP_TIME = {
  AUTHENTICATOR_APP: 5,
  SMS_OTP: 3,
  EMAIL_OTP: 3,
  HARDWARE_TOKEN: 2,
  BIOMETRIC: 10,
  BACKUP_CODE: 2,
} as const;

// টাইপের ব্যাকআপ প্রয়োজন কিনা
export const TWO_FA_TYPE_REQUIRES_BACKUP = {
  AUTHENTICATOR_APP: true,
  SMS_OTP: true,
  EMAIL_OTP: true,
  HARDWARE_TOKEN: false,
  BIOMETRIC: true,
  BACKUP_CODE: false,
} as const;
