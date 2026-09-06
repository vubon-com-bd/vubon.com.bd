/**
 * Admin Session Constants (EXTENDS common/session)
 * @module shared-constants/admin/admin-session.constants
 */

import { SESSION } from '../common/session.constants';

export const ADMIN_SESSION = {
  // Base session from common
  ...SESSION,

  // Admin session specific
  ADMIN_SESSION_PREFIX: 'admin:session:',
  ADMIN_SESSION_MAX_CONCURRENT: 3,
  ADMIN_SESSION_REFRESH_INTERVAL: 600, // 10 minutes
  ADMIN_SESSION_CLEANUP_INTERVAL: 1800, // 30 minutes
  ADMIN_SESSION_MAX_IDLE_TIME: 1800, // 30 minutes
  ADMIN_SESSION_MAX_LIFETIME: 28800, // 8 hours
  ADMIN_SESSION_EXTENDED_LIFETIME: 43200, // 12 hours
  ADMIN_SESSION_REMEMBER_ME_DAYS: 7,

  // Admin session types
  ADMIN_SESSION_TYPE: {
    WEB: 'web',
    MOBILE: 'mobile',
    API: 'api',
    ADMIN: 'admin',
    SERVICE: 'service',
    BOT: 'bot',
    SYSTEM: 'system',
    MAINTENANCE: 'maintenance',
  } as const,

  // Admin session status
  ADMIN_SESSION_STATUS: {
    ACTIVE: 'active',
    EXPIRED: 'expired',
    REVOKED: 'revoked',
    INVALID: 'invalid',
    SUSPENDED: 'suspended',
    TERMINATED: 'terminated',
    LOCKED: 'locked',
    COMPROMISED: 'compromised',
  } as const,

  // Admin session security
  SECURITY: {
    REGENERATE_INTERVAL: 600, // 10 minutes
    IP_CHECK: true,
    USER_AGENT_CHECK: true,
    DEVICE_FINGERPRINT: true,
    ROTATE_KEYS: true,
    REQUIRE_2FA: true,
    REQUIRE_IP_WHITELIST: false,
    SESSION_LOGGING: true,
    ACTIVITY_MONITORING: true,
  },

  // Admin session limits
  LIMITS: {
    MAX_CONCURRENT_SESSIONS: 3,
    MAX_IDLE_TIME: 1800,
    MAX_ACTIVE_TIME: 28800,
    MAX_SESSIONS_PER_ADMIN: 5,
    SESSION_TIMEOUT: 3600,
    REMEMBER_ME_TIMEOUT: 604800,
  },

  // Admin session tracking
  TRACKING: {
    TRACK_IP: true,
    TRACK_DEVICE: true,
    TRACK_LOCATION: true,
    TRACK_USER_AGENT: true,
    TRACK_ACTIVITIES: true,
    TRACK_PERFORMANCE: true,
    MAX_HISTORY: 100,
    RETENTION_DAYS: 90,
  },

  // Admin session cleanup
  CLEANUP: {
    EXPIRED_SESSION_INTERVAL: 1800,
    MAX_SESSIONS_PER_ADMIN: 5,
    DELETE_EXPIRED_AFTER_DAYS: 30,
    DELETE_SUSPENDED_AFTER_DAYS: 7,
    DELETE_COMPROMISED_IMMEDIATELY: true,
  },
} as const;

// Use unique type names
export type AdminSessionType =
  (typeof ADMIN_SESSION.ADMIN_SESSION_TYPE)[keyof typeof ADMIN_SESSION.ADMIN_SESSION_TYPE];
export type AdminSessionStatus =
  (typeof ADMIN_SESSION.ADMIN_SESSION_STATUS)[keyof typeof ADMIN_SESSION.ADMIN_SESSION_STATUS];
export type AdminSessionSecurity =
  (typeof ADMIN_SESSION.SECURITY)[keyof typeof ADMIN_SESSION.SECURITY];
export type AdminSessionLimit = (typeof ADMIN_SESSION.LIMITS)[keyof typeof ADMIN_SESSION.LIMITS];
