/**
 * Multi-Factor Authentication Type Constants
 * Types of MFA methods available
 */

export const AUTH_MFA_TYPE = {
  // Primary MFA types
  TOTP: 'totp',
  SMS: 'sms',
  EMAIL: 'email',
  BACKUP_CODE: 'backup_code',
  BIOMETRIC: 'biometric',
  PUSH_NOTIFICATION: 'push_notification',
  HARDWARE_TOKEN: 'hardware_token',
  RECOVERY_CODE: 'recovery_code',

  // Biometric subtypes
  FINGERPRINT: 'fingerprint',
  FACE_ID: 'face_id',
  IRIS_SCAN: 'iris_scan',
  VOICE_RECOGNITION: 'voice_recognition',

  // Hardware token subtypes
  YUBIKEY: 'yubikey',
  SMART_CARD: 'smart_card',
  USB_TOKEN: 'usb_token',
  NFC_TOKEN: 'nfc_token',

  // Push notification subtypes
  MOBILE_PUSH: 'mobile_push',
  WEB_PUSH: 'web_push',
  DESKTOP_PUSH: 'desktop_push',
} as const;

export type AuthMFAType = (typeof AUTH_MFA_TYPE)[keyof typeof AUTH_MFA_TYPE];

export const PRIMARY_MFA_TYPES: AuthMFAType[] = [
  AUTH_MFA_TYPE.TOTP,
  AUTH_MFA_TYPE.SMS,
  AUTH_MFA_TYPE.EMAIL,
  AUTH_MFA_TYPE.BACKUP_CODE,
  AUTH_MFA_TYPE.BIOMETRIC,
  AUTH_MFA_TYPE.PUSH_NOTIFICATION,
  AUTH_MFA_TYPE.HARDWARE_TOKEN,
  AUTH_MFA_TYPE.RECOVERY_CODE,
];

export const BIOMETRIC_MFA_TYPES: AuthMFAType[] = [
  AUTH_MFA_TYPE.FINGERPRINT,
  AUTH_MFA_TYPE.FACE_ID,
  AUTH_MFA_TYPE.IRIS_SCAN,
  AUTH_MFA_TYPE.VOICE_RECOGNITION,
];

export const HARDWARE_MFA_TYPES: AuthMFAType[] = [
  AUTH_MFA_TYPE.YUBIKEY,
  AUTH_MFA_TYPE.SMART_CARD,
  AUTH_MFA_TYPE.USB_TOKEN,
  AUTH_MFA_TYPE.NFC_TOKEN,
];

export const PUSH_MFA_TYPES: AuthMFAType[] = [
  AUTH_MFA_TYPE.MOBILE_PUSH,
  AUTH_MFA_TYPE.WEB_PUSH,
  AUTH_MFA_TYPE.DESKTOP_PUSH,
];

export const CODE_BASED_MFA_TYPES: AuthMFAType[] = [
  AUTH_MFA_TYPE.TOTP,
  AUTH_MFA_TYPE.SMS,
  AUTH_MFA_TYPE.EMAIL,
  AUTH_MFA_TYPE.BACKUP_CODE,
  AUTH_MFA_TYPE.RECOVERY_CODE,
];

export const DEVICE_BASED_MFA_TYPES: AuthMFAType[] = [
  AUTH_MFA_TYPE.BIOMETRIC,
  AUTH_MFA_TYPE.PUSH_NOTIFICATION,
  AUTH_MFA_TYPE.HARDWARE_TOKEN,
  ...BIOMETRIC_MFA_TYPES,
  ...HARDWARE_MFA_TYPES,
  ...PUSH_MFA_TYPES,
];

export function isPrimaryMFAType(type: AuthMFAType): boolean {
  return PRIMARY_MFA_TYPES.includes(type);
}

export function isBiometricMFAType(type: AuthMFAType): boolean {
  return BIOMETRIC_MFA_TYPES.includes(type);
}

export function isHardwareMFAType(type: AuthMFAType): boolean {
  return HARDWARE_MFA_TYPES.includes(type);
}

export function isPushMFAType(type: AuthMFAType): boolean {
  return PUSH_MFA_TYPES.includes(type);
}

export function isCodeBasedMFAType(type: AuthMFAType): boolean {
  return CODE_BASED_MFA_TYPES.includes(type);
}

export function isDeviceBasedMFAType(type: AuthMFAType): boolean {
  return DEVICE_BASED_MFA_TYPES.includes(type);
}

export function getMFATypeLabel(type: AuthMFAType): string {
  const labels: Record<AuthMFAType, string> = {
    [AUTH_MFA_TYPE.TOTP]: 'Authenticator App (TOTP)',
    [AUTH_MFA_TYPE.SMS]: 'SMS Verification',
    [AUTH_MFA_TYPE.EMAIL]: 'Email Verification',
    [AUTH_MFA_TYPE.BACKUP_CODE]: 'Backup Codes',
    [AUTH_MFA_TYPE.BIOMETRIC]: 'Biometric Authentication',
    [AUTH_MFA_TYPE.PUSH_NOTIFICATION]: 'Push Notification',
    [AUTH_MFA_TYPE.HARDWARE_TOKEN]: 'Hardware Token',
    [AUTH_MFA_TYPE.RECOVERY_CODE]: 'Recovery Code',
    [AUTH_MFA_TYPE.FINGERPRINT]: 'Fingerprint',
    [AUTH_MFA_TYPE.FACE_ID]: 'Face ID',
    [AUTH_MFA_TYPE.IRIS_SCAN]: 'Iris Scan',
    [AUTH_MFA_TYPE.VOICE_RECOGNITION]: 'Voice Recognition',
    [AUTH_MFA_TYPE.YUBIKEY]: 'YubiKey',
    [AUTH_MFA_TYPE.SMART_CARD]: 'Smart Card',
    [AUTH_MFA_TYPE.USB_TOKEN]: 'USB Token',
    [AUTH_MFA_TYPE.NFC_TOKEN]: 'NFC Token',
    [AUTH_MFA_TYPE.MOBILE_PUSH]: 'Mobile Push',
    [AUTH_MFA_TYPE.WEB_PUSH]: 'Web Push',
    [AUTH_MFA_TYPE.DESKTOP_PUSH]: 'Desktop Push',
  };

  return labels[type] || 'Unknown MFA Type';
}

export function getMFATypeCategory(
  type: AuthMFAType
): 'code' | 'biometric' | 'hardware' | 'push' | 'other' {
  if (isCodeBasedMFAType(type)) return 'code';
  if (isBiometricMFAType(type)) return 'biometric';
  if (isHardwareMFAType(type)) return 'hardware';
  if (isPushMFAType(type)) return 'push';
  return 'other';
}

export function getMFATypeIcon(type: AuthMFAType): string {
  const icons: Record<AuthMFAType, string> = {
    [AUTH_MFA_TYPE.TOTP]: '📱',
    [AUTH_MFA_TYPE.SMS]: '📲',
    [AUTH_MFA_TYPE.EMAIL]: '✉️',
    [AUTH_MFA_TYPE.BACKUP_CODE]: '🔑',
    [AUTH_MFA_TYPE.BIOMETRIC]: '👆',
    [AUTH_MFA_TYPE.PUSH_NOTIFICATION]: '🔔',
    [AUTH_MFA_TYPE.HARDWARE_TOKEN]: '🛡️',
    [AUTH_MFA_TYPE.RECOVERY_CODE]: '🔐',
    [AUTH_MFA_TYPE.FINGERPRINT]: '👆',
    [AUTH_MFA_TYPE.FACE_ID]: '😊',
    [AUTH_MFA_TYPE.IRIS_SCAN]: '👁️',
    [AUTH_MFA_TYPE.VOICE_RECOGNITION]: '🎤',
    [AUTH_MFA_TYPE.YUBIKEY]: '🔑',
    [AUTH_MFA_TYPE.SMART_CARD]: '💳',
    [AUTH_MFA_TYPE.USB_TOKEN]: '🔌',
    [AUTH_MFA_TYPE.NFC_TOKEN]: '📡',
    [AUTH_MFA_TYPE.MOBILE_PUSH]: '📱',
    [AUTH_MFA_TYPE.WEB_PUSH]: '🌐',
    [AUTH_MFA_TYPE.DESKTOP_PUSH]: '💻',
  };

  return icons[type] || '🔒';
}
