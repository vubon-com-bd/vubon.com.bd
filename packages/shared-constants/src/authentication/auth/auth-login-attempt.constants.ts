// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Maximum number of failed login attempts before counter resets
 */
export const LOGIN_ATTEMPT_MAX_FAILED = 5;

/**
 * Time window for counter reset in minutes (15 minutes)
 */
export const LOGIN_ATTEMPT_WINDOW = 15;

/**
 * Maximum number of login history entries to store
 */
export const LOGIN_ATTEMPT_MAX_HISTORY = 50;

/**
 * Block duration for suspicious activity in minutes (60 minutes)
 */
export const LOGIN_ATTEMPT_BLOCK_DURATION = 60;

/**
 * Threshold for marking activity as suspicious (10 attempts)
 */
export const LOGIN_ATTEMPT_SUSPICIOUS_THRESHOLD = 10;

/**
 * Login attempt configuration
 */
export const LOGIN_ATTEMPT_CONFIG = {
  MAX_FAILED: LOGIN_ATTEMPT_MAX_FAILED,
  WINDOW: LOGIN_ATTEMPT_WINDOW,
  MAX_HISTORY: LOGIN_ATTEMPT_MAX_HISTORY,
  BLOCK_DURATION: LOGIN_ATTEMPT_BLOCK_DURATION,
  SUSPICIOUS_THRESHOLD: LOGIN_ATTEMPT_SUSPICIOUS_THRESHOLD,
} as const;

/**
 * Type for login attempt configuration
 */
export type LoginAttemptConfig = typeof LOGIN_ATTEMPT_CONFIG;
