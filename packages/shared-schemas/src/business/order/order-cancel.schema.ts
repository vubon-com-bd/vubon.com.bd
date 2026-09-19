/**
 * Order Cancel Schema
 * @module shared-schemas/business/order
 *
 * Values আসে shared-constants/business/order-cancel.constants থেকে।
 */

import { z } from 'zod';
import {
  ORDER_CANCEL_REASON,
  ORDER_CANCEL_STATUS,
  ORDER_CANCEL,
} from '@vubon/shared-constants/business';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { MoneySchema } from '../../common/primitives/money.schema';

export const OrderCancelReasonSchema = z.enum(
  Object.values(ORDER_CANCEL_REASON) as [string, ...string[]]
);

export const OrderCancelStatusSchema = z.enum(
  Object.values(ORDER_CANCEL_STATUS) as [string, ...string[]]
);

export const OrderCancelSchema = z.object({
  id: UuidSchema,
  orderId: UuidSchema,
  reason: OrderCancelReasonSchema,
  status: OrderCancelStatusSchema,
  requestedBy: UuidSchema,
  approvedBy: UuidSchema.optional(),
  notes: z.string().max(ORDER_CANCEL.MAX_REASON_LENGTH).optional(),
  refundAmount: MoneySchema.optional(),
  restockInventory: z.boolean(),
  requestedAt: z.string().datetime(),
  processedAt: z.string().datetime().optional(),
});

export type OrderCancelReasonSchemaType = z.infer<typeof OrderCancelReasonSchema>;
export type OrderCancelStatusSchemaType = z.infer<typeof OrderCancelStatusSchema>;
export type OrderCancelSchemaType = z.infer<typeof OrderCancelSchema>;
