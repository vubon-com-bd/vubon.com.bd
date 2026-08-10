// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Enabled social providers
 */
export const SOCIAL_ENABLED_PROVIDERS = [
  'google',
  'facebook',
  'github',
  'apple',
  'microsoft',
  'twitter',
] as const;

/**
 * Default social provider
 */
export const SOCIAL_DEFAULT_PROVIDER = 'google';

/**
 * Social callback timeout in seconds (30 seconds)
 */
export const SOCIAL_CALLBACK_TIMEOUT = 30;

/**
 * Social state expiry in seconds (10 minutes)
 */
export const SOCIAL_STATE_EXPIRY = 600;

/**
 * Default social scopes
 */
export const SOCIAL_SCOPES = {
  google: ['profile', 'email'],
  facebook: ['public_profile', 'email'],
  github: ['read:user', 'user:email'],
  apple: ['name', 'email'],
  microsoft: ['User.Read', 'offline_access'],
  twitter: ['users.read', 'tweet.read'],
} as const;

/**
 * Social configuration
 */
export const SOCIAL_CONFIG = {
  ENABLED_PROVIDERS: SOCIAL_ENABLED_PROVIDERS,
  DEFAULT_PROVIDER: SOCIAL_DEFAULT_PROVIDER,
  CALLBACK_TIMEOUT: SOCIAL_CALLBACK_TIMEOUT,
  STATE_EXPIRY: SOCIAL_STATE_EXPIRY,
  SCOPES: SOCIAL_SCOPES,
} as const;

/**
 * Type for social provider
 */
export type SocialProvider = (typeof SOCIAL_ENABLED_PROVIDERS)[number];

/**
 * Type for social scopes
 */
export type SocialScopes = typeof SOCIAL_SCOPES;

/**
 * Type for social configuration
 */
export type SocialConfig = typeof SOCIAL_CONFIG;
