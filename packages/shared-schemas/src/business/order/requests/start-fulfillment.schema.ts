/**
 * Start Fulfillment Schema
 * @module shared-schemas/business/order/requests
 */
import { z } from 'zod';
import { UuidSchema } from '../../../common/primitives/uuid.schema.js';
import { OrderFulfillmentTypeSchema } from '../order-fulfillment.schema.js';

export const StartFulfillmentRequestSchema = z
  .object({
    orderId: UuidSchema,
    itemIds: z.array(UuidSchema).min(1).max(100),
    type: OrderFulfillmentTypeSchema,
    vendorId: UuidSchema.optional(),
    warehouseId: UuidSchema.optional(),
    courierId: UuidSchema.optional(),
  })
  .strict();

export type StartFulfillmentRequestSchemaType = z.infer<typeof StartFulfillmentRequestSchema>;
