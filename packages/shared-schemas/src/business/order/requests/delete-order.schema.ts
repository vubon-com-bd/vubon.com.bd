/**
 * Delete Order Request Schema
 * @module shared-schemas/business/order/requests
 */
import { z } from 'zod';
import { UuidSchema } from '../../../common/primitives/uuid.schema.js';

export const DeleteOrderRequestSchema = z
  .object({
    orderId: UuidSchema,
    reason: z.string().max(500).optional(),
  })
  .strict();

export type DeleteOrderRequestSchemaType = z.infer<typeof DeleteOrderRequestSchema>;
