/**
 * Admin Biometric Type Constants
 * Detailed biometric type definitions
 */

export const ADMIN_BIOMETRIC_TYPE = {
  // Fingerprint types
  FINGERPRINT: 'fingerprint',
  FINGERPRINT_OPTICAL: 'fingerprint_optical',
  FINGERPRINT_CAPACITIVE: 'fingerprint_capacitive',
  FINGERPRINT_ULTRASONIC: 'fingerprint_ultrasonic',

  // Face recognition types
  FACE: 'face',
  FACE_2D: 'face_2d',
  FACE_3D: 'face_3d',
  FACE_IR: 'face_ir',
  FACE_THERMAL: 'face_thermal',

  // Eye-based types
  IRIS: 'iris',
  RETINA: 'retina',
  OCULAR: 'ocular',

  // Voice recognition types
  VOICE: 'voice',
  VOICE_TEXT_DEPENDENT: 'voice_text_dependent',
  VOICE_TEXT_INDEPENDENT: 'voice_text_independent',

  // Hand-based types
  PALM: 'palm',
  PALM_VEIN: 'palm_vein',
  FINGER_VEIN: 'finger_vein',
  HAND_GEOMETRY: 'hand_geometry',

  // Behavioral types
  KEYSTROKE: 'keystroke',
  KEYSTROKE_TIMING: 'keystroke_timing',
  KEYSTROKE_PRESSURE: 'keystroke_pressure',
  MOUSE_MOVEMENT: 'mouse_movement',
  MOUSE_CLICK: 'mouse_click',
  GAIT: 'gait',
  GAIT_ACCELEROMETER: 'gait_accelerometer',
  GAIT_GYROSCOPE: 'gait_gyroscope',

  // Physiological types
  DNA: 'dna',
  EAR: 'ear',
  EAR_GEOMETRY: 'ear_geometry',
  ODOR: 'odor',
  THERMOGRAM: 'thermogram',

  // Electro-physiological types
  ECG: 'ecg',
  EEG: 'eeg',
  PPG: 'ppg',
  EMG: 'emg',

  // Multimodal types
  MULTIMODAL: 'multimodal',
  MULTIMODAL_FACE_VOICE: 'multimodal_face_voice',
  MULTIMODAL_FINGERPRINT_IRIS: 'multimodal_fingerprint_iris',
  MULTIMODAL_FACE_IRIS: 'multimodal_face_iris',
  MULTIMODAL_FINGERPRINT_VOICE: 'multimodal_fingerprint_voice',

  // Other types
  SKIN_PRINT: 'skin_print',
  LIP_PRINT: 'lip_print',
  TONGUE_PRINT: 'tongue_print',
} as const;

export type AdminBiometricTypeDetail =
  (typeof ADMIN_BIOMETRIC_TYPE)[keyof typeof ADMIN_BIOMETRIC_TYPE];

export const ADMIN_BIOMETRIC_TYPE_CATEGORIES: Record<AdminBiometricTypeDetail, string> = {
  // Fingerprint types
  [ADMIN_BIOMETRIC_TYPE.FINGERPRINT]: 'fingerprint',
  [ADMIN_BIOMETRIC_TYPE.FINGERPRINT_OPTICAL]: 'fingerprint',
  [ADMIN_BIOMETRIC_TYPE.FINGERPRINT_CAPACITIVE]: 'fingerprint',
  [ADMIN_BIOMETRIC_TYPE.FINGERPRINT_ULTRASONIC]: 'fingerprint',

  // Face recognition types
  [ADMIN_BIOMETRIC_TYPE.FACE]: 'face',
  [ADMIN_BIOMETRIC_TYPE.FACE_2D]: 'face',
  [ADMIN_BIOMETRIC_TYPE.FACE_3D]: 'face',
  [ADMIN_BIOMETRIC_TYPE.FACE_IR]: 'face',
  [ADMIN_BIOMETRIC_TYPE.FACE_THERMAL]: 'face',

  // Eye-based types
  [ADMIN_BIOMETRIC_TYPE.IRIS]: 'eye',
  [ADMIN_BIOMETRIC_TYPE.RETINA]: 'eye',
  [ADMIN_BIOMETRIC_TYPE.OCULAR]: 'eye',

  // Voice recognition types
  [ADMIN_BIOMETRIC_TYPE.VOICE]: 'voice',
  [ADMIN_BIOMETRIC_TYPE.VOICE_TEXT_DEPENDENT]: 'voice',
  [ADMIN_BIOMETRIC_TYPE.VOICE_TEXT_INDEPENDENT]: 'voice',

  // Hand-based types
  [ADMIN_BIOMETRIC_TYPE.PALM]: 'hand',
  [ADMIN_BIOMETRIC_TYPE.PALM_VEIN]: 'hand',
  [ADMIN_BIOMETRIC_TYPE.FINGER_VEIN]: 'hand',
  [ADMIN_BIOMETRIC_TYPE.HAND_GEOMETRY]: 'hand',

  // Behavioral types
  [ADMIN_BIOMETRIC_TYPE.KEYSTROKE]: 'behavioral',
  [ADMIN_BIOMETRIC_TYPE.KEYSTROKE_TIMING]: 'behavioral',
  [ADMIN_BIOMETRIC_TYPE.KEYSTROKE_PRESSURE]: 'behavioral',
  [ADMIN_BIOMETRIC_TYPE.MOUSE_MOVEMENT]: 'behavioral',
  [ADMIN_BIOMETRIC_TYPE.MOUSE_CLICK]: 'behavioral',
  [ADMIN_BIOMETRIC_TYPE.GAIT]: 'behavioral',
  [ADMIN_BIOMETRIC_TYPE.GAIT_ACCELEROMETER]: 'behavioral',
  [ADMIN_BIOMETRIC_TYPE.GAIT_GYROSCOPE]: 'behavioral',

  // Physiological types
  [ADMIN_BIOMETRIC_TYPE.DNA]: 'physiological',
  [ADMIN_BIOMETRIC_TYPE.EAR]: 'physiological',
  [ADMIN_BIOMETRIC_TYPE.EAR_GEOMETRY]: 'physiological',
  [ADMIN_BIOMETRIC_TYPE.ODOR]: 'physiological',
  [ADMIN_BIOMETRIC_TYPE.THERMOGRAM]: 'physiological',

  // Electro-physiological types
  [ADMIN_BIOMETRIC_TYPE.ECG]: 'electro_physiological',
  [ADMIN_BIOMETRIC_TYPE.EEG]: 'electro_physiological',
  [ADMIN_BIOMETRIC_TYPE.PPG]: 'electro_physiological',
  [ADMIN_BIOMETRIC_TYPE.EMG]: 'electro_physiological',

  // Multimodal types
  [ADMIN_BIOMETRIC_TYPE.MULTIMODAL]: 'multimodal',
  [ADMIN_BIOMETRIC_TYPE.MULTIMODAL_FACE_VOICE]: 'multimodal',
  [ADMIN_BIOMETRIC_TYPE.MULTIMODAL_FINGERPRINT_IRIS]: 'multimodal',
  [ADMIN_BIOMETRIC_TYPE.MULTIMODAL_FACE_IRIS]: 'multimodal',
  [ADMIN_BIOMETRIC_TYPE.MULTIMODAL_FINGERPRINT_VOICE]: 'multimodal',

  // Other types
  [ADMIN_BIOMETRIC_TYPE.SKIN_PRINT]: 'other',
  [ADMIN_BIOMETRIC_TYPE.LIP_PRINT]: 'other',
  [ADMIN_BIOMETRIC_TYPE.TONGUE_PRINT]: 'other',
};

export const ADMIN_BIOMETRIC_TYPE_LABELS_DETAIL: Record<AdminBiometricTypeDetail, string> = {
  // Fingerprint types
  [ADMIN_BIOMETRIC_TYPE.FINGERPRINT]: 'Fingerprint',
  [ADMIN_BIOMETRIC_TYPE.FINGERPRINT_OPTICAL]: 'Optical Fingerprint',
  [ADMIN_BIOMETRIC_TYPE.FINGERPRINT_CAPACITIVE]: 'Capacitive Fingerprint',
  [ADMIN_BIOMETRIC_TYPE.FINGERPRINT_ULTRASONIC]: 'Ultrasonic Fingerprint',

  // Face recognition types
  [ADMIN_BIOMETRIC_TYPE.FACE]: 'Face Recognition',
  [ADMIN_BIOMETRIC_TYPE.FACE_2D]: '2D Face Recognition',
  [ADMIN_BIOMETRIC_TYPE.FACE_3D]: '3D Face Recognition',
  [ADMIN_BIOMETRIC_TYPE.FACE_IR]: 'Infrared Face Recognition',
  [ADMIN_BIOMETRIC_TYPE.FACE_THERMAL]: 'Thermal Face Recognition',

  // Eye-based types
  [ADMIN_BIOMETRIC_TYPE.IRIS]: 'Iris Recognition',
  [ADMIN_BIOMETRIC_TYPE.RETINA]: 'Retina Scan',
  [ADMIN_BIOMETRIC_TYPE.OCULAR]: 'Ocular Recognition',

  // Voice recognition types
  [ADMIN_BIOMETRIC_TYPE.VOICE]: 'Voice Recognition',
  [ADMIN_BIOMETRIC_TYPE.VOICE_TEXT_DEPENDENT]: 'Text-Dependent Voice',
  [ADMIN_BIOMETRIC_TYPE.VOICE_TEXT_INDEPENDENT]: 'Text-Independent Voice',

  // Hand-based types
  [ADMIN_BIOMETRIC_TYPE.PALM]: 'Palm Recognition',
  [ADMIN_BIOMETRIC_TYPE.PALM_VEIN]: 'Palm Vein Recognition',
  [ADMIN_BIOMETRIC_TYPE.FINGER_VEIN]: 'Finger Vein Recognition',
  [ADMIN_BIOMETRIC_TYPE.HAND_GEOMETRY]: 'Hand Geometry',

  // Behavioral types
  [ADMIN_BIOMETRIC_TYPE.KEYSTROKE]: 'Keystroke Dynamics',
  [ADMIN_BIOMETRIC_TYPE.KEYSTROKE_TIMING]: 'Keystroke Timing',
  [ADMIN_BIOMETRIC_TYPE.KEYSTROKE_PRESSURE]: 'Keystroke Pressure',
  [ADMIN_BIOMETRIC_TYPE.MOUSE_MOVEMENT]: 'Mouse Movement',
  [ADMIN_BIOMETRIC_TYPE.MOUSE_CLICK]: 'Mouse Click',
  [ADMIN_BIOMETRIC_TYPE.GAIT]: 'Gait Analysis',
  [ADMIN_BIOMETRIC_TYPE.GAIT_ACCELEROMETER]: 'Accelerometer Gait',
  [ADMIN_BIOMETRIC_TYPE.GAIT_GYROSCOPE]: 'Gyroscope Gait',

  // Physiological types
  [ADMIN_BIOMETRIC_TYPE.DNA]: 'DNA Analysis',
  [ADMIN_BIOMETRIC_TYPE.EAR]: 'Ear Recognition',
  [ADMIN_BIOMETRIC_TYPE.EAR_GEOMETRY]: 'Ear Geometry',
  [ADMIN_BIOMETRIC_TYPE.ODOR]: 'Odor Recognition',
  [ADMIN_BIOMETRIC_TYPE.THERMOGRAM]: 'Thermogram',

  // Electro-physiological types
  [ADMIN_BIOMETRIC_TYPE.ECG]: 'Electrocardiogram',
  [ADMIN_BIOMETRIC_TYPE.EEG]: 'Electroencephalogram',
  [ADMIN_BIOMETRIC_TYPE.PPG]: 'Photoplethysmograph',
  [ADMIN_BIOMETRIC_TYPE.EMG]: 'Electromyogram',

  // Multimodal types
  [ADMIN_BIOMETRIC_TYPE.MULTIMODAL]: 'Multimodal Biometric',
  [ADMIN_BIOMETRIC_TYPE.MULTIMODAL_FACE_VOICE]: 'Face + Voice',
  [ADMIN_BIOMETRIC_TYPE.MULTIMODAL_FINGERPRINT_IRIS]: 'Fingerprint + Iris',
  [ADMIN_BIOMETRIC_TYPE.MULTIMODAL_FACE_IRIS]: 'Face + Iris',
  [ADMIN_BIOMETRIC_TYPE.MULTIMODAL_FINGERPRINT_VOICE]: 'Fingerprint + Voice',

  // Other types
  [ADMIN_BIOMETRIC_TYPE.SKIN_PRINT]: 'Skin Print',
  [ADMIN_BIOMETRIC_TYPE.LIP_PRINT]: 'Lip Print',
  [ADMIN_BIOMETRIC_TYPE.TONGUE_PRINT]: 'Tongue Print',
};

export function getAdminBiometricTypeCategory(type: AdminBiometricTypeDetail): string {
  return ADMIN_BIOMETRIC_TYPE_CATEGORIES[type] || 'other';
}

export function getAdminBiometricTypeLabel(type: AdminBiometricTypeDetail): string {
  return ADMIN_BIOMETRIC_TYPE_LABELS_DETAIL[type] || 'Unknown Type';
}

export function isFingerprintType(type: AdminBiometricTypeDetail): boolean {
  return getAdminBiometricTypeCategory(type) === 'fingerprint';
}

export function isFaceType(type: AdminBiometricTypeDetail): boolean {
  return getAdminBiometricTypeCategory(type) === 'face';
}

export function isEyeType(type: AdminBiometricTypeDetail): boolean {
  return getAdminBiometricTypeCategory(type) === 'eye';
}

export function isVoiceType(type: AdminBiometricTypeDetail): boolean {
  return getAdminBiometricTypeCategory(type) === 'voice';
}

export function isHandType(type: AdminBiometricTypeDetail): boolean {
  return getAdminBiometricTypeCategory(type) === 'hand';
}

export function isBehavioralType(type: AdminBiometricTypeDetail): boolean {
  return getAdminBiometricTypeCategory(type) === 'behavioral';
}

export function isPhysiologicalType(type: AdminBiometricTypeDetail): boolean {
  return getAdminBiometricTypeCategory(type) === 'physiological';
}

export function isElectroPhysiologicalType(type: AdminBiometricTypeDetail): boolean {
  return getAdminBiometricTypeCategory(type) === 'electro_physiological';
}

export function isMultimodalType(type: AdminBiometricTypeDetail): boolean {
  return getAdminBiometricTypeCategory(type) === 'multimodal';
}

export function getBiometricTypeCategory(type: AdminBiometricTypeDetail): string {
  return ADMIN_BIOMETRIC_TYPE_CATEGORIES[type] || 'other';
}
