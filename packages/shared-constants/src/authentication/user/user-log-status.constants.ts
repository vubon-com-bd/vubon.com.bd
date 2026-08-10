// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * User log status enum
 */
export const USER_LOG_STATUS = {
  READ: 'read',
  UNREAD: 'unread',
  ARCHIVED: 'archived',
  DELETED: 'deleted',
  PENDING: 'pending',
  PROCESSED: 'processed',
} as const;

/**
 * Log has been read
 */
export const USER_LOG_STATUS_READ = USER_LOG_STATUS.READ;

/**
 * Log has not been read
 */
export const USER_LOG_STATUS_UNREAD = USER_LOG_STATUS.UNREAD;

/**
 * Log has been archived
 */
export const USER_LOG_STATUS_ARCHIVED = USER_LOG_STATUS.ARCHIVED;

/**
 * Log has been deleted
 */
export const USER_LOG_STATUS_DELETED = USER_LOG_STATUS.DELETED;

/**
 * Log is pending
 */
export const USER_LOG_STATUS_PENDING = USER_LOG_STATUS.PENDING;

/**
 * Log has been processed
 */
export const USER_LOG_STATUS_PROCESSED = USER_LOG_STATUS.PROCESSED;

/**
 * Type for user log status
 */
export type UserLogStatus = (typeof USER_LOG_STATUS)[keyof typeof USER_LOG_STATUS];
