/**
 * Order Item Types
 * @module shared-types/business/order
 *
 * Values আসে shared-constants/business/order/order-item.constants থেকে।
 */

import type { ORDER_ITEM_STATUS, ORDER_ITEM_TYPE } from '@vubon/shared-constants/business';
import type { OrderId, ProductId, VendorId, Money, Url } from '../../common/primitives';

export type OrderItemStatusValue = (typeof ORDER_ITEM_STATUS)[keyof typeof ORDER_ITEM_STATUS];

export type OrderItemTypeValue = (typeof ORDER_ITEM_TYPE)[keyof typeof ORDER_ITEM_TYPE];

export interface OrderItem {
  readonly id: string;
  readonly orderId: OrderId;
  readonly productId: ProductId;
  readonly variantId?: string;
  readonly vendorId?: VendorId;
  readonly sku: string;
  readonly name: string;
  readonly imageUrl?: Url;
  readonly type: OrderItemTypeValue;
  readonly status: OrderItemStatusValue;
  readonly quantity: number;
  readonly unitPrice: Money;
  readonly compareAtPrice?: Money;
  readonly subtotal: Money;
  readonly discountAmount?: Money;
  readonly taxAmount?: Money;
  readonly shippingAmount?: Money;
  readonly total: Money;
  readonly currency: string;
  readonly attributes?: Readonly<Record<string, string>>;
  readonly notes?: string;
}

export interface OrderItemPublic {
  readonly id: string;
  readonly productId: ProductId;
  readonly variantId?: string;
  readonly name: string;
  readonly imageUrl?: Url;
  readonly quantity: number;
  readonly unitPrice: Money;
  readonly total: Money;
  readonly status: OrderItemStatusValue;
}
