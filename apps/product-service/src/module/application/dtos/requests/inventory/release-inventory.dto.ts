import { z } from 'zod';

export const ReleaseInventoryRequestSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().positive(),
  orderId: z.string().min(1),
});

export type ReleaseInventoryRequestDTO = z.infer<typeof ReleaseInventoryRequestSchema>;
