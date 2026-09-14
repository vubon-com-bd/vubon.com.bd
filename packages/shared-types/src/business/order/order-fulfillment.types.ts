/**
 * Order Fulfillment Types
 * @module shared-types/business/order
 *
 * Values আসে shared-constants/business/order/order-fulfillment.constants থেকে।
 */

import type {
  ORDER_FULFILLMENT_STATUS,
  ORDER_FULFILLMENT_TYPE,
} from '@vubon/shared-constants/business';
import type { OrderId, VendorId, Money } from '../../common/primitives';

export type OrderFulfillmentStatusValue =
  (typeof ORDER_FULFILLMENT_STATUS)[keyof typeof ORDER_FULFILLMENT_STATUS];

export type OrderFulfillmentTypeValue =
  (typeof ORDER_FULFILLMENT_TYPE)[keyof typeof ORDER_FULFILLMENT_TYPE];

export interface OrderFulfillment {
  readonly id: string;
  readonly orderId: OrderId;
  readonly vendorId?: VendorId;
  readonly status: OrderFulfillmentStatusValue;
  readonly type: OrderFulfillmentTypeValue;
  readonly itemIds: readonly string[];
  readonly trackingNumber?: string;
  readonly courierId?: string;
  readonly warehouseId?: string;
  readonly shippingCost?: Money;
  readonly currency: string;
  readonly fulfilledAt?: string;
  readonly deliveredAt?: string;
  readonly notes?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface OrderFulfillmentInput {
  readonly orderId: OrderId;
  readonly itemIds: readonly string[];
  readonly type: OrderFulfillmentTypeValue;
  readonly courierId?: string;
  readonly warehouseId?: string;
}

export interface OrderFulfillmentPublic {
  readonly id: string;
  readonly status: OrderFulfillmentStatusValue;
  readonly type: OrderFulfillmentTypeValue;
  readonly trackingNumber?: string;
  readonly fulfilledAt?: string;
  readonly deliveredAt?: string;
}
