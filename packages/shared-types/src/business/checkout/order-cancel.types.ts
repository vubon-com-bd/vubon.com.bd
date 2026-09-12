import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { User } from '../../user/user.types';
import { ORDER_CANCEL } from '@vubon/shared-constants/src/business/checkout/order-cancel.constants';
import { Order } from './order.types';

export interface OrderCancel extends BaseEntity {
  cancelId: string;
  orderId: string;
  order: Order;
  userId: string;
  user: User;
  status: keyof typeof ORDER_CANCEL.STATUS | string;
  type: keyof typeof ORDER_CANCEL.TYPES | string;
  reason: string;
  description?: string;
  refundAmount?: Money;
  refundId?: string;
  approvedAt?: Date;
  rejectedAt?: Date;
  rejectedReason?: string;
  processedAt?: Date;
  metadata: Record<string, unknown>;
}
