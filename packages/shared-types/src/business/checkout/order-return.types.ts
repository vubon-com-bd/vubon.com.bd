import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { User } from '../../user/user.types';
import { ORDER_RETURN } from '@vubon/shared-constants/src/business/checkout/order-return.constants';
import { Order } from './order.types';
import { OrderItem } from './order-item.types';

export interface OrderReturnItem {
  itemId: string;
  orderItem: OrderItem;
  quantity: number;
  reason: string;
  condition: string;
  refundAmount: Money;
}

export interface OrderReturn extends BaseEntity {
  returnId: string;
  orderId: string;
  order: Order;
  userId: string;
  user: User;
  status: keyof typeof ORDER_RETURN.STATUS | string;
  type: keyof typeof ORDER_RETURN.TYPES | string;
  items: OrderReturnItem[];
  reason: string;
  description?: string;
  images: string[];
  refundAmount: Money;
  refundMethod: string;
  refundId?: string;
  approvedAt?: Date;
  rejectedAt?: Date;
  rejectedReason?: string;
  processedAt?: Date;
  metadata: Record<string, unknown>;
}
