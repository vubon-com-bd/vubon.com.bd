/**
 * Approve Order Return Schema
 * @module shared-schemas/business/order/requests
 */
import { z } from 'zod';
import { UuidSchema } from '../../../common/primitives/uuid.schema.js';

export const ApproveReturnRequestSchema = z
  .object({
    returnId: UuidSchema,
    orderId: UuidSchema,
    notes: z.string().max(500).optional(),
  })
  .strict();

export type ApproveReturnRequestSchemaType = z.infer<typeof ApproveReturnRequestSchema>;
