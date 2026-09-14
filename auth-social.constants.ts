/**
 * Auth Social Constants
 * @module shared-constants/auth/auth-social
 *
 * Note: Values overlap with AUTH_PROVIDER (google, facebook, ...) by intent —
 * social login providers vs general auth providers. Kept separate for
 * semantic clarity; consider deriving from AUTH_PROVIDER if they stay in sync.
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
