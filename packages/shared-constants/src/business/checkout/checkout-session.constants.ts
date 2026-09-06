/**
 * Checkout Session Constants (EXTENDS common/status)
 * @module shared-constants/business/checkout/checkout-session.constants
 */

import { STATUS } from '../../common/status.constants';

export const CHECKOUT_SESSION = {
  // Base status from common
  STATUS: STATUS,

  // Session specific
  SESSION_TIMEOUT_MINUTES: 30,
  SESSION_MAX_ATTEMPTS: 3,
  SESSION_CACHE_TTL: 3600,

  // Session status
  CHECKOUT_SESSION_STATUS: {
    ACTIVE: 'active',
    EXPIRED: 'expired',
    COMPLETED: 'completed',
    ABANDONED: 'abandoned',
    TERMINATED: 'terminated',
    LOCKED: 'locked',
  } as const,

  // Session type
  CHECKOUT_SESSION_TYPE: {
    REGULAR: 'regular',
    GUEST: 'guest',
    EXPRESS: 'express',
    BULK: 'bulk',
  } as const,

  // Session validation
  CHECKOUT_SESSION_VALIDATION: {
    REQUIRES_AUTH: false,
    REQUIRES_DEVICE: true,
    REQUIRES_IP: true,
    REQUIRES_USER_AGENT: true,
    ALLOW_MULTIPLE: false,
  } as const,
} as const;

export type CheckoutSessionStatus =
  (typeof CHECKOUT_SESSION.CHECKOUT_SESSION_STATUS)[keyof typeof CHECKOUT_SESSION.CHECKOUT_SESSION_STATUS];
export type CheckoutSessionType =
  (typeof CHECKOUT_SESSION.CHECKOUT_SESSION_TYPE)[keyof typeof CHECKOUT_SESSION.CHECKOUT_SESSION_TYPE];

export const CHECKOUT_SESSION_STATUS_LABELS: Record<CheckoutSessionStatus, string> = {
  active: 'Active',
  expired: 'Expired',
  completed: 'Completed',
  abandoned: 'Abandoned',
  terminated: 'Terminated',
  locked: 'Locked',
};

export const CHECKOUT_SESSION_STATUS_COLORS: Record<CheckoutSessionStatus, string> = {
  active: '#22c55e',
  expired: '#9ca3af',
  completed: '#22c55e',
  abandoned: '#ef4444',
  terminated: '#dc2626',
  locked: '#dc2626',
};
