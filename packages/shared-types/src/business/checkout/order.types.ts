/**
 * Order Types
 * অর্ডার সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { User } from '../../common/user';
import { ORDER_STATUS } from '@vubon/shared-constants';
import { OrderItem } from './order-item.types';
import { OrderTracking } from './order-tracking.types';
import { BillingAddress } from './billing-address.types';
import { ShippingAddress } from './shipping-address.types';
import { DeliveryMethod } from './delivery-method.types';

export interface Order extends BaseEntity {
  orderNumber: string;
  userId: string;
  user?: User;
  checkoutId: string;
  status: (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];
  items: OrderItem[];
  billingAddress: BillingAddress;
  shippingAddress: ShippingAddress;
  deliveryMethod: DeliveryMethod;
  tracking: OrderTracking[];
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  paidAmount: number;
  dueAmount: number;
  currency: string;
  note?: string;
  customerNote?: string;
  adminNote?: string;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded' | 'partial_refunded';
  paymentId?: string;
  transactionId?: string;
  placedAt: Date;
  confirmedAt?: Date;
  processedAt?: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
  cancelledAt?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderCreateInput {
  userId: string;
  checkoutId: string;
  billingAddress: BillingAddress;
  shippingAddress: ShippingAddress;
  deliveryMethod: DeliveryMethod;
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  currency?: string;
  note?: string;
  customerNote?: string;
  paymentMethod: string;
}

export interface OrderUpdateInput {
  status?: (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];
  adminNote?: string;
  paymentStatus?: 'pending' | 'paid' | 'failed' | 'refunded' | 'partial_refunded';
  paymentId?: string;
  transactionId?: string;
  confirmedAt?: Date;
  processedAt?: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
  cancelledAt?: Date;
  completedAt?: Date;
}

export interface OrderResponse {
  order: Order;
}
