import { z } from 'zod';

export const ApplyPromotionRequestSchema = z.object({
  code: z.string().min(1).max(32),
  userId: z.string().uuid(),
  orderAmount: z.number().nonnegative(),
  currency: z.string().length(3).optional(),
});

export type ApplyPromotionRequestDTO = z.infer<typeof ApplyPromotionRequestSchema>;
