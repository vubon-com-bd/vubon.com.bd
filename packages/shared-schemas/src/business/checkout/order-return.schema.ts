import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { UserSchema } from '../../user/user.schema';
import { ORDER_RETURN } from '@vubon/shared-constants/src/business/checkout/order-return.constants';
import { OrderSchema } from './order.schema';
import { OrderItemSchema } from './order-item.schema';

const orderReturnStatusKeys = Object.keys(ORDER_RETURN.STATUS) as [string, ...string[]];
const orderReturnTypeKeys = Object.keys(ORDER_RETURN.TYPES) as [string, ...string[]];

export const OrderReturnSchema = BaseSchema.extend({
  returnId: z.string().uuid(),
  orderId: z.string().uuid(),
  order: OrderSchema,
  userId: z.string().uuid(),
  user: UserSchema,
  status: z.enum(orderReturnStatusKeys),
  type: z.enum(orderReturnTypeKeys),
  items: z.array(
    z.object({
      itemId: z.string().uuid(),
      orderItem: OrderItemSchema,
      quantity: z.number().int().min(1),
      reason: z.string(),
      condition: z.string(),
      refundAmount: MoneySchema,
    })
  ),
  reason: z.string(),
  description: z.string().optional(),
  images: z.array(z.string().url()),
  refundAmount: MoneySchema,
  refundMethod: z.string(),
  refundId: z.string().optional(),
  approvedAt: z.date().optional(),
  rejectedAt: z.date().optional(),
  rejectedReason: z.string().optional(),
  processedAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});
