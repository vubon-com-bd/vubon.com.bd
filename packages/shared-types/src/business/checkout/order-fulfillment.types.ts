/**
 * Order Fulfillment Types
 * অর্ডার পরিপূর্ণতা সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { User } from '../../common/user';
import { Order } from './order.types';
import { OrderItem } from './order-item.types';

export interface OrderFulfillment extends BaseEntity {
  orderId: string;
  order: Order;
  items: OrderItem[];
  status:
    | 'pending'
    | 'processing'
    | 'picked'
    | 'packed'
    | 'shipped'
    | 'delivered'
    | 'failed'
    | 'cancelled';
  fulfillmentMethod: 'manual' | 'automated' | 'dropshipping';
  warehouseId?: string;
  location?: string;
  notes?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  carrier?: string;
  shippingLabel?: string;
  packingSlip?: string;
  invoice?: string;
  processedBy?: string;
  processedByUser?: User;
  processedAt?: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderFulfillmentCreateInput {
  orderId: string;
  items: string[];
  fulfillmentMethod: 'manual' | 'automated' | 'dropshipping';
  warehouseId?: string;
  location?: string;
  notes?: string;
}

export interface OrderFulfillmentUpdateInput {
  status?:
    | 'pending'
    | 'processing'
    | 'picked'
    | 'packed'
    | 'shipped'
    | 'delivered'
    | 'failed'
    | 'cancelled';
  trackingNumber?: string;
  trackingUrl?: string;
  carrier?: string;
  shippingLabel?: string;
  packingSlip?: string;
  invoice?: string;
  processedBy?: string;
  processedAt?: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
}

export interface OrderFulfillmentResponse {
  orderFulfillment: OrderFulfillment;
}
