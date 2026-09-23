import { z } from 'zod';

export const ValidatePromotionRequestSchema = z.object({
  code: z.string().min(1).max(32),
  userId: z.string().uuid(),
  orderAmount: z.number().nonnegative(),
});

export type ValidatePromotionRequestDTO = z.infer<typeof ValidatePromotionRequestSchema>;
