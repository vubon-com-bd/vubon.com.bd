/**
 * Admin Session Constants
 * অ্যাডমিন সেশন সম্পর্কিত কনস্ট্যান্টস
 */

import { SESSION } from '../common';

export const ADMIN_SESSION = {
  ...SESSION,

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
    MAX_SESSIONS: 10,
    IDLE_TIMEOUT: 1800,
    ABSOLUTE_TIMEOUT: 28800,
    EXTEND_ON_ACTIVITY: true,
  },
} as const;

export type AdminSessionStatus = (typeof ADMIN_SESSION.STATUS)[keyof typeof ADMIN_SESSION.STATUS];
export type AdminSessionEvent = (typeof ADMIN_SESSION.EVENTS)[keyof typeof ADMIN_SESSION.EVENTS];
