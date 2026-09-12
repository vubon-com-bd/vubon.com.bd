import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { UserSchema } from '../../user/user.schema';
import { ORDER_HISTORY } from '@vubon/shared-constants/src/business/checkout/order-history.constants';
import { OrderStatusSchema } from './order-status.schema';

const orderHistoryTypeKeys = Object.keys(ORDER_HISTORY.TYPES) as [string, ...string[]];

export const OrderHistorySchema = BaseSchema.extend({
  historyId: z.string().uuid(),
  orderId: z.string().uuid(),
  type: z.enum(orderHistoryTypeKeys),
  status: OrderStatusSchema,
  previousStatus: OrderStatusSchema.optional(),
  description: z.string(),
  changedBy: z.string().uuid(),
  changedByUser: UserSchema.optional(),
  metadata: z.record(z.unknown()).optional(),
  occurredAt: z.date(),
});
