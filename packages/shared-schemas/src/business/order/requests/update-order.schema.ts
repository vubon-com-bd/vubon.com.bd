/**
 * Update Order Request Schema
 * @module shared-schemas/business/order/requests
 */
import { z } from 'zod';
import { UuidSchema } from '../../../common/primitives/uuid.schema.js';
import { OrderStatusSchema } from '../order-status.schema.js';

export const UpdateOrderRequestSchema = z
  .object({
    orderId: UuidSchema,
    status: OrderStatusSchema.optional(),
    notes: z.string().max(1000).optional(),
    customerNotes: z.string().max(1000).optional(),
    shippingMethod: z.string().max(50).optional(),
    trackingNumber: z.string().max(100).optional(),
  })
  .strict();

export type UpdateOrderRequestSchemaType = z.infer<typeof UpdateOrderRequestSchema>;
