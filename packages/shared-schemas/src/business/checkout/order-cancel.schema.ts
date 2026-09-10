import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { UserSchema } from '../../user/user.schema';
import { ORDER_CANCEL } from '@vubon/shared-constants/src/business/checkout/order-cancel.constants';
import { OrderSchema } from './order.schema';

const orderCancelStatusKeys = Object.keys(ORDER_CANCEL.STATUS) as [string, ...string[]];
const orderCancelTypeKeys = Object.keys(ORDER_CANCEL.TYPES) as [string, ...string[]];

export const OrderCancelSchema = BaseSchema.extend({
  cancelId: z.string().uuid(),
  orderId: z.string().uuid(),
  order: OrderSchema,
  userId: z.string().uuid(),
  user: UserSchema,
  status: z.enum(orderCancelStatusKeys),
  type: z.enum(orderCancelTypeKeys),
  reason: z.string(),
  description: z.string().optional(),
  refundAmount: MoneySchema.optional(),
  refundId: z.string().optional(),
  approvedAt: z.date().optional(),
  rejectedAt: z.date().optional(),
  rejectedReason: z.string().optional(),
  processedAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});
