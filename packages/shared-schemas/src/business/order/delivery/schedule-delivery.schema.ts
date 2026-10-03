/**
 * Schedule Delivery Schema
 * @module shared-schemas/business/order/delivery
 */
import { z } from 'zod';
import { UuidSchema } from '../../../common/primitives/uuid.schema.js';

export const ScheduleDeliveryRequestSchema = z
  .object({
    orderId: UuidSchema,
    deliveryMethodId: UuidSchema.optional(),
    type: z.string().max(30).optional(),
    estimatedAt: z.string().datetime().optional(),
    notes: z.string().max(500).optional(),
  })
  .strict();

export type ScheduleDeliveryRequestSchemaType = z.infer<typeof ScheduleDeliveryRequestSchema>;
