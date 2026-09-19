/**
 * Return Order Request Schema
 * @module shared-schemas/business/order/requests
 */

import { z } from 'zod';
import { ORDER_RETURN } from '@vubon/shared-constants/business';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { OrderReturnReasonSchema } from './order-return.schema';

export const ReturnOrderRequestSchema = z
  .object({
    orderId: UuidSchema,
    reason: OrderReturnReasonSchema,
    itemIds: z.array(UuidSchema).min(1).max(100),
    images: z.array(z.string().url()).max(ORDER_RETURN.MAX_IMAGES).optional(),
    notes: z.string().max(ORDER_RETURN.MAX_REASON_LENGTH).optional(),
  })
  .strict();

export type ReturnOrderRequestSchemaType = z.infer<typeof ReturnOrderRequestSchema>;
