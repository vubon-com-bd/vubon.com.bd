/**
 * Pack Order Schema
 * @module shared-schemas/business/order/requests
 */
import { z } from 'zod';
import { UuidSchema } from '../../../common/primitives/uuid.schema.js';

export const PackOrderRequestSchema = z
  .object({
    fulfillmentId: UuidSchema,
    orderId: UuidSchema,
    packageCount: z.number().int().min(1).max(50).optional(),
    notes: z.string().max(500).optional(),
  })
  .strict();

export type PackOrderRequestSchemaType = z.infer<typeof PackOrderRequestSchema>;
