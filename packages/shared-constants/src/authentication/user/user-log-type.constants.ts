// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * User log type enum
 */
export const USER_LOG_TYPE = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  DEBUG: 'debug',
  CRITICAL: 'critical',
  AUDIT: 'audit',
  SECURITY: 'security',
  PERFORMANCE: 'performance',
} as const;

/**
 * Informational log type
 */
export const USER_LOG_TYPE_INFO = USER_LOG_TYPE.INFO;

/**
 * Warning log type
 */
export const USER_LOG_TYPE_WARNING = USER_LOG_TYPE.WARNING;

/**
 * Error log type
 */
export const USER_LOG_TYPE_ERROR = USER_LOG_TYPE.ERROR;

/**
 * Debug log type
 */
export const USER_LOG_TYPE_DEBUG = USER_LOG_TYPE.DEBUG;

/**
 * Critical log type
 */
export const USER_LOG_TYPE_CRITICAL = USER_LOG_TYPE.CRITICAL;

/**
 * Audit log type
 */
export const USER_LOG_TYPE_AUDIT = USER_LOG_TYPE.AUDIT;

/**
 * Security log type
 */
export const USER_LOG_TYPE_SECURITY = USER_LOG_TYPE.SECURITY;

/**
 * Performance log type
 */
export const USER_LOG_TYPE_PERFORMANCE = USER_LOG_TYPE.PERFORMANCE;

/**
 * Type for user log type
 */
export type UserLogTypeEnum = (typeof USER_LOG_TYPE)[keyof typeof USER_LOG_TYPE];
