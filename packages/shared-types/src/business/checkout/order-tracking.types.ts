import { BaseEntity } from '../../common/base.types';
import { ORDER_TRACKING } from '@vubon/shared-constants/src/business/checkout/order-tracking.constants';
import { Order } from './order.types';

export interface OrderTracking extends BaseEntity {
  trackingId: string;
  orderId: string;
  order: Order;
  trackingNumber: string;
  carrier: string;
  status: keyof typeof ORDER_TRACKING.STATUS | string;
  location: string;
  description: string;
  estimatedDelivery?: Date;
  actualDelivery?: Date;
  isDelivered: boolean;
  metadata: Record<string, unknown>;
  occurredAt: Date;
}
