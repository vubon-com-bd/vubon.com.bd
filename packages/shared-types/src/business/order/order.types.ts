/**
 * Order Core Types
 * @module shared-types/business/order
 *
 * Order entity + aggregator।
 */

import type { OrderId, UserId, VendorId, Money } from '../../common/primitives';
import type { BaseEntity } from '../../common/base';
import type { Address } from '../../common/geo';
import type { OrderStatusValue, OrderPriorityValue } from './order-status.types';
import type { OrderItemPublic } from './order-item.types';
import type { OrderReturnPublic } from './order-return.types';
import type { OrderTrackingPublic } from './order-tracking.types';
import type { OrderFulfillmentPublic } from './order-fulfillment.types';

export type OrderTypeValue =
  'regular' | 'pre_order' | 'backorder' | 'subscription' | 'exchange' | 'replacement';

export interface Order extends BaseEntity<OrderId> {
  readonly orderNumber: string;
  readonly userId: UserId;
  readonly vendorIds?: readonly VendorId[];
  readonly type: OrderTypeValue;
  readonly status: OrderStatusValue;
  readonly priority: OrderPriorityValue;
  readonly items: readonly OrderItemPublic[];
  readonly subtotal: Money;
  readonly discountAmount: Money;
  readonly taxAmount: Money;
  readonly shippingAmount: Money;
  readonly total: Money;
  readonly currency: string;
  readonly paymentId?: string;
  readonly paymentStatus?: string;
  readonly paymentMethod?: string;
  readonly shippingAddress: Address;
  readonly billingAddress?: Address;
  readonly shippingMethod?: string;
  readonly trackingNumber?: string;
  readonly returns?: readonly OrderReturnPublic[];
  readonly tracking?: readonly OrderTrackingPublic[];
  readonly fulfillments?: readonly OrderFulfillmentPublic[];
  readonly notes?: string;
  readonly customerNotes?: string;
  readonly confirmedAt?: string;
  readonly shippedAt?: string;
  readonly deliveredAt?: string;
  readonly cancelledAt?: string;
  readonly completedAt?: string;
}

export interface OrderPublic {
  readonly id: OrderId;
  readonly orderNumber: string;
  readonly status: OrderStatusValue;
  readonly priority: OrderPriorityValue;
  readonly items: readonly OrderItemPublic[];
  readonly subtotal: Money;
  readonly discountAmount: Money;
  readonly taxAmount: Money;
  readonly shippingAmount: Money;
  readonly total: Money;
  readonly currency: string;
  readonly trackingNumber?: string;
  readonly createdAt: string;
  readonly shippedAt?: string;
  readonly deliveredAt?: string;
}

export interface OrderSummary {
  readonly id: OrderId;
  readonly orderNumber: string;
  readonly status: OrderStatusValue;
  readonly itemCount: number;
  readonly total: Money;
  readonly currency: string;
  readonly createdAt: string;
}

export interface OrderCreateInput {
  readonly userId: UserId;
  readonly items: readonly {
    readonly productId: string;
    readonly variantId?: string;
    readonly quantity: number;
  }[];
  readonly shippingAddress: Address;
  readonly billingAddress?: Address;
  readonly shippingMethod?: string;
  readonly paymentMethod: string;
  readonly notes?: string;
  readonly customerNotes?: string;
}

export interface OrderUpdateInput {
  readonly status?: OrderStatusValue;
  readonly priority?: OrderPriorityValue;
  readonly notes?: string;
  readonly trackingNumber?: string;
  readonly shippingMethod?: string;
}

export interface OrderFilter {
  readonly userId?: UserId;
  readonly vendorId?: VendorId;
  readonly status?: OrderStatusValue;
  readonly priority?: OrderPriorityValue;
  readonly type?: OrderTypeValue;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly minTotal?: number;
  readonly maxTotal?: number;
  readonly search?: string;
}

export interface OrderStats {
  readonly totalOrders: number;
  readonly totalRevenue: Money;
  readonly averageOrderValue: Money;
  readonly currency: string;
  readonly byStatus: Readonly<Record<OrderStatusValue, number>>;
}
