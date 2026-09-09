import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { User } from '../../user/user.types';
import { ORDER_STATUS } from '@vubon/shared-constants/src/business/checkout/order-status.constants';
import { Checkout } from './checkout.types';
import { OrderItem } from './order-item.types';
import { OrderHistory } from './order-history.types';
import { OrderTracking } from './order-tracking.types';
import { BillingAddress } from './billing-address.types';
import { ShippingAddress } from './shipping-address.types';
import { DeliveryMethod } from './delivery-method.types';

export interface OrderMetadata {
  notes?: string;
  giftMessage?: string;
  isGift: boolean;
  ipAddress: string;
  userAgent: string;
  deviceId: string;
  source: string;
}

export interface Order extends BaseEntity {
  orderId: string;
  orderNumber: string;
  checkoutId: string;
  checkout: Checkout;
  userId: string;
  user: User;
  status: keyof typeof ORDER_STATUS | string;
  items: OrderItem[];
  billingAddress: BillingAddress;
  shippingAddress: ShippingAddress;
  deliveryMethod: DeliveryMethod;
  subtotal: Money;
  discountTotal: Money;
  taxTotal: Money;
  shippingCost: Money;
  grandTotal: Money;
  currency: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: string;
  paymentId?: string;
  history: OrderHistory[];
  tracking: OrderTracking[];
  isPaid: boolean;
  isShipped: boolean;
  isDelivered: boolean;
  isCancelled: boolean;
  isReturned: boolean;
  placedAt: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
  cancelledAt?: Date;
  returnedAt?: Date;
  metadata: OrderMetadata;
}
