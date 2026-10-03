/**
 * Confirm Order Status Request Schema (order-level status transition)
 * @module shared-schemas/business/order/requests
 *
 * NOTE: distinct from checkout/confirm-order.schema.ts which is checkout confirm.
 */
import { z } from 'zod';
import { UuidSchema } from '../../../common/primitives/uuid.schema.js';

export const ConfirmOrderStatusRequestSchema = z
  .object({
    orderId: UuidSchema,
    paymentId: UuidSchema.optional(),
    notes: z.string().max(500).optional(),
  })
  .strict();

export type ConfirmOrderStatusRequestSchemaType = z.infer<typeof ConfirmOrderStatusRequestSchema>;
