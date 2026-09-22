import { z } from 'zod';

export const ApplyCouponRequestSchema = z.object({
  cartId: z.string().uuid(),
  code: z.string().min(4).max(32),
}).strict();

export type ApplyCouponRequestDTO = z.infer<typeof ApplyCouponRequestSchema>;
