import { z } from 'zod';

export const OrderStatsResponseSchema = z.object({
  totalOrders: z.number(),
  pendingOrders: z.number(),
  confirmedOrders: z.number(),
  shippedOrders: z.number(),
  deliveredOrders: z.number(),
  cancelledOrders: z.number(),
  totalRevenue: z.number(),
  currency: z.string(),
});

export type OrderStatsResponseDTO = z.infer<typeof OrderStatsResponseSchema>;
