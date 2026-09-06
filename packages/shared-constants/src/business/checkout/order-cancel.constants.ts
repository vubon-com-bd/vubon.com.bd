/**
 * Order Cancel Constants (EXTENDS common/status)
 * @module shared-constants/business/checkout/order-cancel.constants
 */

import { STATUS } from '../../common/status.constants';

export const ORDER_CANCEL = {
  // Base status from common
  STATUS: STATUS,

  // Cancel specific
  MAX_CANCEL_ATTEMPTS: 3,
  CANCEL_WINDOW_MINUTES: 30,
  CANCEL_CACHE_TTL: 3600,

  // Cancel status
  ORDER_CANCEL_STATUS: {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    PARTIAL: 'partial',
  } as const,

  // Cancel reason
  ORDER_CANCEL_REASON: {
    CHANGE_OF_MIND: 'change_of_mind',
    WRONG_ADDRESS: 'wrong_address',
    WRONG_ITEMS: 'wrong_items',
    PRICE_CHANGE: 'price_change',
    DISCOUNT_FOUND: 'discount_found',
    DUPLICATE_ORDER: 'duplicate_order',
    DELIVERY_TIME: 'delivery_time',
    SHIPPING_COST: 'shipping_cost',
    BETTER_DEAL: 'better_deal',
    UNEXPECTED_CIRCUMSTANCES: 'unexpected_circumstances',
    PAYMENT_ISSUE: 'payment_issue',
    OTHER: 'other',
  } as const,

  // Cancel type
  ORDER_CANCEL_TYPE: {
    FULL: 'full',
    PARTIAL: 'partial',
    BEFORE_SHIPMENT: 'before_shipment',
    AFTER_SHIPMENT: 'after_shipment',
  } as const,

  // Cancel validation
  ORDER_CANCEL_VALIDATION: {
    REQUIRES_REASON: true,
    REQUIRES_APPROVAL: false,
    ALLOWED_AFTER_SHIPMENT: false,
    AUTO_APPROVE: false,
    MAX_ATTEMPTS: 3,
  } as const,
} as const;

export type OrderCancelStatus =
  (typeof ORDER_CANCEL.ORDER_CANCEL_STATUS)[keyof typeof ORDER_CANCEL.ORDER_CANCEL_STATUS];
export type OrderCancelReason =
  (typeof ORDER_CANCEL.ORDER_CANCEL_REASON)[keyof typeof ORDER_CANCEL.ORDER_CANCEL_REASON];
export type OrderCancelType =
  (typeof ORDER_CANCEL.ORDER_CANCEL_TYPE)[keyof typeof ORDER_CANCEL.ORDER_CANCEL_TYPE];

export const ORDER_CANCEL_STATUS_LABELS: Record<OrderCancelStatus, string> = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
  processing: 'Processing',
  completed: 'Completed',
  failed: 'Failed',
  partial: 'Partial',
};

export const ORDER_CANCEL_STATUS_COLORS: Record<OrderCancelStatus, string> = {
  pending: '#eab308',
  approved: '#22c55e',
  rejected: '#ef4444',
  processing: '#60a5fa',
  completed: '#22c55e',
  failed: '#ef4444',
  partial: '#f59e0b',
};
