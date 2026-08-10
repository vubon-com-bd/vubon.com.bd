// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Salt for device fingerprint generation
 */
export const DEVICE_FINGERPRINT_SALT = 'vubon_device_fingerprint_salt';

/**
 * Maximum number of devices per user
 */
export const DEVICE_MAX_PER_USER = 5;

/**
 * Device session timeout in seconds (30 days)
 */
export const DEVICE_SESSION_TIMEOUT = 2592000;

/**
 * Trusted device duration in days (90 days)
 */
export const DEVICE_TRUST_DURATION = 90;

/**
 * Components used for device fingerprint generation
 */
export const DEVICE_FINGERPRINT_COMPONENTS = [
  'userAgent',
  'platform',
  'screenResolution',
  'timezone',
  'language',
  'hardwareConcurrency',
  'deviceMemory',
] as const;

/**
 * Whether unknown devices are allowed
 */
export const DEVICE_UNKNOWN_ALLOWED = false;

/**
 * Whether to send notification on new device login
 */
export const DEVICE_NOTIFICATION_ON_NEW = true;

/**
 * Device configuration
 */
export const DEVICE_CONFIG = {
  FINGERPRINT_SALT: DEVICE_FINGERPRINT_SALT,
  MAX_PER_USER: DEVICE_MAX_PER_USER,
  SESSION_TIMEOUT: DEVICE_SESSION_TIMEOUT,
  TRUST_DURATION: DEVICE_TRUST_DURATION,
  FINGERPRINT_COMPONENTS: DEVICE_FINGERPRINT_COMPONENTS,
  UNKNOWN_ALLOWED: DEVICE_UNKNOWN_ALLOWED,
  NOTIFICATION_ON_NEW: DEVICE_NOTIFICATION_ON_NEW,
} as const;

/**
 * Type for device fingerprint component
 */
export type DeviceFingerprintComponent = (typeof DEVICE_FINGERPRINT_COMPONENTS)[number];

/**
 * Type for device configuration
 */
export type DeviceConfig = typeof DEVICE_CONFIG;
