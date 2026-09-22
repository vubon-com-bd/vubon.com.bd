import { z } from 'zod';

export const RemoveCouponRequestSchema = z.object({
  cartId: z.string().uuid(),
  code: z.string().min(4).max(32),
}).strict();

export type RemoveCouponRequestDTO = z.infer<typeof RemoveCouponRequestSchema>;
