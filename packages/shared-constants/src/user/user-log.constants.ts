/**
 * User Log Constants
 * @module shared-constants/user/user-log
 */

export const USER_LOG = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  DEBUG: 'debug',
  AUDIT: 'audit',
} as const;

export type UserLogType = (typeof USER_LOG)[keyof typeof USER_LOG];
