// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Biometric authentication status enum
 */
export const BIOMETRIC_STATUS = {
  ENABLED: 'enabled',
  DISABLED: 'disabled',
  PENDING: 'pending',
  VERIFIED: 'verified',
  FAILED: 'failed',
  LOCKED: 'locked',
  NOT_AVAILABLE: 'not_available',
  SETUP: 'setup',
} as const;

/**
 * Biometric authentication is enabled and active
 */
export const BIOMETRIC_STATUS_ENABLED = BIOMETRIC_STATUS.ENABLED;

/**
 * Biometric authentication is disabled
 */
export const BIOMETRIC_STATUS_DISABLED = BIOMETRIC_STATUS.DISABLED;

/**
 * Biometric authentication setup is pending
 */
export const BIOMETRIC_STATUS_PENDING = BIOMETRIC_STATUS.PENDING;

/**
 * Biometric authentication has been verified successfully
 */
export const BIOMETRIC_STATUS_VERIFIED = BIOMETRIC_STATUS.VERIFIED;

/**
 * Biometric authentication failed
 */
export const BIOMETRIC_STATUS_FAILED = BIOMETRIC_STATUS.FAILED;

/**
 * Biometric authentication is locked (too many attempts)
 */
export const BIOMETRIC_STATUS_LOCKED = BIOMETRIC_STATUS.LOCKED;

/**
 * Biometric authentication is not available on this device
 */
export const BIOMETRIC_STATUS_NOT_AVAILABLE = BIOMETRIC_STATUS.NOT_AVAILABLE;

/**
 * Biometric authentication is in setup mode
 */
export const BIOMETRIC_STATUS_SETUP = BIOMETRIC_STATUS.SETUP;

/**
 * Type for biometric status
 */
export type BiometricStatus = (typeof BIOMETRIC_STATUS)[keyof typeof BIOMETRIC_STATUS];
