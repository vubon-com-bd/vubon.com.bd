/**
 * Cart Guest Constants (EXTENDS common/status)
 * @module shared-constants/business/cart/cart-guest.constants
 */

import { STATUS } from '../../common/status.constants';

export const CART_GUEST = {
  // Base status from common
  STATUS: STATUS,

  // Guest cart specific
  GUEST_CART_EXPIRY_HOURS: 24,
  GUEST_CART_MAX_ITEMS: 20,
  GUEST_CART_CACHE_TTL: 3600,
  GUEST_SESSION_TIMEOUT: 3600, // 1 hour

  // Guest cart status
  GUEST_CART_STATUS: {
    ACTIVE: 'active',
    CONVERTED: 'converted',
    EXPIRED: 'expired',
    ABANDONED: 'abandoned',
    MERGED: 'merged',
    REMOVED: 'removed',
  } as const,

  // Guest conversion
  GUEST_CART_CONVERSION: {
    CONVERTED_TO_USER: 'converted_to_user',
    CONVERTED_TO_ORDER: 'converted_to_order',
    MERGED_WITH_USER: 'merged_with_user',
    PENDING: 'pending',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
  } as const,

  // Guest cart limits
  GUEST_CART_LIMITS: {
    MAX_ITEMS: 20,
    MAX_QUANTITY_PER_ITEM: 10,
    MAX_TOTAL_AMOUNT: 50000,
    MAX_DAYS_ACTIVE: 7,
  } as const,

  // Guest cart validation
  GUEST_CART_VALIDATION: {
    REQUIRES_EMAIL: true,
    REQUIRES_PHONE: false,
    ALLOWS_MULTIPLE_SESSIONS: true,
    ALLOWS_CART_PERSISTENCE: true,
  } as const,
} as const;

export type GuestCartStatus =
  (typeof CART_GUEST.GUEST_CART_STATUS)[keyof typeof CART_GUEST.GUEST_CART_STATUS];
export type GuestCartConversion =
  (typeof CART_GUEST.GUEST_CART_CONVERSION)[keyof typeof CART_GUEST.GUEST_CART_CONVERSION];

export const GUEST_CART_STATUS_LABELS: Record<GuestCartStatus, string> = {
  [CART_GUEST.GUEST_CART_STATUS.ACTIVE]: 'Active',
  [CART_GUEST.GUEST_CART_STATUS.CONVERTED]: 'Converted',
  [CART_GUEST.GUEST_CART_STATUS.EXPIRED]: 'Expired',
  [CART_GUEST.GUEST_CART_STATUS.ABANDONED]: 'Abandoned',
  [CART_GUEST.GUEST_CART_STATUS.MERGED]: 'Merged',
  [CART_GUEST.GUEST_CART_STATUS.REMOVED]: 'Removed',
};

export const GUEST_CART_STATUS_COLORS: Record<GuestCartStatus, string> = {
  [CART_GUEST.GUEST_CART_STATUS.ACTIVE]: '#22c55e',
  [CART_GUEST.GUEST_CART_STATUS.CONVERTED]: '#22c55e',
  [CART_GUEST.GUEST_CART_STATUS.EXPIRED]: '#9ca3af',
  [CART_GUEST.GUEST_CART_STATUS.ABANDONED]: '#ef4444',
  [CART_GUEST.GUEST_CART_STATUS.MERGED]: '#8b5cf6',
  [CART_GUEST.GUEST_CART_STATUS.REMOVED]: '#ef4444',
};
