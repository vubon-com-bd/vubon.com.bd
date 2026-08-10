// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Default OAuth provider
 */
export const OAUTH_DEFAULT_PROVIDER = 'google';

/**
 * Allowed OAuth grant types
 */
export const OAUTH_GRANT_TYPES = [
  'authorization_code',
  'refresh_token',
  'client_credentials',
  'password',
] as const;

/**
 * OAuth token expiry in seconds (1 hour)
 */
export const OAUTH_TOKEN_EXPIRY = 3600;

/**
 * OAuth refresh token expiry in seconds (30 days)
 */
export const OAUTH_REFRESH_TOKEN_EXPIRY = 2592000;

/**
 * Default OAuth scopes
 */
export const OAUTH_SCOPES = ['openid', 'profile', 'email', 'offline_access'] as const;

/**
 * OAuth configuration
 */
export const OAUTH_CONFIG = {
  DEFAULT_PROVIDER: OAUTH_DEFAULT_PROVIDER,
  GRANT_TYPES: OAUTH_GRANT_TYPES,
  TOKEN_EXPIRY: OAUTH_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY: OAUTH_REFRESH_TOKEN_EXPIRY,
  SCOPES: OAUTH_SCOPES,
} as const;

/**
 * Type for OAuth grant type
 */
export type OAuthGrantType = (typeof OAUTH_GRANT_TYPES)[number];

/**
 * Type for OAuth scope
 */
export type OAuthScope = (typeof OAUTH_SCOPES)[number];

/**
 * Type for OAuth configuration
 */
export type OAuthConfig = typeof OAUTH_CONFIG;
