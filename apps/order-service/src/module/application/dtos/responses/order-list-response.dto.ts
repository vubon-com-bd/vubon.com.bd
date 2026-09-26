import { z } from 'zod';
import { OrderResponseSchema } from './order-response.dto';

export const OrderListResponseSchema = z.object({
  orders: z.array(OrderResponseSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
});

export type OrderListResponseDTO = z.infer<typeof OrderListResponseSchema>;
