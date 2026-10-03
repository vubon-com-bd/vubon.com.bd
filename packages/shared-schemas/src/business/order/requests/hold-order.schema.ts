/**
 * Hold Order Request Schema
 * @module shared-schemas/business/order/requests
 */
import { z } from 'zod';
import { UuidSchema } from '../../../common/primitives/uuid.schema.js';

export const HoldOrderRequestSchema = z
  .object({
    orderId: UuidSchema,
    reason: z.string().min(3).max(500),
    holdUntil: z.string().datetime().optional(),
  })
  .strict();

export type HoldOrderRequestSchemaType = z.infer<typeof HoldOrderRequestSchema>;
