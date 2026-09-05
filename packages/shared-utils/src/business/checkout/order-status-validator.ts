/**
 * Order Status Validator
 * অর্ডার স্ট্যাটাস ভ্যালিডেটর
 */

import { ORDER_STATUS } from '@vubon/shared-constants';
import type { Order } from '@vubon/shared-types';

export interface StatusValidationResult {
  valid: boolean;
  errors: string[];
}

export interface StatusTransitionValidation {
  from: string;
  to: string;
  allowed: boolean;
  reason?: string;
}

export const validateOrderStatus = (status: string): StatusValidationResult => {
  const errors: string[] = [];
  const validStatuses = Object.values(ORDER_STATUS);

  if (!validStatuses.includes(status as (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS])) {
    errors.push(`Invalid order status: ${status}`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const validateStatusTransition = (from: string, to: string): StatusTransitionValidation => {
  // Define allowed transitions
  const transitions: Record<string, string[]> = {
    pending: ['confirmed', 'cancelled'],
    confirmed: ['processing', 'cancelled'],
    processing: ['ready_to_ship', 'cancelled'],
    ready_to_ship: ['shipped', 'cancelled'],
    shipped: ['in_transit', 'delivered', 'returned'],
    in_transit: ['out_for_delivery', 'delivered', 'returned'],
    out_for_delivery: ['delivered', 'failed', 'returned'],
    delivered: ['completed', 'returned'],
    completed: ['returned', 'refunded'],
    cancelled: ['refunded'],
    returned: ['refunded', 'completed'],
    refunded: ['completed'],
    partial_shipped: ['shipped', 'cancelled'],
    failed: ['pending', 'cancelled'],
    expired: ['cancelled'],
  };

  const allowed = transitions[from]?.includes(to) || false;

  if (!allowed) {
    return {
      from,
      to,
      allowed: false,
      reason: `Cannot transition from ${from} to ${to}`,
    };
  }

  return {
    from,
    to,
    allowed: true,
  };
};

export const canCancelOrder = (order: Order): boolean => {
  const cancelableStatuses = ['pending', 'confirmed', 'processing', 'ready_to_ship'];
  return cancelableStatuses.includes(order.status);
};

export const canReturnOrder = (order: Order): boolean => {
  const returnableStatuses = ['delivered', 'completed', 'partial_shipped'];
  return returnableStatuses.includes(order.status);
};

export const canRefundOrder = (order: Order): boolean => {
  const refundableStatuses = ['cancelled', 'returned', 'failed', 'partial_shipped'];
  return refundableStatuses.includes(order.status);
};

export const canShipOrder = (order: Order): boolean => {
  const shippableStatuses = ['confirmed', 'processing', 'ready_to_ship'];
  return shippableStatuses.includes(order.status);
};

export const getNextStatusOptions = (currentStatus: string): string[] => {
  const options: Record<string, string[]> = {
    pending: ['confirmed', 'cancelled'],
    confirmed: ['processing', 'cancelled'],
    processing: ['ready_to_ship', 'cancelled'],
    ready_to_ship: ['shipped', 'cancelled'],
    shipped: ['in_transit', 'delivered', 'returned'],
    in_transit: ['out_for_delivery', 'delivered', 'returned'],
    out_for_delivery: ['delivered', 'failed', 'returned'],
    delivered: ['completed', 'returned'],
    completed: ['returned', 'refunded'],
    cancelled: ['refunded'],
    returned: ['refunded', 'completed'],
    refunded: ['completed'],
    partial_shipped: ['shipped', 'cancelled'],
    failed: ['pending', 'cancelled'],
    expired: ['cancelled'],
  };

  return options[currentStatus] || [];
};

export const getOrderStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    processing: 'Processing',
    ready_to_ship: 'Ready to Ship',
    shipped: 'Shipped',
    in_transit: 'In Transit',
    out_for_delivery: 'Out for Delivery',
    delivered: 'Delivered',
    completed: 'Completed',
    cancelled: 'Cancelled',
    returned: 'Returned',
    refunded: 'Refunded',
    partial_shipped: 'Partially Shipped',
    failed: 'Failed',
    expired: 'Expired',
  };

  return labels[status] || status;
};
