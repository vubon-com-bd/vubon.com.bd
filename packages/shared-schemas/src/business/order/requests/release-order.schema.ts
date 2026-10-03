/**
 * Release Order Request Schema
 * @module shared-schemas/business/order/requests
 */
import { z } from 'zod';
import { UuidSchema } from '../../../common/primitives/uuid.schema.js';

export const ReleaseOrderRequestSchema = z
  .object({
    orderId: UuidSchema,
    note: z.string().max(500).optional(),
  })
  .strict();

export type ReleaseOrderRequestSchemaType = z.infer<typeof ReleaseOrderRequestSchema>;
