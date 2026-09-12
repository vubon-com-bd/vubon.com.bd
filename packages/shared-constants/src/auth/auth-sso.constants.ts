/**
 * Auth SSO Constants
 * @module shared-constants/auth/auth-sso
 */

export const AUTH_SSO = {
  SAML: 'saml',
  OIDC: 'oidc',
  CAS: 'cas',
  OAUTH2: 'oauth2',
} as const;

export type AuthSsoProvider = (typeof AUTH_SSO)[keyof typeof AUTH_SSO];
