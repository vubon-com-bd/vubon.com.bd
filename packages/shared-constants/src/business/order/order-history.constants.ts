/**
 * Order History Constants
 * @module shared-constants/business/order
 */
export const ORDER_HISTORY_TYPE = {
  CREATED: 'created',
  UPDATED: 'updated',
  STATUS_CHANGED: 'status_changed',
  ITEM_ADDED: 'item_added',
  ITEM_UPDATED: 'item_updated',
  ITEM_REMOVED: 'item_removed',
  PAYMENT_RECEIVED: 'payment_received',
  PAYMENT_FAILED: 'payment_failed',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  RETURNED: 'returned',
  REFUNDED: 'refunded',
  NOTE_ADDED: 'note_added',
  FULFILLMENT_STARTED: 'fulfillment_started',
  FULFILLMENT_COMPLETED: 'fulfillment_completed',
} as const;

export const ORDER_HISTORY = {
  RETENTION_DAYS: 1825, // 5 years
  MAX_ENTRIES: 10000,
} as const;

export type OrderHistoryType = (typeof ORDER_HISTORY_TYPE)[keyof typeof ORDER_HISTORY_TYPE];
