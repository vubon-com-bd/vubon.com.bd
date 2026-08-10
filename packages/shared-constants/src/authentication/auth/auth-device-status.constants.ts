// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Device status enum
 */
export const DEVICE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  BLOCKED: 'blocked',
  SUSPENDED: 'suspended',
  TRUSTED: 'trusted',
  PENDING: 'pending',
} as const;

/**
 * Device is active
 */
export const DEVICE_STATUS_ACTIVE = DEVICE_STATUS.ACTIVE;

/**
 * Device is inactive
 */
export const DEVICE_STATUS_INACTIVE = DEVICE_STATUS.INACTIVE;

/**
 * Device is blocked
 */
export const DEVICE_STATUS_BLOCKED = DEVICE_STATUS.BLOCKED;

/**
 * Device is suspended
 */
export const DEVICE_STATUS_SUSPENDED = DEVICE_STATUS.SUSPENDED;

/**
 * Device is trusted
 */
export const DEVICE_STATUS_TRUSTED = DEVICE_STATUS.TRUSTED;

/**
 * Device is pending
 */
export const DEVICE_STATUS_PENDING = DEVICE_STATUS.PENDING;

/**
 * Type for device status
 */
export type DeviceStatus = (typeof DEVICE_STATUS)[keyof typeof DEVICE_STATUS];
