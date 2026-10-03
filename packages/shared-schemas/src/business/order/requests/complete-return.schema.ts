/**
 * Complete Order Return Schema
 * @module shared-schemas/business/order/requests
 */
import { z } from 'zod';
import { UuidSchema } from '../../../common/primitives/uuid.schema.js';

export const CompleteReturnRequestSchema = z
  .object({
    returnId: UuidSchema,
    orderId: UuidSchema,
    refundAmount: z.number().nonnegative(),
    restockFee: z.number().nonnegative().optional(),
    notes: z.string().max(500).optional(),
  })
  .strict();

export type CompleteReturnRequestSchemaType = z.infer<typeof CompleteReturnRequestSchema>;
