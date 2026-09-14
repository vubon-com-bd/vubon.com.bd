/**
 * Order Cancel Types
 * @module shared-types/business/order
 *
 * Values আসে shared-constants/business/order/order-cancel.constants থেকে।
 */

import type { ORDER_CANCEL_REASON, ORDER_CANCEL_STATUS } from '@vubon/shared-constants/business';
import type { OrderId, UserId, Money } from '../../common/primitives';

export type OrderCancelReasonValue = (typeof ORDER_CANCEL_REASON)[keyof typeof ORDER_CANCEL_REASON];

export type OrderCancelStatusValue = (typeof ORDER_CANCEL_STATUS)[keyof typeof ORDER_CANCEL_STATUS];

export interface OrderCancel {
  readonly id: string;
  readonly orderId: OrderId;
  readonly reason: OrderCancelReasonValue;
  readonly status: OrderCancelStatusValue;
  readonly requestedBy: UserId;
  readonly approvedBy?: UserId;
  readonly notes?: string;
  readonly refundAmount?: Money;
  readonly restockInventory: boolean;
  readonly requestedAt: string;
  readonly processedAt?: string;
}

export interface OrderCancelInput {
  readonly orderId: OrderId;
  readonly reason: OrderCancelReasonValue;
  readonly notes?: string;
}

export interface OrderCancelResult {
  readonly success: boolean;
  readonly cancelId?: string;
  readonly refundAmount?: Money;
  readonly error?: string;
}
