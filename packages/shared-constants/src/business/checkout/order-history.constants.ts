/**
 * Order History Constants (EXTENDS common/types)
 * @module shared-constants/business/checkout/order-history.constants
 */

import { TYPES } from '../../common/types.constants';

export const ORDER_HISTORY = {
  // Base types from common
  ...TYPES,

  // History specific
  MAX_HISTORY_ENTRIES: 100,
  HISTORY_RETENTION_DAYS: 365,
  HISTORY_CACHE_TTL: 3600,

  // History type
  ORDER_HISTORY_TYPE: {
    CREATED: 'created',
    UPDATED: 'updated',
    STATUS_CHANGED: 'status_changed',
    PAYMENT: 'payment',
    SHIPPING: 'shipping',
    DELIVERY: 'delivery',
    CANCELLED: 'cancelled',
    RETURNED: 'returned',
    REFUNDED: 'refunded',
    NOTE_ADDED: 'note_added',
    COMMENT_ADDED: 'comment_added',
  } as const,

  // History status
  ORDER_HISTORY_STATUS: {
    PENDING: 'pending',
    COMPLETED: 'completed',
    FAILED: 'failed',
  } as const,

  // History visibility
  ORDER_HISTORY_VISIBILITY: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    ADMIN_ONLY: 'admin_only',
    CUSTOMER_ONLY: 'customer_only',
  } as const,
} as const;

export type OrderHistoryType =
  (typeof ORDER_HISTORY.ORDER_HISTORY_TYPE)[keyof typeof ORDER_HISTORY.ORDER_HISTORY_TYPE];
export type OrderHistoryStatus =
  (typeof ORDER_HISTORY.ORDER_HISTORY_STATUS)[keyof typeof ORDER_HISTORY.ORDER_HISTORY_STATUS];
export type OrderHistoryVisibility =
  (typeof ORDER_HISTORY.ORDER_HISTORY_VISIBILITY)[keyof typeof ORDER_HISTORY.ORDER_HISTORY_VISIBILITY];

export const ORDER_HISTORY_TYPE_LABELS: Record<OrderHistoryType, string> = {
  created: 'Order Created',
  updated: 'Order Updated',
  status_changed: 'Status Changed',
  payment: 'Payment',
  shipping: 'Shipping',
  delivery: 'Delivery',
  cancelled: 'Cancelled',
  returned: 'Returned',
  refunded: 'Refunded',
  note_added: 'Note Added',
  comment_added: 'Comment Added',
};

export const ORDER_HISTORY_STATUS_LABELS: Record<OrderHistoryStatus, string> = {
  pending: 'Pending',
  completed: 'Completed',
  failed: 'Failed',
};

export const ORDER_HISTORY_STATUS_COLORS: Record<OrderHistoryStatus, string> = {
  pending: '#eab308',
  completed: '#22c55e',
  failed: '#ef4444',
};
