import { z } from 'zod';

export const UpdatePriceRequestSchema = z.object({
  productId: z.string().min(1),
  amount: z.number().nonnegative(),
  currency: z.string().min(3).max(3).optional(),
});

export type UpdatePriceRequestDTO = z.infer<typeof UpdatePriceRequestSchema>;
