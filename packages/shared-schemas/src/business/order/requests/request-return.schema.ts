/**
 * Request Order Return Schema
 * @module shared-schemas/business/order/requests
 */
import { z } from 'zod';
import { UuidSchema } from '../../../common/primitives/uuid.schema.js';
import { OrderReturnReasonSchema } from '../order-return.schema.js';
import { ORDER_RETURN } from '@vubon/shared-constants/business/order';

export const RequestReturnRequestSchema = z
  .object({
    orderId: UuidSchema,
    reason: OrderReturnReasonSchema,
    itemIds: z.array(UuidSchema).min(1).max(100),
    images: z.array(z.string().url()).max(ORDER_RETURN.MAX_IMAGES).optional(),
    notes: z.string().max(ORDER_RETURN.MAX_REASON_LENGTH).optional(),
  })
  .strict();

export type RequestReturnRequestSchemaType = z.infer<typeof RequestReturnRequestSchema>;
