/**
 * Auth SSO Constants
 * @module shared-constants/auth/auth-sso
 *
 * Note: Values overlap with AUTH_PROVIDER (saml, oidc) by intent —
 * SSO protocol names vs provider names. Kept separate for semantic clarity.
 */

export const AUTH_SSO = {
  SAML: 'saml',
  OIDC: 'oidc',
  CAS: 'cas',
  OAUTH2: 'oauth2',
} as const;

export type AuthSsoProvider = (typeof AUTH_SSO)[keyof typeof AUTH_SSO];
