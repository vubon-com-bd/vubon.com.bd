// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Authentication status enum
 */
export const AUTH_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  BLOCKED: 'blocked',
  PENDING: 'pending',
  EXPIRED: 'expired',
  SUSPENDED: 'suspended',
} as const;

/**
 * Active status
 */
export const ACTIVE = AUTH_STATUS.ACTIVE;

/**
 * Inactive status
 */
export const INACTIVE = AUTH_STATUS.INACTIVE;

/**
 * Blocked status
 */
export const BLOCKED = AUTH_STATUS.BLOCKED;

/**
 * Pending status
 */
export const PENDING = AUTH_STATUS.PENDING;

/**
 * Expired status
 */
export const EXPIRED = AUTH_STATUS.EXPIRED;

/**
 * Suspended status
 */
export const SUSPENDED = AUTH_STATUS.SUSPENDED;

/**
 * Type for authentication status
 */
export type AuthStatus = (typeof AUTH_STATUS)[keyof typeof AUTH_STATUS];
