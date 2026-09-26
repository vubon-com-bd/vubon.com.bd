/**
 * Tracking Response Schema
 * @module shared-schemas/business/order/responses
 */

import { z } from 'zod';
import { OrderTrackingSummarySchema } from './order-tracking.schema';
import { OrderReturnPublicSchema } from './order-return.schema';

export const TrackingResponseSchema = z.object({
  success: z.literal(true),
  tracking: OrderTrackingSummarySchema,
});

export const ReturnResponseSchema = z.object({
  success: z.literal(true),
  return: OrderReturnPublicSchema,
});

export const ReturnListResponseSchema = z.object({
  success: z.literal(true),
  returns: z.array(OrderReturnPublicSchema).max(50),
  total: z.number().int().nonnegative(),
});

export type TrackingResponseSchemaType = z.infer<typeof TrackingResponseSchema>;
export type ReturnResponseSchemaType = z.infer<typeof ReturnResponseSchema>;
export type ReturnListResponseSchemaType = z.infer<typeof ReturnListResponseSchema>;
