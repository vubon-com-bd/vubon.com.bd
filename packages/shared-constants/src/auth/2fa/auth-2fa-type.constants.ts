/**
 * Authentication 2FA Type Constants
 * Types of Two-Factor Authentication methods
 */

export const AUTH_2FA_TYPE = {
  // Primary 2FA types
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

export type Auth2FAType = (typeof AUTH_2FA_TYPE)[keyof typeof AUTH_2FA_TYPE];

export const PRIMARY_2FA_TYPES: Auth2FAType[] = [
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

export const CODE_BASED_2FA_TYPES: Auth2FAType[] = [
  AUTH_2FA_TYPE.TOTP,
  AUTH_2FA_TYPE.SMS,
  AUTH_2FA_TYPE.EMAIL,
  AUTH_2FA_TYPE.AUTHENTICATOR,
  AUTH_2FA_TYPE.BACKUP_CODE,
  AUTH_2FA_TYPE.RECOVERY_CODE,
];

export const DEVICE_BASED_2FA_TYPES: Auth2FAType[] = [
  AUTH_2FA_TYPE.BIOMETRIC,
  AUTH_2FA_TYPE.PUSH_NOTIFICATION,
  AUTH_2FA_TYPE.HARDWARE_TOKEN,
];

export const BIOMETRIC_2FA_TYPES: Auth2FAType[] = [
  AUTH_2FA_TYPE.FINGERPRINT,
  AUTH_2FA_TYPE.FACE_ID,
  AUTH_2FA_TYPE.IRIS_SCAN,
  AUTH_2FA_TYPE.VOICE_RECOGNITION,
];

export const HARDWARE_2FA_TYPES: Auth2FAType[] = [
  AUTH_2FA_TYPE.YUBIKEY,
  AUTH_2FA_TYPE.SMART_CARD,
  AUTH_2FA_TYPE.USB_TOKEN,
  AUTH_2FA_TYPE.NFC_TOKEN,
];

export const PUSH_2FA_TYPES: Auth2FAType[] = [
  AUTH_2FA_TYPE.MOBILE_PUSH,
  AUTH_2FA_TYPE.WEB_PUSH,
  AUTH_2FA_TYPE.DESKTOP_PUSH,
];

export function isPrimary2FAType(type: Auth2FAType): boolean {
  return PRIMARY_2FA_TYPES.includes(type);
}

export function isCodeBased2FAType(type: Auth2FAType): boolean {
  return CODE_BASED_2FA_TYPES.includes(type);
}

export function isDeviceBased2FAType(type: Auth2FAType): boolean {
  return DEVICE_BASED_2FA_TYPES.includes(type);
}

export function isBiometric2FAType(type: Auth2FAType): boolean {
  return BIOMETRIC_2FA_TYPES.includes(type);
}

export function isHardware2FAType(type: Auth2FAType): boolean {
  return HARDWARE_2FA_TYPES.includes(type);
}

export function isPush2FAType(type: Auth2FAType): boolean {
  return PUSH_2FA_TYPES.includes(type);
}

export function get2FATypeLabel(type: Auth2FAType): string {
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

export function get2FATypeIcon(type: Auth2FAType): string {
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

export function get2FATypeCategory(
  type: Auth2FAType
): 'code' | 'biometric' | 'hardware' | 'push' | 'other' {
  if (isCodeBased2FAType(type)) return 'code';
  if (isBiometric2FAType(type)) return 'biometric';
  if (isHardware2FAType(type)) return 'hardware';
  if (isPush2FAType(type)) return 'push';
  return 'other';
}

export function get2FATypeSecurityLevel(
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
