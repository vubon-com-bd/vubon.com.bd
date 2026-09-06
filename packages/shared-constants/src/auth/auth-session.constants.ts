/**
 * Auth Session Constants (EXTENDS common/session)
 * @module shared-constants/auth/auth-session.constants
 */

import { SESSION } from '../common/session.constants';

export const AUTH_SESSION = {
  // Base session from common
  ...SESSION,

  // Auth session specific
  AUTH_SESSION_PREFIX: 'auth:session:',
  AUTH_SESSION_MAX_CONCURRENT: 5,
  AUTH_SESSION_REFRESH_INTERVAL: 300, // 5 minutes
  AUTH_SESSION_CLEANUP_INTERVAL: 3600, // 1 hour
  AUTH_SESSION_MAX_IDLE_TIME: 1800, // 30 minutes
  AUTH_SESSION_MAX_LIFETIME: 28800, // 8 hours

  // Auth session types
  AUTH_SESSION_TYPE: {
    WEB: 'web',
    MOBILE: 'mobile',
    API: 'api',
    ADMIN: 'admin',
    SERVICE: 'service',
    BOT: 'bot',
  } as const,

  // Auth session status
  AUTH_SESSION_STATUS: {
    ACTIVE: 'active',
    EXPIRED: 'expired',
    REVOKED: 'revoked',
    INVALID: 'invalid',
    SUSPENDED: 'suspended',
    TERMINATED: 'terminated',
  } as const,
} as const;

export type AuthSessionType =
  (typeof AUTH_SESSION.AUTH_SESSION_TYPE)[keyof typeof AUTH_SESSION.AUTH_SESSION_TYPE];
export type AuthSessionStatus =
  (typeof AUTH_SESSION.AUTH_SESSION_STATUS)[keyof typeof AUTH_SESSION.AUTH_SESSION_STATUS];
