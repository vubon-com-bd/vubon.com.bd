/**
 * Authentication Biometric Type Constants
 * Types of biometric authentication methods
 */

export const AUTH_BIOMETRIC_TYPE = {
  // Physical biometrics
  FINGERPRINT: 'fingerprint',
  FACE_ID: 'face_id',
  IRIS_SCAN: 'iris_scan',
  PALM_SCAN: 'palm_scan',
  RETINA_SCAN: 'retina_scan',
  VEIN_RECOGNITION: 'vein_recognition',

  // Behavioral biometrics
  VOICE_RECOGNITION: 'voice_recognition',
  GAIT_RECOGNITION: 'gait_recognition',
  SIGNATURE: 'signature',
  KEYSTROKE_DYNAMICS: 'keystroke_dynamics',

  // Physiological biometrics
  DNA: 'dna',
  EAR_SHAPE: 'ear_shape',
  LIP_MOVEMENT: 'lip_movement',
  HEART_RATE: 'heart_rate',
  BRAIN_WAVES: 'brain_waves',

  // Mobile-specific
  ANDROID_FINGERPRINT: 'android_fingerprint',
  ANDROID_FACE: 'android_face',
  IOS_FINGERPRINT: 'ios_fingerprint',
  IOS_FACE: 'ios_face',
  IOS_IRIS: 'ios_iris',

  // Platform-specific
  WINDOWS_HELLO: 'windows_hello',
  MACOS_TOUCH_ID: 'macos_touch_id',
  MACOS_FACE_ID: 'macos_face_id',
  LINUX_FINGERPRINT: 'linux_fingerprint',
} as const;

export type AuthBiometricType = (typeof AUTH_BIOMETRIC_TYPE)[keyof typeof AUTH_BIOMETRIC_TYPE];

export const PHYSICAL_BIOMETRICS: AuthBiometricType[] = [
  AUTH_BIOMETRIC_TYPE.FINGERPRINT,
  AUTH_BIOMETRIC_TYPE.FACE_ID,
  AUTH_BIOMETRIC_TYPE.IRIS_SCAN,
  AUTH_BIOMETRIC_TYPE.PALM_SCAN,
  AUTH_BIOMETRIC_TYPE.RETINA_SCAN,
  AUTH_BIOMETRIC_TYPE.VEIN_RECOGNITION,
];

export const BEHAVIORAL_BIOMETRICS: AuthBiometricType[] = [
  AUTH_BIOMETRIC_TYPE.VOICE_RECOGNITION,
  AUTH_BIOMETRIC_TYPE.GAIT_RECOGNITION,
  AUTH_BIOMETRIC_TYPE.SIGNATURE,
  AUTH_BIOMETRIC_TYPE.KEYSTROKE_DYNAMICS,
];

export const PHYSIOLOGICAL_BIOMETRICS: AuthBiometricType[] = [
  AUTH_BIOMETRIC_TYPE.DNA,
  AUTH_BIOMETRIC_TYPE.EAR_SHAPE,
  AUTH_BIOMETRIC_TYPE.LIP_MOVEMENT,
  AUTH_BIOMETRIC_TYPE.HEART_RATE,
  AUTH_BIOMETRIC_TYPE.BRAIN_WAVES,
];

export const MOBILE_BIOMETRICS: AuthBiometricType[] = [
  AUTH_BIOMETRIC_TYPE.ANDROID_FINGERPRINT,
  AUTH_BIOMETRIC_TYPE.ANDROID_FACE,
  AUTH_BIOMETRIC_TYPE.IOS_FINGERPRINT,
  AUTH_BIOMETRIC_TYPE.IOS_FACE,
  AUTH_BIOMETRIC_TYPE.IOS_IRIS,
];

export const PLATFORM_BIOMETRICS: AuthBiometricType[] = [
  AUTH_BIOMETRIC_TYPE.WINDOWS_HELLO,
  AUTH_BIOMETRIC_TYPE.MACOS_TOUCH_ID,
  AUTH_BIOMETRIC_TYPE.MACOS_FACE_ID,
  AUTH_BIOMETRIC_TYPE.LINUX_FINGERPRINT,
];

export const COMMON_BIOMETRICS: AuthBiometricType[] = [
  AUTH_BIOMETRIC_TYPE.FINGERPRINT,
  AUTH_BIOMETRIC_TYPE.FACE_ID,
  AUTH_BIOMETRIC_TYPE.VOICE_RECOGNITION,
  AUTH_BIOMETRIC_TYPE.IRIS_SCAN,
];

export const BIOMETRIC_TYPES_LIST: AuthBiometricType[] = [
  ...PHYSICAL_BIOMETRICS,
  ...BEHAVIORAL_BIOMETRICS,
  ...PHYSIOLOGICAL_BIOMETRICS,
  ...MOBILE_BIOMETRICS,
  ...PLATFORM_BIOMETRICS,
];

export function isPhysicalBiometric(type: AuthBiometricType): boolean {
  return PHYSICAL_BIOMETRICS.includes(type);
}

export function isBehavioralBiometric(type: AuthBiometricType): boolean {
  return BEHAVIORAL_BIOMETRICS.includes(type);
}

export function isPhysiologicalBiometric(type: AuthBiometricType): boolean {
  return PHYSIOLOGICAL_BIOMETRICS.includes(type);
}

export function isMobileBiometric(type: AuthBiometricType): boolean {
  return MOBILE_BIOMETRICS.includes(type);
}

export function isPlatformBiometric(type: AuthBiometricType): boolean {
  return PLATFORM_BIOMETRICS.includes(type);
}

export function isCommonBiometric(type: AuthBiometricType): boolean {
  return COMMON_BIOMETRICS.includes(type);
}

export function getBiometricTypeLabel(type: AuthBiometricType): string {
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

export function getBiometricTypeIcon(type: AuthBiometricType): string {
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

export function getBiometricTypeSecurityLevel(
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

export function getBiometricTypeCategory(
  type: AuthBiometricType
): 'physical' | 'behavioral' | 'physiological' | 'mobile' | 'platform' {
  if (isPhysicalBiometric(type)) return 'physical';
  if (isBehavioralBiometric(type)) return 'behavioral';
  if (isPhysiologicalBiometric(type)) return 'physiological';
  if (isMobileBiometric(type)) return 'mobile';
  if (isPlatformBiometric(type)) return 'platform';
  return 'physical';
}
