import { z } from 'zod';
import { OrderResponseSchema } from './order-response.dto';
import { OrderItemResponseSchema } from './order-item-response.dto';

export const OrderDetailResponseSchema = OrderResponseSchema.extend({
  items: z.array(OrderItemResponseSchema),
});

export type OrderDetailResponseDTO = z.infer<typeof OrderDetailResponseSchema>;
