// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * SSO status enum
 */
export const SSO_STATUS = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
  REVOKED: 'revoked',
  PENDING: 'pending',
  FAILED: 'failed',
  LOGGED_OUT: 'logged_out',
} as const;

/**
 * SSO session is active
 */
export const SSO_STATUS_ACTIVE = SSO_STATUS.ACTIVE;

/**
 * SSO session has expired
 */
export const SSO_STATUS_EXPIRED = SSO_STATUS.EXPIRED;

/**
 * SSO session has been revoked
 */
export const SSO_STATUS_REVOKED = SSO_STATUS.REVOKED;

/**
 * SSO session is pending
 */
export const SSO_STATUS_PENDING = SSO_STATUS.PENDING;

/**
 * SSO session failed
 */
export const SSO_STATUS_FAILED = SSO_STATUS.FAILED;

/**
 * SSO session has been logged out
 */
export const SSO_STATUS_LOGGED_OUT = SSO_STATUS.LOGGED_OUT;

/**
 * Type for SSO status
 */
export type SsoStatus = (typeof SSO_STATUS)[keyof typeof SSO_STATUS];
