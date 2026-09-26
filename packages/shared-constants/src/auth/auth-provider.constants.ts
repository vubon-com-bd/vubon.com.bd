export const AUTH_PROVIDER = {
  LOCAL: 'local',
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
  APPLE: 'apple',
  GITHUB: 'github',
  MICROSOFT: 'microsoft',
  TWITTER: 'twitter',
  LINKEDIN: 'linkedin',
  CUSTOM: 'custom',
} as const;

export type AuthProviderType = (typeof AUTH_PROVIDER)[keyof typeof AUTH_PROVIDER];
