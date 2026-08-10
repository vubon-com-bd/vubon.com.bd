// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Default biometric authentication enabled status
 */
export const BIOMETRIC_ENABLED_DEFAULT = false;

/**
 * Allowed biometric types
 */
export const BIOMETRIC_ALLOWED_TYPES = [
  'fingerprint',
  'facial',
  'iris',
  'voice',
  'hand_geometry',
] as const;

/**
 * Biometric session timeout in seconds (15 minutes)
 */
export const BIOMETRIC_SESSION_TIMEOUT = 900;

/**
 * Maximum number of biometric verification attempts
 */
export const BIOMETRIC_MAX_ATTEMPTS = 3;

/**
 * Biometric confidence threshold (0-1)
 */
export const BIOMETRIC_CONFIDENCE_THRESHOLD = 0.8;

/**
 * Biometric configuration
 */
export const BIOMETRIC_CONFIG = {
  ENABLED_DEFAULT: BIOMETRIC_ENABLED_DEFAULT,
  ALLOWED_TYPES: BIOMETRIC_ALLOWED_TYPES,
  SESSION_TIMEOUT: BIOMETRIC_SESSION_TIMEOUT,
  MAX_ATTEMPTS: BIOMETRIC_MAX_ATTEMPTS,
  CONFIDENCE_THRESHOLD: BIOMETRIC_CONFIDENCE_THRESHOLD,
} as const;

/**
 * Type for biometric type
 */
export type BiometricType = (typeof BIOMETRIC_ALLOWED_TYPES)[number];

/**
 * Type for biometric configuration
 */
export type BiometricConfig = typeof BIOMETRIC_CONFIG;
