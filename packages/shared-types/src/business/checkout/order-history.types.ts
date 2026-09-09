import { BaseEntity } from '../../common/base.types';
import { User } from '../../user/user.types';
import { ORDER_HISTORY } from '@vubon/shared-constants/src/business/checkout/order-history.constants';
import { Order } from './order.types';

export interface OrderHistory extends BaseEntity {
  historyId: string;
  orderId: string;
  order: Order;
  type: keyof typeof ORDER_HISTORY.TYPES | string;
  status: string; // সরাসরি string টাইপ ব্যবহার করা হয়েছে
  previousStatus?: string;
  description: string;
  changedBy: string;
  changedByUser?: User;
  metadata: Record<string, unknown>;
  occurredAt: Date;
}
