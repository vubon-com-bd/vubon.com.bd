/**
 * Ship Order Schema
 * @module shared-schemas/business/order/requests
 */
import { z } from 'zod';
import { UuidSchema } from '../../../common/primitives/uuid.schema.js';

export const ShipOrderRequestSchema = z
  .object({
    orderId: UuidSchema,
    fulfillmentId: UuidSchema.optional(),
    trackingNumber: z.string().max(100).optional(),
    courierId: UuidSchema.optional(),
    notes: z.string().max(500).optional(),
  })
  .strict();

export type ShipOrderRequestSchemaType = z.infer<typeof ShipOrderRequestSchema>;
