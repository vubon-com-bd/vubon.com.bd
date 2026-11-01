export const AUTH_SOCIAL = {
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
  APPLE: 'apple',
  GITHUB: 'github',
  LINKEDIN: 'linkedin',
  TWITTER: 'twitter',
  MICROSOFT: 'microsoft',
} as const;

export const AUTH_SOCIAL_SCOPE = {
  GOOGLE: 'openid email profile',
  FACEBOOK: 'email public_profile',
  APPLE: 'name email',
  GITHUB: 'user:email',
  LINKEDIN: 'r_liteprofile r_emailaddress',
  TWITTER: 'users.read tweet.read',
  MICROSOFT: 'openid email profile',
} as const;

export type AuthSocialType = (typeof AUTH_SOCIAL)[keyof typeof AUTH_SOCIAL];
