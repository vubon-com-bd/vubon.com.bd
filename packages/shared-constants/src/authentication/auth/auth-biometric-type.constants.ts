// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Biometric type enum
 */
export const BIOMETRIC_TYPE = {
  FINGERPRINT: 'fingerprint',
  FACIAL: 'facial',
  IRIS: 'iris',
  VOICE: 'voice',
  HAND_GEOMETRY: 'hand_geometry',
  RETINA: 'retina',
  PALM: 'palm',
  EAR: 'ear',
} as const;

/**
 * Fingerprint biometric type
 */
export const BIOMETRIC_TYPE_FINGERPRINT = BIOMETRIC_TYPE.FINGERPRINT;

/**
 * Facial recognition biometric type
 */
export const BIOMETRIC_TYPE_FACIAL = BIOMETRIC_TYPE.FACIAL;

/**
 * Iris recognition biometric type
 */
export const BIOMETRIC_TYPE_IRIS = BIOMETRIC_TYPE.IRIS;

/**
 * Voice recognition biometric type
 */
export const BIOMETRIC_TYPE_VOICE = BIOMETRIC_TYPE.VOICE;

/**
 * Hand geometry biometric type
 */
export const BIOMETRIC_TYPE_HAND_GEOMETRY = BIOMETRIC_TYPE.HAND_GEOMETRY;

/**
 * Retina recognition biometric type
 */
export const BIOMETRIC_TYPE_RETINA = BIOMETRIC_TYPE.RETINA;

/**
 * Palm recognition biometric type
 */
export const BIOMETRIC_TYPE_PALM = BIOMETRIC_TYPE.PALM;

/**
 * Ear recognition biometric type
 */
export const BIOMETRIC_TYPE_EAR = BIOMETRIC_TYPE.EAR;

/**
 * Type for biometric type
 */
export type BiometricTypeEnum = (typeof BIOMETRIC_TYPE)[keyof typeof BIOMETRIC_TYPE];
