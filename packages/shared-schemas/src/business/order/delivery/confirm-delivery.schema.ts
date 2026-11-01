/**
 * Confirm Delivery Schema
 * @module shared-schemas/business/order/delivery
 */
import { z } from 'zod';
import { UuidSchema } from '../../../common/primitives/uuid.schema.js';

export const ConfirmDeliveryRequestSchema = z
  .object({
    deliveryId: UuidSchema,
    orderId: UuidSchema,
    receivedBy: z.string().max(200).optional(),
    signature: z.string().max(200).optional(),
    notes: z.string().max(500).optional(),
  })
  .strict();

export type ConfirmDeliveryRequestSchemaType = z.infer<typeof ConfirmDeliveryRequestSchema>;
