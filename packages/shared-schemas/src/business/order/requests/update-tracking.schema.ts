/**
 * Update Tracking Schema
 * @module shared-schemas/business/order/requests
 */
import { z } from 'zod';
import { UuidSchema } from '../../../common/primitives/uuid.schema.js';
import { OrderTrackingEventSchema } from '../order-tracking.schema.js';

export const UpdateTrackingRequestSchema = z
  .object({
    trackingId: UuidSchema,
    orderId: UuidSchema,
    event: OrderTrackingEventSchema,
    message: z.string().min(1).max(500),
    location: z.string().max(255).optional(),
  })
  .strict();

export type UpdateTrackingRequestSchemaType = z.infer<typeof UpdateTrackingRequestSchema>;
