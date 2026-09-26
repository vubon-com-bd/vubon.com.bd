/**
 * Order Return Types
 * @module shared-types/business/order
 *
 * Values আসে shared-constants/business/order/order-return.constants থেকে।
 */

import type { ORDER_RETURN_STATUS, ORDER_RETURN_REASON } from '@vubon/shared-constants/business';
import type { OrderId, UserId, Money, Url } from '../../common/primitives';

export type OrderReturnStatusValue = (typeof ORDER_RETURN_STATUS)[keyof typeof ORDER_RETURN_STATUS];

export type OrderReturnReasonValue = (typeof ORDER_RETURN_REASON)[keyof typeof ORDER_RETURN_REASON];

export interface OrderReturn {
  readonly id: string;
  readonly orderId: OrderId;
  readonly userId: UserId;
  readonly status: OrderReturnStatusValue;
  readonly reason: OrderReturnReasonValue;
  readonly itemIds: readonly string[];
  readonly images?: readonly Url[];
  readonly notes?: string;
  readonly refundAmount?: Money;
  readonly restockFee?: Money;
  readonly currency: string;
  readonly requestedAt: string;
  readonly approvedAt?: string;
  readonly pickedUpAt?: string;
  readonly receivedAt?: string;
  readonly refundedAt?: string;
  readonly closedAt?: string;
}

export interface OrderReturnInput {
  readonly orderId: OrderId;
  readonly reason: OrderReturnReasonValue;
  readonly itemIds: readonly string[];
  readonly images?: readonly string[];
  readonly notes?: string;
}

export interface OrderReturnResult {
  readonly success: boolean;
  readonly returnId?: string;
  readonly status?: OrderReturnStatusValue;
  readonly error?: string;
}

export interface OrderReturnPublic {
  readonly id: string;
  readonly orderId: OrderId;
  readonly status: OrderReturnStatusValue;
  readonly reason: OrderReturnReasonValue;
  readonly refundAmount?: Money;
  readonly requestedAt: string;
}
