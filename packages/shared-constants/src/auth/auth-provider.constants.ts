/**
 * Auth Provider Constants
 * @module shared-constants/auth/auth-provider
 */

export const AUTH_PROVIDER = {
  LOCAL: 'local',
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
  TWITTER: 'twitter',
  GITHUB: 'github',
  LINKEDIN: 'linkedin',
  APPLE: 'apple',
  MICROSOFT: 'microsoft',
  SAML: 'saml',
  OIDC: 'oidc',
} as const;

export type AuthProviderValue = (typeof AUTH_PROVIDER)[keyof typeof AUTH_PROVIDER];
