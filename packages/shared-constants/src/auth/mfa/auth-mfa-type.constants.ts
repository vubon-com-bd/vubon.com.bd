/**
 * Multi-Factor Authentication Type Constants
 * Types of MFA methods available
 */

export const AUTH_MFA_TYPE = {
  TOTP: 'totp',
  SMS: 'sms',
  EMAIL: 'email',
  BACKUP_CODE: 'backup_code',
  BIOMETRIC: 'biometric',
  PUSH_NOTIFICATION: 'push_notification',
  HARDWARE_TOKEN: 'hardware_token',
  RECOVERY_CODE: 'recovery_code',

  FINGERPRINT: 'fingerprint',
  FACE_ID: 'face_id',
  IRIS_SCAN: 'iris_scan',
  VOICE_RECOGNITION: 'voice_recognition',

  YUBIKEY: 'yubikey',
  SMART_CARD: 'smart_card',
  USB_TOKEN: 'usb_token',
  NFC_TOKEN: 'nfc_token',

  MOBILE_PUSH: 'mobile_push',
  WEB_PUSH: 'web_push',
  DESKTOP_PUSH: 'desktop_push',
} as const;

export type AuthMFAType = (typeof AUTH_MFA_TYPE)[keyof typeof AUTH_MFA_TYPE];

export const AUTHMFA_PRIMARY_TYPES: AuthMFAType[] = [
  AUTH_MFA_TYPE.TOTP,
  AUTH_MFA_TYPE.SMS,
  AUTH_MFA_TYPE.EMAIL,
  AUTH_MFA_TYPE.BACKUP_CODE,
  AUTH_MFA_TYPE.BIOMETRIC,
  AUTH_MFA_TYPE.PUSH_NOTIFICATION,
  AUTH_MFA_TYPE.HARDWARE_TOKEN,
  AUTH_MFA_TYPE.RECOVERY_CODE,
];

export const AUTHMFA_BIOMETRIC_TYPES: AuthMFAType[] = [
  AUTH_MFA_TYPE.FINGERPRINT,
  AUTH_MFA_TYPE.FACE_ID,
  AUTH_MFA_TYPE.IRIS_SCAN,
  AUTH_MFA_TYPE.VOICE_RECOGNITION,
];

export const AUTHMFA_HARDWARE_TYPES: AuthMFAType[] = [
  AUTH_MFA_TYPE.YUBIKEY,
  AUTH_MFA_TYPE.SMART_CARD,
  AUTH_MFA_TYPE.USB_TOKEN,
  AUTH_MFA_TYPE.NFC_TOKEN,
];

export const AUTHMFA_PUSH_TYPES: AuthMFAType[] = [
  AUTH_MFA_TYPE.MOBILE_PUSH,
  AUTH_MFA_TYPE.WEB_PUSH,
  AUTH_MFA_TYPE.DESKTOP_PUSH,
];

export const AUTHMFA_CODE_BASED_TYPES: AuthMFAType[] = [
  AUTH_MFA_TYPE.TOTP,
  AUTH_MFA_TYPE.SMS,
  AUTH_MFA_TYPE.EMAIL,
  AUTH_MFA_TYPE.BACKUP_CODE,
  AUTH_MFA_TYPE.RECOVERY_CODE,
];

export const AUTHMFA_DEVICE_BASED_TYPES: AuthMFAType[] = [
  AUTH_MFA_TYPE.BIOMETRIC,
  AUTH_MFA_TYPE.PUSH_NOTIFICATION,
  AUTH_MFA_TYPE.HARDWARE_TOKEN,
  ...AUTHMFA_BIOMETRIC_TYPES,
  ...AUTHMFA_HARDWARE_TYPES,
  ...AUTHMFA_PUSH_TYPES,
];

export function isAuthmfaPrimaryType(type: AuthMFAType): boolean {
  return AUTHMFA_PRIMARY_TYPES.includes(type);
}

export function isAuthmfaBiometricType(type: AuthMFAType): boolean {
  return AUTHMFA_BIOMETRIC_TYPES.includes(type);
}

export function isAuthmfaHardwareType(type: AuthMFAType): boolean {
  return AUTHMFA_HARDWARE_TYPES.includes(type);
}

export function isAuthmfaPushType(type: AuthMFAType): boolean {
  return AUTHMFA_PUSH_TYPES.includes(type);
}

export function isAuthmfaCodeBasedType(type: AuthMFAType): boolean {
  return AUTHMFA_CODE_BASED_TYPES.includes(type);
}

export function isAuthmfaDeviceBasedType(type: AuthMFAType): boolean {
  return AUTHMFA_DEVICE_BASED_TYPES.includes(type);
}

export function getAuthmfaTypeLabel(type: AuthMFAType): string {
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

export function getAuthmfaTypeCategory(
  type: AuthMFAType
): 'code' | 'biometric' | 'hardware' | 'push' | 'other' {
  if (isAuthmfaCodeBasedType(type)) return 'code';
  if (isAuthmfaBiometricType(type)) return 'biometric';
  if (isAuthmfaHardwareType(type)) return 'hardware';
  if (isAuthmfaPushType(type)) return 'push';
  return 'other';
}

export function getAuthmfaTypeIcon(type: AuthMFAType): string {
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
