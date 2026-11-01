/**
 * Complete Fulfillment Schema
 * @module shared-schemas/business/order/requests
 */
import { z } from 'zod';
import { UuidSchema } from '../../../common/primitives/uuid.schema.js';

export const CompleteFulfillmentRequestSchema = z
  .object({
    fulfillmentId: UuidSchema,
    orderId: UuidSchema,
    notes: z.string().max(500).optional(),
  })
  .strict();

export type CompleteFulfillmentRequestSchemaType = z.infer<typeof CompleteFulfillmentRequestSchema>;
