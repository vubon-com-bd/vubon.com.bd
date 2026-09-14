/**
 * Auth Provider Constants
 * @module shared-constants/auth/auth-provider
 *
 * Note: References AUTH_SOCIAL and AUTH_SSO values where they overlap —
 * single source of truth per literal. LOCAL/SAML/OIDC are provider-level
 * entries distinct from social/SSO protocol names.
 */

import { AUTH_SOCIAL } from './auth-social.constants';
import { AUTH_SSO } from './auth-sso.constants';

export const AUTH_PROVIDER = {
  LOCAL: 'local',

  // Referenced from AUTH_SOCIAL (avoid duplication)
  GOOGLE: AUTH_SOCIAL.GOOGLE,
  FACEBOOK: AUTH_SOCIAL.FACEBOOK,
  TWITTER: AUTH_SOCIAL.TWITTER,
  GITHUB: AUTH_SOCIAL.GITHUB,
  LINKEDIN: AUTH_SOCIAL.LINKEDIN,
  APPLE: AUTH_SOCIAL.APPLE,
  MICROSOFT: AUTH_SOCIAL.MICROSOFT,

  // Referenced from AUTH_SSO
  SAML: AUTH_SSO.SAML,
  OIDC: AUTH_SSO.OIDC,
} as const;

export type AuthProviderValue =
  (typeof AUTH_PROVIDER)[keyof typeof AUTH_PROVIDER];
