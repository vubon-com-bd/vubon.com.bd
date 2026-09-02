/**
 * Auth Session Constants
 * প্রমাণীকরণ সেশন সম্পর্কিত কনস্ট্যান্টস
 */

import { AUTH } from './auth.constants';

export const AUTH_SESSION = {
  ...AUTH.SESSION,

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

export type AuthSessionStatus = (typeof AUTH_SESSION.STATUS)[keyof typeof AUTH_SESSION.STATUS];
export type AuthSessionEvent = (typeof AUTH_SESSION.EVENTS)[keyof typeof AUTH_SESSION.EVENTS];
