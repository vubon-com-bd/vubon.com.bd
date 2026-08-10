// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Enabled SSO providers
 */
export const SSO_ENABLED_PROVIDERS = ['google', 'microsoft', 'okta', 'auth0', 'keycloak'] as const;

/**
 * SSO session timeout in seconds (8 hours)
 */
export const SSO_SESSION_TIMEOUT = 28800;

/**
 * SSO token expiry in seconds (1 hour)
 */
export const SSO_TOKEN_EXPIRY = 3600;

/**
 * Default SSO provider
 */
export const SSO_DEFAULT_PROVIDER = 'google';

/**
 * SSO configuration
 */
export const SSO_CONFIG = {
  ENABLED_PROVIDERS: SSO_ENABLED_PROVIDERS,
  SESSION_TIMEOUT: SSO_SESSION_TIMEOUT,
  TOKEN_EXPIRY: SSO_TOKEN_EXPIRY,
  DEFAULT_PROVIDER: SSO_DEFAULT_PROVIDER,
} as const;

/**
 * Type for SSO provider
 */
export type SsoProvider = (typeof SSO_ENABLED_PROVIDERS)[number];

/**
 * Type for SSO configuration
 */
export type SsoConfig = typeof SSO_CONFIG;
