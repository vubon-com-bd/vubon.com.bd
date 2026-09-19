/**
 * Order Response Schema
 * @module shared-schemas/business/order/responses
 */

import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { OrderPublicSchema, OrderSummarySchema, OrderStatsSchema } from './order.schema';

export const OrderResponseSchema = z.object({
  success: z.literal(true),
  order: OrderPublicSchema,
});

export const OrderListResponseSchema = z.object({
  success: z.literal(true),
  orders: z.array(OrderSummarySchema).max(100),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  totalPages: z.number().int().nonnegative(),
});

export const OrderCancelResponseSchema = z.object({
  success: z.literal(true),
  orderId: UuidSchema,
  cancelId: UuidSchema,
  refundAmount: z.number().nonnegative().optional(),
  cancelledAt: z.string().datetime(),
});

export const OrderStatsResponseSchema = z.object({
  success: z.literal(true),
  stats: OrderStatsSchema,
});

export type OrderResponseSchemaType = z.infer<typeof OrderResponseSchema>;
export type OrderListResponseSchemaType = z.infer<typeof OrderListResponseSchema>;
export type OrderCancelResponseSchemaType = z.infer<typeof OrderCancelResponseSchema>;
export type OrderStatsResponseSchemaType = z.infer<typeof OrderStatsResponseSchema>;
