/**
 * Reject Order Cancel Schema
 * @module shared-schemas/business/order/requests
 */
import { z } from 'zod';
import { UuidSchema } from '../../../common/primitives/uuid.schema.js';

export const RejectCancelRequestSchema = z
  .object({
    cancelId: UuidSchema,
    orderId: UuidSchema,
    reason: z.string().min(3).max(500),
  })
  .strict();

export type RejectCancelRequestSchemaType = z.infer<typeof RejectCancelRequestSchema>;
