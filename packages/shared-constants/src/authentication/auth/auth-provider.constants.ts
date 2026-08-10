// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Authentication provider enum
 */
export const AUTH_PROVIDER = {
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
  GITHUB: 'github',
  APPLE: 'apple',
  MICROSOFT: 'microsoft',
  TWITTER: 'twitter',
} as const;

/**
 * Google authentication provider
 */
export const GOOGLE = AUTH_PROVIDER.GOOGLE;

/**
 * Facebook authentication provider
 */
export const FACEBOOK = AUTH_PROVIDER.FACEBOOK;

/**
 * GitHub authentication provider
 */
export const GITHUB = AUTH_PROVIDER.GITHUB;

/**
 * Apple authentication provider
 */
export const APPLE = AUTH_PROVIDER.APPLE;

/**
 * Microsoft authentication provider
 */
export const MICROSOFT = AUTH_PROVIDER.MICROSOFT;

/**
 * Twitter authentication provider
 */
export const TWITTER = AUTH_PROVIDER.TWITTER;

/**
 * Type for authentication provider
 */
export type AuthProvider = (typeof AUTH_PROVIDER)[keyof typeof AUTH_PROVIDER];
