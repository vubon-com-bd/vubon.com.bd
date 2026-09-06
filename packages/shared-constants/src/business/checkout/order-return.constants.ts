/**
 * Order Return Constants (EXTENDS common/status)
 * @module shared-constants/business/checkout/order-return.constants
 */

import { STATUS } from '../../common/status.constants';

export const ORDER_RETURN = {
  // Base status from common
  STATUS: STATUS,

  // Return specific
  MAX_RETURN_DAYS: 30,
  MIN_RETURN_DAYS: 1,
  RETURN_WINDOW_DAYS: 7,
  MAX_RETURN_ITEMS: 100,

  // Return status
  ORDER_RETURN_STATUS: {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    PARTIAL: 'partial',
  } as const,

  // Return reason
  ORDER_RETURN_REASON: {
    DEFECTIVE: 'defective',
    DAMAGED: 'damaged',
    WRONG_ITEM: 'wrong_item',
    NOT_AS_DESCRIBED: 'not_as_described',
    CHANGE_OF_MIND: 'change_of_mind',
    SIZE_ISSUE: 'size_issue',
    COLOR_ISSUE: 'color_issue',
    QUALITY_ISSUE: 'quality_issue',
    DELIVERY_ISSUE: 'delivery_issue',
    OTHER: 'other',
  } as const,

  // Return type
  ORDER_RETURN_TYPE: {
    FULL: 'full',
    PARTIAL: 'partial',
    EXCHANGE: 'exchange',
    REPAIR: 'repair',
    REFUND: 'refund',
  } as const,

  // Return resolution
  ORDER_RETURN_RESOLUTION: {
    REFUND: 'refund',
    REPLACEMENT: 'replacement',
    EXCHANGE: 'exchange',
    REPAIR: 'repair',
    STORE_CREDIT: 'store_credit',
    PARTIAL_REFUND: 'partial_refund',
  } as const,
} as const;

export type OrderReturnStatus =
  (typeof ORDER_RETURN.ORDER_RETURN_STATUS)[keyof typeof ORDER_RETURN.ORDER_RETURN_STATUS];
export type OrderReturnReason =
  (typeof ORDER_RETURN.ORDER_RETURN_REASON)[keyof typeof ORDER_RETURN.ORDER_RETURN_REASON];
export type OrderReturnType =
  (typeof ORDER_RETURN.ORDER_RETURN_TYPE)[keyof typeof ORDER_RETURN.ORDER_RETURN_TYPE];
export type OrderReturnResolution =
  (typeof ORDER_RETURN.ORDER_RETURN_RESOLUTION)[keyof typeof ORDER_RETURN.ORDER_RETURN_RESOLUTION];

export const ORDER_RETURN_STATUS_LABELS: Record<OrderReturnStatus, string> = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
  processing: 'Processing',
  completed: 'Completed',
  failed: 'Failed',
  cancelled: 'Cancelled',
  partial: 'Partial',
};

export const ORDER_RETURN_STATUS_COLORS: Record<OrderReturnStatus, string> = {
  pending: '#eab308',
  approved: '#22c55e',
  rejected: '#ef4444',
  processing: '#60a5fa',
  completed: '#22c55e',
  failed: '#ef4444',
  cancelled: '#dc2626',
  partial: '#f59e0b',
};
