/**
 * Authentication Biometric Type Constants
 * Types of biometric authentication methods
 */

export const AUTH_BIOMETRIC_TYPE = {
  FINGERPRINT: 'fingerprint',
  FACE_ID: 'face_id',
  IRIS_SCAN: 'iris_scan',
  PALM_SCAN: 'palm_scan',
  RETINA_SCAN: 'retina_scan',
  VEIN_RECOGNITION: 'vein_recognition',

  VOICE_RECOGNITION: 'voice_recognition',
  GAIT_RECOGNITION: 'gait_recognition',
  SIGNATURE: 'signature',
  KEYSTROKE_DYNAMICS: 'keystroke_dynamics',

  DNA: 'dna',
  EAR_SHAPE: 'ear_shape',
  LIP_MOVEMENT: 'lip_movement',
  HEART_RATE: 'heart_rate',
  BRAIN_WAVES: 'brain_waves',

  ANDROID_FINGERPRINT: 'android_fingerprint',
  ANDROID_FACE: 'android_face',
  IOS_FINGERPRINT: 'ios_fingerprint',
  IOS_FACE: 'ios_face',
  IOS_IRIS: 'ios_iris',

  WINDOWS_HELLO: 'windows_hello',
  MACOS_TOUCH_ID: 'macos_touch_id',
  MACOS_FACE_ID: 'macos_face_id',
  LINUX_FINGERPRINT: 'linux_fingerprint',
} as const;

export type AuthBiometricType = (typeof AUTH_BIOMETRIC_TYPE)[keyof typeof AUTH_BIOMETRIC_TYPE];

export const AUTHBIOMETRIC_PHYSICAL_TYPES: AuthBiometricType[] = [
  AUTH_BIOMETRIC_TYPE.FINGERPRINT,
  AUTH_BIOMETRIC_TYPE.FACE_ID,
  AUTH_BIOMETRIC_TYPE.IRIS_SCAN,
  AUTH_BIOMETRIC_TYPE.PALM_SCAN,
  AUTH_BIOMETRIC_TYPE.RETINA_SCAN,
  AUTH_BIOMETRIC_TYPE.VEIN_RECOGNITION,
];

export const AUTHBIOMETRIC_BEHAVIORAL_TYPES: AuthBiometricType[] = [
  AUTH_BIOMETRIC_TYPE.VOICE_RECOGNITION,
  AUTH_BIOMETRIC_TYPE.GAIT_RECOGNITION,
  AUTH_BIOMETRIC_TYPE.SIGNATURE,
  AUTH_BIOMETRIC_TYPE.KEYSTROKE_DYNAMICS,
];

export const AUTHBIOMETRIC_PHYSIOLOGICAL_TYPES: AuthBiometricType[] = [
  AUTH_BIOMETRIC_TYPE.DNA,
  AUTH_BIOMETRIC_TYPE.EAR_SHAPE,
  AUTH_BIOMETRIC_TYPE.LIP_MOVEMENT,
  AUTH_BIOMETRIC_TYPE.HEART_RATE,
  AUTH_BIOMETRIC_TYPE.BRAIN_WAVES,
];

export const AUTHBIOMETRIC_MOBILE_TYPES: AuthBiometricType[] = [
  AUTH_BIOMETRIC_TYPE.ANDROID_FINGERPRINT,
  AUTH_BIOMETRIC_TYPE.ANDROID_FACE,
  AUTH_BIOMETRIC_TYPE.IOS_FINGERPRINT,
  AUTH_BIOMETRIC_TYPE.IOS_FACE,
  AUTH_BIOMETRIC_TYPE.IOS_IRIS,
];

export const AUTHBIOMETRIC_PLATFORM_TYPES: AuthBiometricType[] = [
  AUTH_BIOMETRIC_TYPE.WINDOWS_HELLO,
  AUTH_BIOMETRIC_TYPE.MACOS_TOUCH_ID,
  AUTH_BIOMETRIC_TYPE.MACOS_FACE_ID,
  AUTH_BIOMETRIC_TYPE.LINUX_FINGERPRINT,
];

export const AUTHBIOMETRIC_COMMON_TYPES: AuthBiometricType[] = [
  AUTH_BIOMETRIC_TYPE.FINGERPRINT,
  AUTH_BIOMETRIC_TYPE.FACE_ID,
  AUTH_BIOMETRIC_TYPE.VOICE_RECOGNITION,
  AUTH_BIOMETRIC_TYPE.IRIS_SCAN,
];

export const AUTHBIOMETRIC_TYPES_LIST: AuthBiometricType[] = [
  ...AUTHBIOMETRIC_PHYSICAL_TYPES,
  ...AUTHBIOMETRIC_BEHAVIORAL_TYPES,
  ...AUTHBIOMETRIC_PHYSIOLOGICAL_TYPES,
  ...AUTHBIOMETRIC_MOBILE_TYPES,
  ...AUTHBIOMETRIC_PLATFORM_TYPES,
];

export function isAuthbiometricPhysical(type: AuthBiometricType): boolean {
  return AUTHBIOMETRIC_PHYSICAL_TYPES.includes(type);
}

export function isAuthbiometricBehavioral(type: AuthBiometricType): boolean {
  return AUTHBIOMETRIC_BEHAVIORAL_TYPES.includes(type);
}

export function isAuthbiometricPhysiological(type: AuthBiometricType): boolean {
  return AUTHBIOMETRIC_PHYSIOLOGICAL_TYPES.includes(type);
}

export function isAuthbiometricMobile(type: AuthBiometricType): boolean {
  return AUTHBIOMETRIC_MOBILE_TYPES.includes(type);
}

export function isAuthbiometricPlatform(type: AuthBiometricType): boolean {
  return AUTHBIOMETRIC_PLATFORM_TYPES.includes(type);
}

export function isAuthbiometricCommon(type: AuthBiometricType): boolean {
  return AUTHBIOMETRIC_COMMON_TYPES.includes(type);
}

export function getAuthbiometricTypeLabel(type: AuthBiometricType): string {
  const labels: Record<AuthBiometricType, string> = {
    [AUTH_BIOMETRIC_TYPE.FINGERPRINT]: 'Fingerprint',
    [AUTH_BIOMETRIC_TYPE.FACE_ID]: 'Face ID',
    [AUTH_BIOMETRIC_TYPE.IRIS_SCAN]: 'Iris Scan',
    [AUTH_BIOMETRIC_TYPE.PALM_SCAN]: 'Palm Scan',
    [AUTH_BIOMETRIC_TYPE.RETINA_SCAN]: 'Retina Scan',
    [AUTH_BIOMETRIC_TYPE.VEIN_RECOGNITION]: 'Vein Recognition',
    [AUTH_BIOMETRIC_TYPE.VOICE_RECOGNITION]: 'Voice Recognition',
    [AUTH_BIOMETRIC_TYPE.GAIT_RECOGNITION]: 'Gait Recognition',
    [AUTH_BIOMETRIC_TYPE.SIGNATURE]: 'Signature',
    [AUTH_BIOMETRIC_TYPE.KEYSTROKE_DYNAMICS]: 'Keystroke Dynamics',
    [AUTH_BIOMETRIC_TYPE.DNA]: 'DNA',
    [AUTH_BIOMETRIC_TYPE.EAR_SHAPE]: 'Ear Shape',
    [AUTH_BIOMETRIC_TYPE.LIP_MOVEMENT]: 'Lip Movement',
    [AUTH_BIOMETRIC_TYPE.HEART_RATE]: 'Heart Rate',
    [AUTH_BIOMETRIC_TYPE.BRAIN_WAVES]: 'Brain Waves',
    [AUTH_BIOMETRIC_TYPE.ANDROID_FINGERPRINT]: 'Android Fingerprint',
    [AUTH_BIOMETRIC_TYPE.ANDROID_FACE]: 'Android Face',
    [AUTH_BIOMETRIC_TYPE.IOS_FINGERPRINT]: 'iOS Fingerprint',
    [AUTH_BIOMETRIC_TYPE.IOS_FACE]: 'iOS Face',
    [AUTH_BIOMETRIC_TYPE.IOS_IRIS]: 'iOS Iris',
    [AUTH_BIOMETRIC_TYPE.WINDOWS_HELLO]: 'Windows Hello',
    [AUTH_BIOMETRIC_TYPE.MACOS_TOUCH_ID]: 'macOS Touch ID',
    [AUTH_BIOMETRIC_TYPE.MACOS_FACE_ID]: 'macOS Face ID',
    [AUTH_BIOMETRIC_TYPE.LINUX_FINGERPRINT]: 'Linux Fingerprint',
  };

  return labels[type] || 'Unknown Biometric Type';
}

export function getAuthbiometricTypeIcon(type: AuthBiometricType): string {
  const icons: Record<AuthBiometricType, string> = {
    [AUTH_BIOMETRIC_TYPE.FINGERPRINT]: '👆',
    [AUTH_BIOMETRIC_TYPE.FACE_ID]: '😊',
    [AUTH_BIOMETRIC_TYPE.IRIS_SCAN]: '👁️',
    [AUTH_BIOMETRIC_TYPE.PALM_SCAN]: '🖐️',
    [AUTH_BIOMETRIC_TYPE.RETINA_SCAN]: '👁️',
    [AUTH_BIOMETRIC_TYPE.VEIN_RECOGNITION]: '🩸',
    [AUTH_BIOMETRIC_TYPE.VOICE_RECOGNITION]: '🎤',
    [AUTH_BIOMETRIC_TYPE.GAIT_RECOGNITION]: '🚶',
    [AUTH_BIOMETRIC_TYPE.SIGNATURE]: '✍️',
    [AUTH_BIOMETRIC_TYPE.KEYSTROKE_DYNAMICS]: '⌨️',
    [AUTH_BIOMETRIC_TYPE.DNA]: '🧬',
    [AUTH_BIOMETRIC_TYPE.EAR_SHAPE]: '👂',
    [AUTH_BIOMETRIC_TYPE.LIP_MOVEMENT]: '👄',
    [AUTH_BIOMETRIC_TYPE.HEART_RATE]: '❤️',
    [AUTH_BIOMETRIC_TYPE.BRAIN_WAVES]: '🧠',
    [AUTH_BIOMETRIC_TYPE.ANDROID_FINGERPRINT]: '📱',
    [AUTH_BIOMETRIC_TYPE.ANDROID_FACE]: '📱',
    [AUTH_BIOMETRIC_TYPE.IOS_FINGERPRINT]: '📱',
    [AUTH_BIOMETRIC_TYPE.IOS_FACE]: '📱',
    [AUTH_BIOMETRIC_TYPE.IOS_IRIS]: '📱',
    [AUTH_BIOMETRIC_TYPE.WINDOWS_HELLO]: '🪟',
    [AUTH_BIOMETRIC_TYPE.MACOS_TOUCH_ID]: '🍎',
    [AUTH_BIOMETRIC_TYPE.MACOS_FACE_ID]: '🍎',
    [AUTH_BIOMETRIC_TYPE.LINUX_FINGERPRINT]: '🐧',
  };

  return icons[type] || '🔒';
}

export function getAuthbiometricTypeSecurityLevel(
  type: AuthBiometricType
): 'low' | 'medium' | 'high' | 'very_high' {
  const levels: Record<AuthBiometricType, 'low' | 'medium' | 'high' | 'very_high'> = {
    [AUTH_BIOMETRIC_TYPE.FINGERPRINT]: 'high',
    [AUTH_BIOMETRIC_TYPE.FACE_ID]: 'high',
    [AUTH_BIOMETRIC_TYPE.IRIS_SCAN]: 'very_high',
    [AUTH_BIOMETRIC_TYPE.PALM_SCAN]: 'high',
    [AUTH_BIOMETRIC_TYPE.RETINA_SCAN]: 'very_high',
    [AUTH_BIOMETRIC_TYPE.VEIN_RECOGNITION]: 'very_high',
    [AUTH_BIOMETRIC_TYPE.VOICE_RECOGNITION]: 'medium',
    [AUTH_BIOMETRIC_TYPE.GAIT_RECOGNITION]: 'medium',
    [AUTH_BIOMETRIC_TYPE.SIGNATURE]: 'medium',
    [AUTH_BIOMETRIC_TYPE.KEYSTROKE_DYNAMICS]: 'low',
    [AUTH_BIOMETRIC_TYPE.DNA]: 'very_high',
    [AUTH_BIOMETRIC_TYPE.EAR_SHAPE]: 'medium',
    [AUTH_BIOMETRIC_TYPE.LIP_MOVEMENT]: 'medium',
    [AUTH_BIOMETRIC_TYPE.HEART_RATE]: 'medium',
    [AUTH_BIOMETRIC_TYPE.BRAIN_WAVES]: 'very_high',
    [AUTH_BIOMETRIC_TYPE.ANDROID_FINGERPRINT]: 'high',
    [AUTH_BIOMETRIC_TYPE.ANDROID_FACE]: 'high',
    [AUTH_BIOMETRIC_TYPE.IOS_FINGERPRINT]: 'high',
    [AUTH_BIOMETRIC_TYPE.IOS_FACE]: 'high',
    [AUTH_BIOMETRIC_TYPE.IOS_IRIS]: 'very_high',
    [AUTH_BIOMETRIC_TYPE.WINDOWS_HELLO]: 'high',
    [AUTH_BIOMETRIC_TYPE.MACOS_TOUCH_ID]: 'high',
    [AUTH_BIOMETRIC_TYPE.MACOS_FACE_ID]: 'high',
    [AUTH_BIOMETRIC_TYPE.LINUX_FINGERPRINT]: 'high',
  };

  return levels[type] || 'medium';
}

export function getAuthbiometricTypeCategory(
  type: AuthBiometricType
): 'physical' | 'behavioral' | 'physiological' | 'mobile' | 'platform' {
  if (isAuthbiometricPhysical(type)) return 'physical';
  if (isAuthbiometricBehavioral(type)) return 'behavioral';
  if (isAuthbiometricPhysiological(type)) return 'physiological';
  if (isAuthbiometricMobile(type)) return 'mobile';
  if (isAuthbiometricPlatform(type)) return 'platform';
  return 'physical';
}
