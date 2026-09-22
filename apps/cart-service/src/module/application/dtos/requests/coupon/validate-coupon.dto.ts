import { z } from 'zod';

export const ValidateCouponRequestSchema = z.object({
  code: z.string().min(4).max(32),
  subtotal: z.number().nonnegative(),
  currency: z.string().length(3),
}).strict();

export type ValidateCouponRequestDTO = z.infer<typeof ValidateCouponRequestSchema>;
