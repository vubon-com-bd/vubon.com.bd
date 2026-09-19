/**
 * Order Return Schema
 * @module shared-schemas/business/order
 *
 * Values আসে shared-constants/business/order-return.constants থেকে।
 */

import { z } from 'zod';
import {
  ORDER_RETURN_STATUS,
  ORDER_RETURN_REASON,
  ORDER_RETURN,
} from '@vubon/shared-constants/business';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { MoneySchema } from '../../common/primitives/money.schema';

export const OrderReturnStatusSchema = z.enum(
  Object.values(ORDER_RETURN_STATUS) as [string, ...string[]]
);

export const OrderReturnReasonSchema = z.enum(
  Object.values(ORDER_RETURN_REASON) as [string, ...string[]]
);

export const OrderReturnSchema = z.object({
  id: UuidSchema,
  orderId: UuidSchema,
  userId: UuidSchema,
  status: OrderReturnStatusSchema,
  reason: OrderReturnReasonSchema,
  itemIds: z.array(UuidSchema).min(1).max(100),
  images: z.array(z.string().url()).max(ORDER_RETURN.MAX_IMAGES).optional(),
  notes: z.string().max(ORDER_RETURN.MAX_REASON_LENGTH).optional(),
  refundAmount: MoneySchema.optional(),
  restockFee: MoneySchema.optional(),
  currency: z.string().length(3),
  requestedAt: z.string().datetime(),
  approvedAt: z.string().datetime().optional(),
  pickedUpAt: z.string().datetime().optional(),
  receivedAt: z.string().datetime().optional(),
  refundedAt: z.string().datetime().optional(),
  closedAt: z.string().datetime().optional(),
});

export const OrderReturnPublicSchema = OrderReturnSchema.pick({
  id: true,
  orderId: true,
  status: true,
  reason: true,
  refundAmount: true,
  requestedAt: true,
});

export type OrderReturnStatusSchemaType = z.infer<typeof OrderReturnStatusSchema>;
export type OrderReturnReasonSchemaType = z.infer<typeof OrderReturnReasonSchema>;
export type OrderReturnSchemaType = z.infer<typeof OrderReturnSchema>;
export type OrderReturnPublicSchemaType = z.infer<typeof OrderReturnPublicSchema>;
