export const USER_LOG_LEVEL = {
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
  DEBUG: 'debug',
} as const;

export const USER_LOG_TYPE = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  SECURITY: 'security',
  ACTIVITY: 'activity',
  ERROR: 'error',
  AUDIT: 'audit',
} as const;

export const USER_LOG = {
  RETENTION_DAYS: 90,
  MAX_ENTRIES_PER_USER: 10000,
  TRACK_IP: true,
  TRACK_DEVICE: true,
  TRACK_USER_AGENT: true,
} as const;

export type UserLogLevelType = (typeof USER_LOG_LEVEL)[keyof typeof USER_LOG_LEVEL];
export type UserLogTypeType = (typeof USER_LOG_TYPE)[keyof typeof USER_LOG_TYPE];
