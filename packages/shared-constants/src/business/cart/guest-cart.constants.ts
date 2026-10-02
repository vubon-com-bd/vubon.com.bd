/**
 * Guest Cart Constants
 * @module shared-constants/business/cart
 */
export const GUEST_CART_STATUS = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
  MERGED: 'merged',
  ABANDONED: 'abandoned',
} as const;

export const GUEST_TOKEN_LIMIT = {
  MIN_LENGTH: 16,
  MAX_LENGTH: 128,
  TTL_SECONDS: 604800,
} as const;

export const GUEST_TOKEN = {
  STATUS: GUEST_CART_STATUS,
  LIMIT: GUEST_TOKEN_LIMIT,
} as const;

export type GuestCartStatusType = (typeof GUEST_CART_STATUS)[keyof typeof GUEST_CART_STATUS];
