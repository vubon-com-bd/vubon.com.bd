/**
 * Session Constants
 * সেশন সম্পর্কিত সাধারণ কনস্ট্যান্টস
 */

export const SESSION = {
  // Session types
  TYPES: {
    WEB: 'web',
    MOBILE: 'mobile',
    API: 'api',
    WEBHOOK: 'webhook',
    SERVICE: 'service',
  },

  // Session status
  STATUS: {
    ACTIVE: 'active',
    EXPIRED: 'expired',
    TERMINATED: 'terminated',
    REVOKED: 'revoked',
    PENDING: 'pending',
    INACTIVE: 'inactive',
  },

  // Session events
  EVENTS: {
    CREATED: 'session_created',
    UPDATED: 'session_updated',
    EXPIRED: 'session_expired',
    TERMINATED: 'session_terminated',
    REVOKED: 'session_revoked',
    REFRESHED: 'session_refreshed',
  },

  // Default values
  DEFAULTS: {
    MAX_SESSIONS: 5,
    IDLE_TIMEOUT: 1800, // 30 minutes
    ABSOLUTE_TIMEOUT: 28800, // 8 hours
    EXTEND_ON_ACTIVITY: true,
  },
} as const;

export type SessionType = (typeof SESSION.TYPES)[keyof typeof SESSION.TYPES];
export type SessionStatus = (typeof SESSION.STATUS)[keyof typeof SESSION.STATUS];
export type SessionEvent = (typeof SESSION.EVENTS)[keyof typeof SESSION.EVENTS];
