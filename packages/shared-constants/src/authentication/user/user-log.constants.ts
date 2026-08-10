// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Maximum log history entries per user
 */
export const USER_LOG_MAX_HISTORY = 1000;

/**
 * Log retention period in days (30 days)
 */
export const USER_LOG_RETENTION_DAYS = 30;

/**
 * Batch size for processing logs
 */
export const USER_LOG_BATCH_SIZE = 100;

/**
 * Supported log levels
 */
export const USER_LOG_LEVELS = ['error', 'warn', 'info', 'debug', 'trace'] as const;

/**
 * Paths to exclude from logging
 */
export const USER_LOG_EXCLUDE_PATHS = [
  '/health',
  '/ping',
  '/metrics',
  '/static/*',
  '/assets/*',
  '/favicon.ico',
  '/robots.txt',
] as const;

/**
 * User log configuration
 */
export const USER_LOG_CONFIG = {
  MAX_HISTORY: USER_LOG_MAX_HISTORY,
  RETENTION_DAYS: USER_LOG_RETENTION_DAYS,
  BATCH_SIZE: USER_LOG_BATCH_SIZE,
  LEVELS: USER_LOG_LEVELS,
  EXCLUDE_PATHS: USER_LOG_EXCLUDE_PATHS,
} as const;

/**
 * Type for log level
 */
export type UserLogLevel = (typeof USER_LOG_LEVELS)[number];

/**
 * Type for log exclude path
 */
export type UserLogExcludePath = (typeof USER_LOG_EXCLUDE_PATHS)[number];

/**
 * Type for user log configuration
 */
export type UserLogConfig = typeof USER_LOG_CONFIG;
