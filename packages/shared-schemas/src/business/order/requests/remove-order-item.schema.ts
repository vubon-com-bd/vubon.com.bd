/**
 * Remove Order Item Request Schema
 * @module shared-schemas/business/order/requests
 */
import { z } from 'zod';
import { UuidSchema } from '../../../common/primitives/uuid.schema.js';

export const RemoveOrderItemRequestSchema = z
  .object({
    orderId: UuidSchema,
    itemId: UuidSchema,
    reason: z.string().max(500).optional(),
  })
  .strict();

export type RemoveOrderItemRequestSchemaType = z.infer<typeof RemoveOrderItemRequestSchema>;
