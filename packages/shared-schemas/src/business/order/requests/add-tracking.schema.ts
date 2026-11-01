/**
 * Add Tracking Schema
 * @module shared-schemas/business/order/requests
 */
import { z } from 'zod';
import { UuidSchema } from '../../../common/primitives/uuid.schema.js';
import { OrderTrackingEventSchema } from '../order-tracking.schema.js';

export const AddTrackingRequestSchema = z
  .object({
    orderId: UuidSchema,
    event: OrderTrackingEventSchema,
    message: z.string().min(1).max(500),
    location: z.string().max(255).optional(),
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
    trackingNumber: z.string().max(100).optional(),
    metadata: z.record(z.string(), z.unknown()).optional(),
    occurredAt: z.string().datetime().optional(),
  })
  .strict();

export type AddTrackingRequestSchemaType = z.infer<typeof AddTrackingRequestSchema>;
