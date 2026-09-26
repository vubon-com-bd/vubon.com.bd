/**
 * Order Status Value Types
 * @module shared-types/business/order
 *
 * Values আসে shared-constants/business/order/order-status.constants থেকে।
 */

import type { ORDER_STATUS, ORDER_PRIORITY } from '@vubon/shared-constants/business';

export type OrderStatusValue = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export type OrderPriorityValue = (typeof ORDER_PRIORITY)[keyof typeof ORDER_PRIORITY];

export interface OrderStatusMetadata {
  readonly value: OrderStatusValue;
  readonly label: string;
  readonly isFinal: boolean;
  readonly isCancellable: boolean;
}

export interface OrderPriorityMetadata {
  readonly value: OrderPriorityValue;
  readonly label: string;
  readonly weight: number;
}
