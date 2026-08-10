// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Social account status enum
 */
export const SOCIAL_STATUS = {
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected',
  PENDING: 'pending',
  FAILED: 'failed',
  EXPIRED: 'expired',
} as const;

/**
 * Social account is connected
 */
export const SOCIAL_STATUS_CONNECTED = SOCIAL_STATUS.CONNECTED;

/**
 * Social account is disconnected
 */
export const SOCIAL_STATUS_DISCONNECTED = SOCIAL_STATUS.DISCONNECTED;

/**
 * Social account connection is pending
 */
export const SOCIAL_STATUS_PENDING = SOCIAL_STATUS.PENDING;

/**
 * Social account connection failed
 */
export const SOCIAL_STATUS_FAILED = SOCIAL_STATUS.FAILED;

/**
 * Social account connection has expired
 */
export const SOCIAL_STATUS_EXPIRED = SOCIAL_STATUS.EXPIRED;

/**
 * Type for social status
 */
export type SocialStatus = (typeof SOCIAL_STATUS)[keyof typeof SOCIAL_STATUS];
