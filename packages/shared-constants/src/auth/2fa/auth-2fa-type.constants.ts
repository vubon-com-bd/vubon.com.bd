/**
 * Authentication 2FA Type Constants
 * Types of Two-Factor Authentication methods
 */

export const AUTH_2FA_TYPE = {
  TOTP: 'totp',
  SMS: 'sms',
  EMAIL: 'email',
  AUTHENTICATOR: 'authenticator',
  BACKUP_CODE: 'backup_code',
  RECOVERY_CODE: 'recovery_code',
  BIOMETRIC: 'biometric',
  PUSH_NOTIFICATION: 'push_notification',
  HARDWARE_TOKEN: 'hardware_token',
  VOICE: 'voice',
  WHATSAPP: 'whatsapp',

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

export type Auth2FAType = (typeof AUTH_2FA_TYPE)[keyof typeof AUTH_2FA_TYPE];

export const AUTH2FA_PRIMARY_TYPES: Auth2FAType[] = [
  AUTH_2FA_TYPE.TOTP,
  AUTH_2FA_TYPE.SMS,
  AUTH_2FA_TYPE.EMAIL,
  AUTH_2FA_TYPE.AUTHENTICATOR,
  AUTH_2FA_TYPE.BACKUP_CODE,
  AUTH_2FA_TYPE.RECOVERY_CODE,
  AUTH_2FA_TYPE.BIOMETRIC,
  AUTH_2FA_TYPE.PUSH_NOTIFICATION,
  AUTH_2FA_TYPE.HARDWARE_TOKEN,
  AUTH_2FA_TYPE.VOICE,
  AUTH_2FA_TYPE.WHATSAPP,
];

export const AUTH2FA_CODE_BASED_TYPES: Auth2FAType[] = [
  AUTH_2FA_TYPE.TOTP,
  AUTH_2FA_TYPE.SMS,
  AUTH_2FA_TYPE.EMAIL,
  AUTH_2FA_TYPE.AUTHENTICATOR,
  AUTH_2FA_TYPE.BACKUP_CODE,
  AUTH_2FA_TYPE.RECOVERY_CODE,
];

export const AUTH2FA_DEVICE_BASED_TYPES: Auth2FAType[] = [
  AUTH_2FA_TYPE.BIOMETRIC,
  AUTH_2FA_TYPE.PUSH_NOTIFICATION,
  AUTH_2FA_TYPE.HARDWARE_TOKEN,
];

export const AUTH2FA_BIOMETRIC_TYPES: Auth2FAType[] = [
  AUTH_2FA_TYPE.FINGERPRINT,
  AUTH_2FA_TYPE.FACE_ID,
  AUTH_2FA_TYPE.IRIS_SCAN,
  AUTH_2FA_TYPE.VOICE_RECOGNITION,
];

export const AUTH2FA_HARDWARE_TYPES: Auth2FAType[] = [
  AUTH_2FA_TYPE.YUBIKEY,
  AUTH_2FA_TYPE.SMART_CARD,
  AUTH_2FA_TYPE.USB_TOKEN,
  AUTH_2FA_TYPE.NFC_TOKEN,
];

export const AUTH2FA_PUSH_TYPES: Auth2FAType[] = [
  AUTH_2FA_TYPE.MOBILE_PUSH,
  AUTH_2FA_TYPE.WEB_PUSH,
  AUTH_2FA_TYPE.DESKTOP_PUSH,
];

export function isAuth2faPrimaryType(type: Auth2FAType): boolean {
  return AUTH2FA_PRIMARY_TYPES.includes(type);
}

export function isAuth2faCodeBasedType(type: Auth2FAType): boolean {
  return AUTH2FA_CODE_BASED_TYPES.includes(type);
}

export function isAuth2faDeviceBasedType(type: Auth2FAType): boolean {
  return AUTH2FA_DEVICE_BASED_TYPES.includes(type);
}

export function isAuth2faBiometricType(type: Auth2FAType): boolean {
  return AUTH2FA_BIOMETRIC_TYPES.includes(type);
}

export function isAuth2faHardwareType(type: Auth2FAType): boolean {
  return AUTH2FA_HARDWARE_TYPES.includes(type);
}

export function isAuth2faPushType(type: Auth2FAType): boolean {
  return AUTH2FA_PUSH_TYPES.includes(type);
}

export function getAuth2faTypeLabel(type: Auth2FAType): string {
  const labels: Record<Auth2FAType, string> = {
    [AUTH_2FA_TYPE.TOTP]: 'Authenticator App (TOTP)',
    [AUTH_2FA_TYPE.SMS]: 'SMS Verification',
    [AUTH_2FA_TYPE.EMAIL]: 'Email Verification',
    [AUTH_2FA_TYPE.AUTHENTICATOR]: 'Authenticator App',
    [AUTH_2FA_TYPE.BACKUP_CODE]: 'Backup Codes',
    [AUTH_2FA_TYPE.RECOVERY_CODE]: 'Recovery Codes',
    [AUTH_2FA_TYPE.BIOMETRIC]: 'Biometric Authentication',
    [AUTH_2FA_TYPE.PUSH_NOTIFICATION]: 'Push Notification',
    [AUTH_2FA_TYPE.HARDWARE_TOKEN]: 'Hardware Token',
    [AUTH_2FA_TYPE.VOICE]: 'Voice Call',
    [AUTH_2FA_TYPE.WHATSAPP]: 'WhatsApp',
    [AUTH_2FA_TYPE.FINGERPRINT]: 'Fingerprint',
    [AUTH_2FA_TYPE.FACE_ID]: 'Face ID',
    [AUTH_2FA_TYPE.IRIS_SCAN]: 'Iris Scan',
    [AUTH_2FA_TYPE.VOICE_RECOGNITION]: 'Voice Recognition',
    [AUTH_2FA_TYPE.YUBIKEY]: 'YubiKey',
    [AUTH_2FA_TYPE.SMART_CARD]: 'Smart Card',
    [AUTH_2FA_TYPE.USB_TOKEN]: 'USB Token',
    [AUTH_2FA_TYPE.NFC_TOKEN]: 'NFC Token',
    [AUTH_2FA_TYPE.MOBILE_PUSH]: 'Mobile Push',
    [AUTH_2FA_TYPE.WEB_PUSH]: 'Web Push',
    [AUTH_2FA_TYPE.DESKTOP_PUSH]: 'Desktop Push',
  };

  return labels[type] || 'Unknown 2FA Type';
}

export function getAuth2faTypeIcon(type: Auth2FAType): string {
  const icons: Record<Auth2FAType, string> = {
    [AUTH_2FA_TYPE.TOTP]: '📱',
    [AUTH_2FA_TYPE.SMS]: '📲',
    [AUTH_2FA_TYPE.EMAIL]: '✉️',
    [AUTH_2FA_TYPE.AUTHENTICATOR]: '🔐',
    [AUTH_2FA_TYPE.BACKUP_CODE]: '🔑',
    [AUTH_2FA_TYPE.RECOVERY_CODE]: '🔄',
    [AUTH_2FA_TYPE.BIOMETRIC]: '👆',
    [AUTH_2FA_TYPE.PUSH_NOTIFICATION]: '🔔',
    [AUTH_2FA_TYPE.HARDWARE_TOKEN]: '🛡️',
    [AUTH_2FA_TYPE.VOICE]: '📞',
    [AUTH_2FA_TYPE.WHATSAPP]: '💬',
    [AUTH_2FA_TYPE.FINGERPRINT]: '👆',
    [AUTH_2FA_TYPE.FACE_ID]: '😊',
    [AUTH_2FA_TYPE.IRIS_SCAN]: '👁️',
    [AUTH_2FA_TYPE.VOICE_RECOGNITION]: '🎤',
    [AUTH_2FA_TYPE.YUBIKEY]: '🔑',
    [AUTH_2FA_TYPE.SMART_CARD]: '💳',
    [AUTH_2FA_TYPE.USB_TOKEN]: '🔌',
    [AUTH_2FA_TYPE.NFC_TOKEN]: '📡',
    [AUTH_2FA_TYPE.MOBILE_PUSH]: '📱',
    [AUTH_2FA_TYPE.WEB_PUSH]: '🌐',
    [AUTH_2FA_TYPE.DESKTOP_PUSH]: '💻',
  };

  return icons[type] || '🔒';
}

export function getAuth2faTypeCategory(
  type: Auth2FAType
): 'code' | 'biometric' | 'hardware' | 'push' | 'other' {
  if (isAuth2faCodeBasedType(type)) return 'code';
  if (isAuth2faBiometricType(type)) return 'biometric';
  if (isAuth2faHardwareType(type)) return 'hardware';
  if (isAuth2faPushType(type)) return 'push';
  return 'other';
}

export function getAuth2faTypeSecurityLevel(
  type: Auth2FAType
): 'low' | 'medium' | 'high' | 'very_high' {
  const levels: Record<Auth2FAType, 'low' | 'medium' | 'high' | 'very_high'> = {
    [AUTH_2FA_TYPE.TOTP]: 'high',
    [AUTH_2FA_TYPE.SMS]: 'medium',
    [AUTH_2FA_TYPE.EMAIL]: 'medium',
    [AUTH_2FA_TYPE.AUTHENTICATOR]: 'high',
    [AUTH_2FA_TYPE.BACKUP_CODE]: 'high',
    [AUTH_2FA_TYPE.RECOVERY_CODE]: 'high',
    [AUTH_2FA_TYPE.BIOMETRIC]: 'very_high',
    [AUTH_2FA_TYPE.PUSH_NOTIFICATION]: 'high',
    [AUTH_2FA_TYPE.HARDWARE_TOKEN]: 'very_high',
    [AUTH_2FA_TYPE.VOICE]: 'medium',
    [AUTH_2FA_TYPE.WHATSAPP]: 'medium',
    [AUTH_2FA_TYPE.FINGERPRINT]: 'very_high',
    [AUTH_2FA_TYPE.FACE_ID]: 'very_high',
    [AUTH_2FA_TYPE.IRIS_SCAN]: 'very_high',
    [AUTH_2FA_TYPE.VOICE_RECOGNITION]: 'high',
    [AUTH_2FA_TYPE.YUBIKEY]: 'very_high',
    [AUTH_2FA_TYPE.SMART_CARD]: 'very_high',
    [AUTH_2FA_TYPE.USB_TOKEN]: 'high',
    [AUTH_2FA_TYPE.NFC_TOKEN]: 'high',
    [AUTH_2FA_TYPE.MOBILE_PUSH]: 'high',
    [AUTH_2FA_TYPE.WEB_PUSH]: 'medium',
    [AUTH_2FA_TYPE.DESKTOP_PUSH]: 'high',
  };

  return levels[type] || 'medium';
}
