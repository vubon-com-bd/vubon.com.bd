/**
 * Auth Social Constants
 * @module shared-constants/auth/auth-social
 */

export const AUTH_SOCIAL = {
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
  TWITTER: 'twitter',
  GITHUB: 'github',
  LINKEDIN: 'linkedin',
  APPLE: 'apple',
  MICROSOFT: 'microsoft',
} as const;

export type AuthSocialProvider = (typeof AUTH_SOCIAL)[keyof typeof AUTH_SOCIAL];
