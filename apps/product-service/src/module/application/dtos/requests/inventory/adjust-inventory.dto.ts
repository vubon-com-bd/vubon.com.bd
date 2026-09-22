import { z } from 'zod';

export const AdjustInventoryRequestSchema = z.object({
  productId: z.string().min(1),
  delta: z.number().int(),
  reason: z.string().max(500).optional(),
});

export type AdjustInventoryRequestDTO = z.infer<typeof AdjustInventoryRequestSchema>;
