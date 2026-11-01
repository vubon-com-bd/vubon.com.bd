/**
 * Reject Order Return Schema
 * @module shared-schemas/business/order/requests
 */
import { z } from 'zod';
import { UuidSchema } from '../../../common/primitives/uuid.schema.js';

export const RejectReturnRequestSchema = z
  .object({
    returnId: UuidSchema,
    orderId: UuidSchema,
    reason: z.string().min(3).max(500),
  })
  .strict();

export type RejectReturnRequestSchemaType = z.infer<typeof RejectReturnRequestSchema>;
