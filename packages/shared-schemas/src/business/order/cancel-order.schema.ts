/**
 * Cancel Order Request Schema
 * @module shared-schemas/business/order/requests
 */

import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema.js';
import { OrderCancelReasonSchema } from './order-cancel.schema.js';

export const CancelOrderRequestSchema = z
  .object({
    orderId: UuidSchema,
    reason: OrderCancelReasonSchema,
    notes: z.string().max(500).optional(),
  })
  .strict();

export type CancelOrderRequestSchemaType = z.infer<typeof CancelOrderRequestSchema>;
