/**
 * Auth Type Constants
 * @module shared-constants/auth/auth-type
 *
 * Note: Deliberately does NOT spread COMMON_TYPES — the enum should
 * contain only auth-type values, not primitive type names.
 */

export const AUTH_TYPES = {
  PASSWORD: 'password',
  OTP: 'otp',
  MAGIC_LINK: 'magic_link',
  SOCIAL: 'social',
  SSO: 'sso',
  BIOMETRIC: 'biometric',
  API_KEY: 'api_key',
  OAUTH: 'oauth',
} as const;

export type AuthTypeValue = (typeof AUTH_TYPES)[keyof typeof AUTH_TYPES];
