// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * OAuth status enum
 */
export const OAUTH_STATUS = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
  REVOKED: 'revoked',
  PENDING: 'pending',
  FAILED: 'failed',
  REFRESHED: 'refreshed',
} as const;

/**
 * OAuth token is active
 */
export const OAUTH_STATUS_ACTIVE = OAUTH_STATUS.ACTIVE;

/**
 * OAuth token has expired
 */
export const OAUTH_STATUS_EXPIRED = OAUTH_STATUS.EXPIRED;

/**
 * OAuth token has been revoked
 */
export const OAUTH_STATUS_REVOKED = OAUTH_STATUS.REVOKED;

/**
 * OAuth token is pending
 */
export const OAUTH_STATUS_PENDING = OAUTH_STATUS.PENDING;

/**
 * OAuth token request failed
 */
export const OAUTH_STATUS_FAILED = OAUTH_STATUS.FAILED;

/**
 * OAuth token has been refreshed
 */
export const OAUTH_STATUS_REFRESHED = OAUTH_STATUS.REFRESHED;

/**
 * Type for OAuth status
 */
export type OAuthStatus = (typeof OAUTH_STATUS)[keyof typeof OAUTH_STATUS];
