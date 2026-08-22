/**
 * Authentication Biometric Constants
 * Biometric authentication configuration
 */

import { AUTH_BIOMETRIC_STATUS } from './auth-biometric-status.constants';

// Define TYPES first
export const AUTH_BIOMETRIC_TYPES = {
  FINGERPRINT: 'fingerprint',
  FACE_ID: 'face_id',
  IRIS_SCAN: 'iris_scan',
  VOICE_RECOGNITION: 'voice_recognition',
  PALM_SCAN: 'palm_scan',
  RETINA_SCAN: 'retina_scan',
  VEIN_RECOGNITION: 'vein_recognition',
  GAIT_RECOGNITION: 'gait_recognition',
  SIGNATURE: 'signature',
  KEYSTROKE_DYNAMICS: 'keystroke_dynamics',
} as const;

// Define CONFIG
export const AUTH_BIOMETRIC_CONFIG = {
  // General configuration
  GENERAL: {
    MAX_DEVICES_PER_USER: 5,
    MAX_ATTEMPTS: 3,
    LOCKOUT_DURATION: 3600,
    SESSION_TIMEOUT: 300,
    REAUTHENTICATION_INTERVAL: 3600,
    ALLOW_FALLBACK: true,
    REQUIRE_CONFIRMATION: true,
  },

  // Fingerprint configuration
  FINGERPRINT: {
    MIN_QUALITY: 60,
    MAX_RETRIES: 3,
    SENSOR_TYPE: 'capacitive',
    ALLOW_MULTIPLE_FINGERS: true,
    MAX_FINGERS: 10,
  },

  // Face ID configuration
  FACE_ID: {
    MIN_CONFIDENCE: 0.8,
    MAX_RETRIES: 3,
    ALLOW_GLASSES: true,
    ALLOW_MASK: false,
    ALLOW_HAT: false,
    LIVENESS_CHECK: true,
    DEPTH_CHECK: true,
  },

  // Iris scan configuration
  IRIS_SCAN: {
    MIN_QUALITY: 70,
    MAX_RETRIES: 3,
    ALLOW_GLASSES: false,
    ALLOW_CONTACT_LENSES: true,
    MIN_DISTANCE: 20,
    MAX_DISTANCE: 40,
  },

  // Voice recognition configuration
  VOICE_RECOGNITION: {
    MIN_CONFIDENCE: 0.75,
    MAX_RETRIES: 3,
    MIN_DURATION: 2,
    MAX_DURATION: 10,
    ALLOW_BACKGROUND_NOISE: false,
    REQUIRED_PHRASE: true,
    PHRASE_LENGTH: 6,
  },

  // Security configuration
  SECURITY: {
    ENCRYPTION_ALGORITHM: 'AES-256-GCM',
    KEY_DERIVATION: 'PBKDF2',
    HASH_ALGORITHM: 'SHA-256',
    STORE_LOCALLY: true,
    STORE_SECURELY: true,
    BIOMETRIC_TEMPLATE_PROTECTION: true,
    LIVENESS_DETECTION: true,
  },

  // Default values
  DEFAULTS: {
    STATUS: AUTH_BIOMETRIC_STATUS.PENDING,
    TYPE: AUTH_BIOMETRIC_TYPES.FINGERPRINT,
    ENABLED: false,
    VERIFIED: false,
    TRUSTED: false,
  },
} as const;

// Define EVENTS
export const AUTH_BIOMETRIC_EVENTS = {
  ENABLED: 'biometric:enabled',
  DISABLED: 'biometric:disabled',
  VERIFIED: 'biometric:verified',
  FAILED: 'biometric:failed',
  ATTEMPT: 'biometric:attempt',
  REGISTERED: 'biometric:registered',
  REMOVED: 'biometric:removed',
  LOCKED: 'biometric:locked',
  UNLOCKED: 'biometric:unlocked',
  TRUSTED: 'biometric:trusted',
  UNTRUSTED: 'biometric:untrusted',
  EXPIRED: 'biometric:expired',
  SUSPICIOUS: 'biometric:suspicious',
} as const;

// Main AUTH_BIOMETRIC object
export const AUTH_BIOMETRIC = {
  CONFIG: AUTH_BIOMETRIC_CONFIG,
  TYPES: AUTH_BIOMETRIC_TYPES,
  EVENTS: AUTH_BIOMETRIC_EVENTS,
  DEFAULTS: AUTH_BIOMETRIC_CONFIG.DEFAULTS,
} as const;

export type AuthBiometricConfig = typeof AUTH_BIOMETRIC_CONFIG;
export type AuthBiometricType = (typeof AUTH_BIOMETRIC_TYPES)[keyof typeof AUTH_BIOMETRIC_TYPES];
export type AuthBiometricEvent = (typeof AUTH_BIOMETRIC_EVENTS)[keyof typeof AUTH_BIOMETRIC_EVENTS];
export type AuthBiometricDefaults = typeof AUTH_BIOMETRIC_CONFIG.DEFAULTS;
export type AuthBiometricStatusType =
  (typeof AUTH_BIOMETRIC_STATUS)[keyof typeof AUTH_BIOMETRIC_STATUS];

export function getBiometricTypeLabel(type: AuthBiometricType): string {
  const labels: Record<AuthBiometricType, string> = {
    [AUTH_BIOMETRIC_TYPES.FINGERPRINT]: 'Fingerprint',
    [AUTH_BIOMETRIC_TYPES.FACE_ID]: 'Face ID',
    [AUTH_BIOMETRIC_TYPES.IRIS_SCAN]: 'Iris Scan',
    [AUTH_BIOMETRIC_TYPES.VOICE_RECOGNITION]: 'Voice Recognition',
    [AUTH_BIOMETRIC_TYPES.PALM_SCAN]: 'Palm Scan',
    [AUTH_BIOMETRIC_TYPES.RETINA_SCAN]: 'Retina Scan',
    [AUTH_BIOMETRIC_TYPES.VEIN_RECOGNITION]: 'Vein Recognition',
    [AUTH_BIOMETRIC_TYPES.GAIT_RECOGNITION]: 'Gait Recognition',
    [AUTH_BIOMETRIC_TYPES.SIGNATURE]: 'Signature',
    [AUTH_BIOMETRIC_TYPES.KEYSTROKE_DYNAMICS]: 'Keystroke Dynamics',
  };

  return labels[type] || 'Unknown Type';
}

export function getBiometricTypeIcon(type: AuthBiometricType): string {
  const icons: Record<AuthBiometricType, string> = {
    [AUTH_BIOMETRIC_TYPES.FINGERPRINT]: '👆',
    [AUTH_BIOMETRIC_TYPES.FACE_ID]: '😊',
    [AUTH_BIOMETRIC_TYPES.IRIS_SCAN]: '👁️',
    [AUTH_BIOMETRIC_TYPES.VOICE_RECOGNITION]: '🎤',
    [AUTH_BIOMETRIC_TYPES.PALM_SCAN]: '🖐️',
    [AUTH_BIOMETRIC_TYPES.RETINA_SCAN]: '👁️',
    [AUTH_BIOMETRIC_TYPES.VEIN_RECOGNITION]: '🩸',
    [AUTH_BIOMETRIC_TYPES.GAIT_RECOGNITION]: '🚶',
    [AUTH_BIOMETRIC_TYPES.SIGNATURE]: '✍️',
    [AUTH_BIOMETRIC_TYPES.KEYSTROKE_DYNAMICS]: '⌨️',
  };

  return icons[type] || '🔒';
}

export function getBiometricTypeSecurityLevel(
  type: AuthBiometricType
): 'low' | 'medium' | 'high' | 'very_high' {
  const levels: Record<AuthBiometricType, 'low' | 'medium' | 'high' | 'very_high'> = {
    [AUTH_BIOMETRIC_TYPES.FINGERPRINT]: 'high',
    [AUTH_BIOMETRIC_TYPES.FACE_ID]: 'high',
    [AUTH_BIOMETRIC_TYPES.IRIS_SCAN]: 'very_high',
    [AUTH_BIOMETRIC_TYPES.VOICE_RECOGNITION]: 'medium',
    [AUTH_BIOMETRIC_TYPES.PALM_SCAN]: 'high',
    [AUTH_BIOMETRIC_TYPES.RETINA_SCAN]: 'very_high',
    [AUTH_BIOMETRIC_TYPES.VEIN_RECOGNITION]: 'very_high',
    [AUTH_BIOMETRIC_TYPES.GAIT_RECOGNITION]: 'medium',
    [AUTH_BIOMETRIC_TYPES.SIGNATURE]: 'medium',
    [AUTH_BIOMETRIC_TYPES.KEYSTROKE_DYNAMICS]: 'low',
  };

  return levels[type] || 'medium';
}

export function getBiometricTypeAccuracy(type: AuthBiometricType): number {
  const accuracy: Record<AuthBiometricType, number> = {
    [AUTH_BIOMETRIC_TYPES.FINGERPRINT]: 98,
    [AUTH_BIOMETRIC_TYPES.FACE_ID]: 97,
    [AUTH_BIOMETRIC_TYPES.IRIS_SCAN]: 99.5,
    [AUTH_BIOMETRIC_TYPES.VOICE_RECOGNITION]: 95,
    [AUTH_BIOMETRIC_TYPES.PALM_SCAN]: 97,
    [AUTH_BIOMETRIC_TYPES.RETINA_SCAN]: 99,
    [AUTH_BIOMETRIC_TYPES.VEIN_RECOGNITION]: 99,
    [AUTH_BIOMETRIC_TYPES.GAIT_RECOGNITION]: 90,
    [AUTH_BIOMETRIC_TYPES.SIGNATURE]: 85,
    [AUTH_BIOMETRIC_TYPES.KEYSTROKE_DYNAMICS]: 80,
  };

  return accuracy[type] || 90;
}

export function getBiometricMaxDevices(): number {
  return AUTH_BIOMETRIC_CONFIG.GENERAL.MAX_DEVICES_PER_USER;
}

export function getBiometricMaxAttempts(): number {
  return AUTH_BIOMETRIC_CONFIG.GENERAL.MAX_ATTEMPTS;
}

export function getBiometricLockoutDuration(): number {
  return AUTH_BIOMETRIC_CONFIG.GENERAL.LOCKOUT_DURATION;
}

export function getBiometricSessionTimeout(): number {
  return AUTH_BIOMETRIC_CONFIG.GENERAL.SESSION_TIMEOUT;
}

export function getBiometricReauthInterval(): number {
  return AUTH_BIOMETRIC_CONFIG.GENERAL.REAUTHENTICATION_INTERVAL;
}

export function getBiometricMinConfidence(type: AuthBiometricType): number {
  const confidence: Record<AuthBiometricType, number> = {
    [AUTH_BIOMETRIC_TYPES.FINGERPRINT]: 60,
    [AUTH_BIOMETRIC_TYPES.FACE_ID]: 80,
    [AUTH_BIOMETRIC_TYPES.IRIS_SCAN]: 70,
    [AUTH_BIOMETRIC_TYPES.VOICE_RECOGNITION]: 75,
    [AUTH_BIOMETRIC_TYPES.PALM_SCAN]: 70,
    [AUTH_BIOMETRIC_TYPES.RETINA_SCAN]: 75,
    [AUTH_BIOMETRIC_TYPES.VEIN_RECOGNITION]: 75,
    [AUTH_BIOMETRIC_TYPES.GAIT_RECOGNITION]: 60,
    [AUTH_BIOMETRIC_TYPES.SIGNATURE]: 50,
    [AUTH_BIOMETRIC_TYPES.KEYSTROKE_DYNAMICS]: 40,
  };

  return confidence[type] || 60;
}

export function getBiometricMaxRetries(type: AuthBiometricType): number {
  const retries: Record<AuthBiometricType, number> = {
    [AUTH_BIOMETRIC_TYPES.FINGERPRINT]: AUTH_BIOMETRIC_CONFIG.FINGERPRINT.MAX_RETRIES,
    [AUTH_BIOMETRIC_TYPES.FACE_ID]: AUTH_BIOMETRIC_CONFIG.FACE_ID.MAX_RETRIES,
    [AUTH_BIOMETRIC_TYPES.IRIS_SCAN]: AUTH_BIOMETRIC_CONFIG.IRIS_SCAN.MAX_RETRIES,
    [AUTH_BIOMETRIC_TYPES.VOICE_RECOGNITION]: AUTH_BIOMETRIC_CONFIG.VOICE_RECOGNITION.MAX_RETRIES,
    [AUTH_BIOMETRIC_TYPES.PALM_SCAN]: 3,
    [AUTH_BIOMETRIC_TYPES.RETINA_SCAN]: 3,
    [AUTH_BIOMETRIC_TYPES.VEIN_RECOGNITION]: 3,
    [AUTH_BIOMETRIC_TYPES.GAIT_RECOGNITION]: 3,
    [AUTH_BIOMETRIC_TYPES.SIGNATURE]: 3,
    [AUTH_BIOMETRIC_TYPES.KEYSTROKE_DYNAMICS]: 3,
  };

  return retries[type] || 3;
}

export function isBiometricTypeSupported(type: AuthBiometricType): boolean {
  const supportedTypes = Object.values(AUTH_BIOMETRIC_TYPES);
  return supportedTypes.includes(type);
}

export function getSupportedBiometricTypes(): AuthBiometricType[] {
  return Object.values(AUTH_BIOMETRIC_TYPES);
}

export function isBiometricEnabled(status: AuthBiometricStatusType): boolean {
  return (
    status === AUTH_BIOMETRIC_STATUS.ENABLED ||
    status === AUTH_BIOMETRIC_STATUS.VERIFIED ||
    status === AUTH_BIOMETRIC_STATUS.TRUSTED
  );
}

export function isBiometricLocked(status: AuthBiometricStatusType): boolean {
  return status === AUTH_BIOMETRIC_STATUS.LOCKED || status === AUTH_BIOMETRIC_STATUS.BLOCKED;
}

export function getBiometricTypeCategory(
  type: AuthBiometricType
): 'physical' | 'behavioral' | 'physiological' {
  const physical: AuthBiometricType[] = [
    AUTH_BIOMETRIC_TYPES.FINGERPRINT,
    AUTH_BIOMETRIC_TYPES.FACE_ID,
    AUTH_BIOMETRIC_TYPES.IRIS_SCAN,
    AUTH_BIOMETRIC_TYPES.PALM_SCAN,
    AUTH_BIOMETRIC_TYPES.RETINA_SCAN,
    AUTH_BIOMETRIC_TYPES.VEIN_RECOGNITION,
  ];

  const behavioral: AuthBiometricType[] = [
    AUTH_BIOMETRIC_TYPES.VOICE_RECOGNITION,
    AUTH_BIOMETRIC_TYPES.GAIT_RECOGNITION,
    AUTH_BIOMETRIC_TYPES.SIGNATURE,
    AUTH_BIOMETRIC_TYPES.KEYSTROKE_DYNAMICS,
  ];

  if (physical.includes(type)) return 'physical';
  if (behavioral.includes(type)) return 'behavioral';
  return 'physiological';
}
