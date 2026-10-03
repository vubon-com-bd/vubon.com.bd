/**
 * Approve Order Cancel Schema
 * @module shared-schemas/business/order/requests
 */
import { z } from 'zod';
import { UuidSchema } from '../../../common/primitives/uuid.schema.js';

export const ApproveCancelRequestSchema = z
  .object({
    cancelId: UuidSchema,
    orderId: UuidSchema,
    refundAmount: z.number().nonnegative().optional(),
    notes: z.string().max(500).optional(),
    restockInventory: z.boolean().optional(),
  })
  .strict();

export type ApproveCancelRequestSchemaType = z.infer<typeof ApproveCancelRequestSchema>;
