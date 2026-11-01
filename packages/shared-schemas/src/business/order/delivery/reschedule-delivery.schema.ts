/**
 * Reschedule Delivery Schema
 * @module shared-schemas/business/order/delivery
 */
import { z } from 'zod';
import { UuidSchema } from '../../../common/primitives/uuid.schema.js';

export const RescheduleDeliveryRequestSchema = z
  .object({
    deliveryId: UuidSchema,
    orderId: UuidSchema,
    reason: z.string().min(3).max(500),
    newEstimatedAt: z.string().datetime().optional(),
  })
  .strict();

export type RescheduleDeliveryRequestSchemaType = z.infer<typeof RescheduleDeliveryRequestSchema>;
