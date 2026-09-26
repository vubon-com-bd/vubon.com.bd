import { z } from 'zod';

export const ReserveInventoryRequestSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().positive(),
  orderId: z.string().min(1),
});

export type ReserveInventoryRequestDTO = z.infer<typeof ReserveInventoryRequestSchema>;
