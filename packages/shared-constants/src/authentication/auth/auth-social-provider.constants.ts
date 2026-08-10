// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Social provider enum
 */
export const SOCIAL_PROVIDER = {
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
  GITHUB: 'github',
  APPLE: 'apple',
  MICROSOFT: 'microsoft',
  TWITTER: 'twitter',
  LINKEDIN: 'linkedin',
  INSTAGRAM: 'instagram',
} as const;

/**
 * Google social provider
 */
export const SOCIAL_PROVIDER_GOOGLE = SOCIAL_PROVIDER.GOOGLE;

/**
 * Facebook social provider
 */
export const SOCIAL_PROVIDER_FACEBOOK = SOCIAL_PROVIDER.FACEBOOK;

/**
 * GitHub social provider
 */
export const SOCIAL_PROVIDER_GITHUB = SOCIAL_PROVIDER.GITHUB;

/**
 * Apple social provider
 */
export const SOCIAL_PROVIDER_APPLE = SOCIAL_PROVIDER.APPLE;

/**
 * Microsoft social provider
 */
export const SOCIAL_PROVIDER_MICROSOFT = SOCIAL_PROVIDER.MICROSOFT;

/**
 * Twitter social provider
 */
export const SOCIAL_PROVIDER_TWITTER = SOCIAL_PROVIDER.TWITTER;

/**
 * LinkedIn social provider
 */
export const SOCIAL_PROVIDER_LINKEDIN = SOCIAL_PROVIDER.LINKEDIN;

/**
 * Instagram social provider
 */
export const SOCIAL_PROVIDER_INSTAGRAM = SOCIAL_PROVIDER.INSTAGRAM;

/**
 * Type for social provider
 */
export type SocialProviderEnum = (typeof SOCIAL_PROVIDER)[keyof typeof SOCIAL_PROVIDER];
