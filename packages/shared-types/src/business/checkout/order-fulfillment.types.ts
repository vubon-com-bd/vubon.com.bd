import { BaseEntity } from '../../common/base.types';
import { ORDER_FULFILLMENT } from '@vubon/shared-constants/src/business/checkout/order-fulfillment.constants';
import { Order } from './order.types';
import { OrderItem } from './order-item.types';

export interface OrderFulfillmentItem {
  itemId: string;
  orderItem: OrderItem;
  quantity: number;
  status: 'pending' | 'packed' | 'shipped' | 'delivered';
}

export interface OrderFulfillment extends BaseEntity {
  fulfillmentId: string;
  orderId: string;
  order: Order;
  status: keyof typeof ORDER_FULFILLMENT.STATUS | string;
  type: keyof typeof ORDER_FULFILLMENT.TYPES | string;
  items: OrderFulfillmentItem[];
  warehouseId: string;
  warehouseName: string;
  packedAt?: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
  trackingNumber?: string;
  carrier?: string;
  notes?: string;
  metadata: Record<string, unknown>;
}
