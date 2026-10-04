export const SESSION = {
  EXPIRY_SECONDS: 86400,
  EXPIRY_REMEMBER_SECONDS: 2592000,
  IDLE_TIMEOUT_SECONDS: 1800,
  ABSOLUTE_TIMEOUT_SECONDS: 604800,
  REFRESH_THRESHOLD_SECONDS: 300,
  MAX_SESSIONS_PER_USER: 5,
  MAX_DEVICES_PER_USER: 10,
  CLEANUP_INTERVAL_SECONDS: 3600,
} as const;

export const SESSION_STORAGE = {
  MEMORY: 'memory',
  REDIS: 'redis',
  DATABASE: 'database',
  COOKIE: 'cookie',
} as const;

export const SESSION_STATUS = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
  REVOKED: 'revoked',
  IDLE: 'idle',
} as const;

export const SESSION_COOKIE = {
  NAME: 'sid',
  HTTP_ONLY: true,
  SECURE: true,
  SAME_SITE_STRICT: 'strict',
  SAME_SITE_LAX: 'lax',
  PATH: '/',
} as const;

export type SessionStatusType = (typeof SESSION_STATUS)[keyof typeof SESSION_STATUS];
export type SessionStorageType = (typeof SESSION_STORAGE)[keyof typeof SESSION_STORAGE];
