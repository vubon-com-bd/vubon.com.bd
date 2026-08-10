// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * OAuth provider enum
 */
export const OAUTH_PROVIDER = {
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
  GITHUB: 'github',
  MICROSOFT: 'microsoft',
  TWITTER: 'twitter',
  LINKEDIN: 'linkedin',
} as const;

/**
 * Google OAuth provider
 */
export const OAUTH_PROVIDER_GOOGLE = OAUTH_PROVIDER.GOOGLE;

/**
 * Facebook OAuth provider
 */
export const OAUTH_PROVIDER_FACEBOOK = OAUTH_PROVIDER.FACEBOOK;

/**
 * GitHub OAuth provider
 */
export const OAUTH_PROVIDER_GITHUB = OAUTH_PROVIDER.GITHUB;

/**
 * Microsoft OAuth provider
 */
export const OAUTH_PROVIDER_MICROSOFT = OAUTH_PROVIDER.MICROSOFT;

/**
 * Twitter OAuth provider
 */
export const OAUTH_PROVIDER_TWITTER = OAUTH_PROVIDER.TWITTER;

/**
 * LinkedIn OAuth provider
 */
export const OAUTH_PROVIDER_LINKEDIN = OAUTH_PROVIDER.LINKEDIN;

/**
 * Type for OAuth provider
 */
export type OAuthProviderEnum = (typeof OAUTH_PROVIDER)[keyof typeof OAUTH_PROVIDER];
