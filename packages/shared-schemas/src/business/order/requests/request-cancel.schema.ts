/**
 * Request Order Cancel Schema
 * @module shared-schemas/business/order/requests
 */
import { z } from 'zod';
import { UuidSchema } from '../../../common/primitives/uuid.schema.js';
import { OrderCancelReasonSchema } from '../order-cancel.schema.js';

export const RequestCancelRequestSchema = z
  .object({
    orderId: UuidSchema,
    reason: OrderCancelReasonSchema,
    notes: z.string().max(500).optional(),
  })
  .strict();

export type RequestCancelRequestSchemaType = z.infer<typeof RequestCancelRequestSchema>;
