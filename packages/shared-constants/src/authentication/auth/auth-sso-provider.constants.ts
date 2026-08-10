// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * SSO provider enum
 */
export const SSO_PROVIDER = {
  GOOGLE: 'google',
  MICROSOFT: 'microsoft',
  OKTA: 'okta',
  AUTH0: 'auth0',
  KEYCLOAK: 'keycloak',
  PING: 'ping',
  FORGEOK: 'forgeok',
  SAML: 'saml',
} as const;

/**
 * Google SSO provider
 */
export const SSO_PROVIDER_GOOGLE = SSO_PROVIDER.GOOGLE;

/**
 * Microsoft SSO provider
 */
export const SSO_PROVIDER_MICROSOFT = SSO_PROVIDER.MICROSOFT;

/**
 * Okta SSO provider
 */
export const SSO_PROVIDER_OKTA = SSO_PROVIDER.OKTA;

/**
 * Auth0 SSO provider
 */
export const SSO_PROVIDER_AUTH0 = SSO_PROVIDER.AUTH0;

/**
 * Keycloak SSO provider
 */
export const SSO_PROVIDER_KEYCLOAK = SSO_PROVIDER.KEYCLOAK;

/**
 * Ping Identity SSO provider
 */
export const SSO_PROVIDER_PING = SSO_PROVIDER.PING;

/**
 * ForgeRock SSO provider
 */
export const SSO_PROVIDER_FORGEOK = SSO_PROVIDER.FORGEOK;

/**
 * SAML SSO provider
 */
export const SSO_PROVIDER_SAML = SSO_PROVIDER.SAML;

/**
 * Type for SSO provider
 */
export type SsoProviderEnum = (typeof SSO_PROVIDER)[keyof typeof SSO_PROVIDER];
