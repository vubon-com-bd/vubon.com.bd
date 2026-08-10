// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Session maximum age in seconds (7 days)
 */
export const SESSION_MAX_AGE = 604800;

/**
 * Session refresh threshold in seconds (1 day before expiry)
 */
export const SESSION_REFRESH_THRESHOLD = 86400;

/**
 * Session cookie name
 */
export const SESSION_COOKIE_NAME = 'vubon_session';

/**
 * Maximum number of devices allowed per session
 */
export const SESSION_MAX_DEVICES = 5;

/**
 * SameSite policy for session cookie
 */
export const SESSION_SAME_SITE = 'lax' as const;

/**
 * Secure flag for session cookie
 */
export const SESSION_SECURE = true;

/**
 * Session cookie options
 */
export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: SESSION_SECURE,
  sameSite: SESSION_SAME_SITE,
  maxAge: SESSION_MAX_AGE,
  path: '/',
} as const;

/**
 * Type for SameSite policy
 */
export type SessionSameSite = typeof SESSION_SAME_SITE;

/**
 * Type for session cookie options
 */
export type SessionCookieOptions = typeof SESSION_COOKIE_OPTIONS;
