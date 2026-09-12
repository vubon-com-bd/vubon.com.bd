/**
 * Session Constants
 * @module shared-constants/common/session.constants
 */

export const SESSION = {
  // Session expiry times (in seconds)
  EXPIRY: {
    SHORT: 900, // 15 minutes
    MEDIUM: 3600, // 1 hour
    LONG: 86400, // 24 hours
    EXTRA_LONG: 604800, // 7 days
    REMEMBER_ME: 2592000, // 30 days
    PERSISTENT: 31536000, // 1 year
  },

  // Session refresh times (in seconds)
  REFRESH: {
    SHORT: 300, // 5 minutes
    MEDIUM: 1800, // 30 minutes
    LONG: 7200, // 2 hours
  },

  // Session limits
  LIMITS: {
    MAX_CONCURRENT: 5,
    MAX_IDLE_TIME: 3600, // 1 hour
    MAX_ACTIVE_TIME: 28800, // 8 hours
  },

  // Session storage
  STORAGE: {
    MEMORY: 'memory',
    REDIS: 'redis',
    DATABASE: 'database',
    FILE: 'file',
  } as const,

  // Session security
  SECURITY: {
    REGENERATE_INTERVAL: 1800, // 30 minutes
    IP_CHECK: true,
    USER_AGENT_CHECK: true,
    DEVICE_FINGERPRINT: true,
    ROTATE_KEYS: true,
  },

  // Session state
  STATE: {
    ACTIVE: 'active',
    EXPIRED: 'expired',
    REVOKED: 'revoked',
    INVALID: 'invalid',
    SUSPENDED: 'suspended',
  } as const,

  // Session types
  TYPE: {
    WEB: 'web',
    MOBILE: 'mobile',
    API: 'api',
    ADMIN: 'admin',
    BOT: 'bot',
  } as const,

  // Cookie settings
  COOKIE: {
    HTTP_ONLY: true,
    SECURE: process.env.NODE_ENV === 'production',
    SAME_SITE: 'lax' as const,
    PATH: '/',
    DOMAIN: process.env.SESSION_COOKIE_DOMAIN ?? undefined,
    MAX_AGE: 86400, // 24 hours
  },

  // Token settings
  TOKEN: {
    ACCESS_TOKEN_LENGTH: 64,
    REFRESH_TOKEN_LENGTH: 64,
    ACCESS_TOKEN_EXPIRY: 3600, // 1 hour
    REFRESH_TOKEN_EXPIRY: 604800, // 7 days
  },

  // Device tracking
  DEVICE: {
    TRACK: true,
    MAX_DEVICES: 5,
    UNKNOWN_DEVICE_BLOCK: false,
    NEW_DEVICE_VERIFICATION: true,
  },

  // Location tracking
  LOCATION: {
    TRACK: false,
    REQUIRED_FOR_SENSITIVE_ACTIONS: true,
    IP_GEOLOCATION: true,
  },

  // Activity tracking
  ACTIVITY: {
    TRACK: true,
    LOGIN_HISTORY: true,
    ACTION_HISTORY: true,
    SESSION_HISTORY: true,
    MAX_HISTORY_ENTRIES: 100,
  },

  // Cleanup
  CLEANUP: {
    EXPIRED_SESSION_INTERVAL: 3600, // 1 hour
    MAX_SESSIONS_PER_USER: 10,
    DELETE_EXPIRED_AFTER_DAYS: 30,
  },
} as const;

export type SessionState = (typeof SESSION.STATE)[keyof typeof SESSION.STATE];
export type SessionType = (typeof SESSION.TYPE)[keyof typeof SESSION.TYPE];
export type SessionStorage = (typeof SESSION.STORAGE)[keyof typeof SESSION.STORAGE];
