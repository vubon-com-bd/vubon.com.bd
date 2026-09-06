/**
 * Cart Status Constants (EXTENDS common/status)
 * @module shared-constants/business/cart/cart-status.constants
 */

import { STATUS } from '../../common/status.constants';

export const CART_STATUS = {
  // Base status from common
  ...STATUS,

  // Cart specific status - using string literals directly
  CART_ACTIVE: 'cart_active',
  CART_INACTIVE: 'cart_inactive',
  CART_PENDING: 'cart_pending',
  CART_ABANDONED: 'cart_abandoned',
  CART_CONVERTED: 'cart_converted',
  CART_EXPIRED: 'cart_expired',
  CART_MERGED: 'cart_merged',
  CART_SPLIT: 'cart_split',
  CART_LOCKED: 'cart_locked',
  CART_RESTORED: 'cart_restored',
  CART_ARCHIVED: 'cart_archived',
  CART_DELETED: 'cart_deleted',
  CART_RECOVERED: 'cart_recovered',
  CART_PENDING_PAYMENT: 'cart_pending_payment',
  CART_PENDING_CHECKOUT: 'cart_pending_checkout',
  CART_COMPLETED: 'cart_completed',
} as const;

// Define CartStatus as union of all status values
export type CartStatus = (typeof CART_STATUS)[keyof typeof CART_STATUS];

// Define a type for status keys that are not from the base STATUS
export type CartExtendedStatusKey =
  | 'CART_ACTIVE'
  | 'CART_INACTIVE'
  | 'CART_PENDING'
  | 'CART_ABANDONED'
  | 'CART_CONVERTED'
  | 'CART_EXPIRED'
  | 'CART_MERGED'
  | 'CART_SPLIT'
  | 'CART_LOCKED'
  | 'CART_RESTORED'
  | 'CART_ARCHIVED'
  | 'CART_DELETED'
  | 'CART_RECOVERED'
  | 'CART_PENDING_PAYMENT'
  | 'CART_PENDING_CHECKOUT'
  | 'CART_COMPLETED';

// For labels and colors, only include the extended status keys
export const CART_STATUS_LABELS: Record<CartExtendedStatusKey, string> = {
  CART_ACTIVE: 'Cart Active',
  CART_INACTIVE: 'Cart Inactive',
  CART_PENDING: 'Cart Pending',
  CART_ABANDONED: 'Abandoned',
  CART_CONVERTED: 'Converted',
  CART_EXPIRED: 'Expired',
  CART_MERGED: 'Merged',
  CART_SPLIT: 'Split',
  CART_LOCKED: 'Locked',
  CART_RESTORED: 'Restored',
  CART_ARCHIVED: 'Cart Archived',
  CART_DELETED: 'Cart Deleted',
  CART_RECOVERED: 'Recovered',
  CART_PENDING_PAYMENT: 'Pending Payment',
  CART_PENDING_CHECKOUT: 'Pending Checkout',
  CART_COMPLETED: 'Completed',
};

export const CART_STATUS_COLORS: Record<CartExtendedStatusKey, string> = {
  CART_ACTIVE: '#22c55e',
  CART_INACTIVE: '#9ca3af',
  CART_PENDING: '#eab308',
  CART_ABANDONED: '#ef4444',
  CART_CONVERTED: '#22c55e',
  CART_EXPIRED: '#9ca3af',
  CART_MERGED: '#8b5cf6',
  CART_SPLIT: '#8b5cf6',
  CART_LOCKED: '#dc2626',
  CART_RESTORED: '#22c55e',
  CART_ARCHIVED: '#6b7280',
  CART_DELETED: '#ef4444',
  CART_RECOVERED: '#22c55e',
  CART_PENDING_PAYMENT: '#eab308',
  CART_PENDING_CHECKOUT: '#eab308',
  CART_COMPLETED: '#22c55e',
};

export const CART_STATUS_GROUPS = {
  ACTIVE: [
    CART_STATUS.ACTIVE,
    CART_STATUS.CART_ACTIVE,
    CART_STATUS.CART_RESTORED,
    CART_STATUS.CART_RECOVERED,
  ] as const,

  PENDING: [
    CART_STATUS.PENDING,
    CART_STATUS.CART_PENDING,
    CART_STATUS.CART_PENDING_PAYMENT,
    CART_STATUS.CART_PENDING_CHECKOUT,
  ] as const,

  INACTIVE: [
    CART_STATUS.INACTIVE,
    CART_STATUS.CART_INACTIVE,
    CART_STATUS.CART_EXPIRED,
    CART_STATUS.CART_ARCHIVED,
  ] as const,

  ABANDONED: [CART_STATUS.CART_ABANDONED] as const,

  COMPLETED: [CART_STATUS.CART_CONVERTED, CART_STATUS.CART_COMPLETED] as const,

  MERGED_SPLIT: [CART_STATUS.CART_MERGED, CART_STATUS.CART_SPLIT] as const,

  BLOCKED: [CART_STATUS.BLOCKED, CART_STATUS.CART_LOCKED, CART_STATUS.SUSPENDED] as const,

  DELETED: [CART_STATUS.DELETED, CART_STATUS.CART_DELETED] as const,
} as const;
