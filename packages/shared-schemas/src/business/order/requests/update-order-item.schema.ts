/**
 * Update Order Item Request Schema
 * @module shared-schemas/business/order/requests
 */
import { z } from 'zod';
import { UuidSchema } from '../../../common/primitives/uuid.schema.js';

export const UpdateOrderItemRequestSchema = z
  .object({
    orderId: UuidSchema,
    itemId: UuidSchema,
    quantity: z.number().int().min(1).max(999).optional(),
    unitPrice: z.number().positive().optional(),
    discountAmount: z.number().nonnegative().optional(),
    notes: z.string().max(500).optional(),
  })
  .strict();

export type UpdateOrderItemRequestSchemaType = z.infer<typeof UpdateOrderItemRequestSchema>;
