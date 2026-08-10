// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Device type enum
 */
export const DEVICE_TYPE = {
  DESKTOP: 'desktop',
  LAPTOP: 'laptop',
  MOBILE: 'mobile',
  TABLET: 'tablet',
  TV: 'tv',
  WEARABLE: 'wearable',
  UNKNOWN: 'unknown',
} as const;

/**
 * Desktop device type
 */
export const DEVICE_TYPE_DESKTOP = DEVICE_TYPE.DESKTOP;

/**
 * Laptop device type
 */
export const DEVICE_TYPE_LAPTOP = DEVICE_TYPE.LAPTOP;

/**
 * Mobile device type
 */
export const DEVICE_TYPE_MOBILE = DEVICE_TYPE.MOBILE;

/**
 * Tablet device type
 */
export const DEVICE_TYPE_TABLET = DEVICE_TYPE.TABLET;

/**
 * TV device type
 */
export const DEVICE_TYPE_TV = DEVICE_TYPE.TV;

/**
 * Wearable device type (smartwatch, etc.)
 */
export const DEVICE_TYPE_WEARABLE = DEVICE_TYPE.WEARABLE;

/**
 * Unknown device type
 */
export const DEVICE_TYPE_UNKNOWN = DEVICE_TYPE.UNKNOWN;

/**
 * Type for device type
 */
export type DeviceType = (typeof DEVICE_TYPE)[keyof typeof DEVICE_TYPE];
