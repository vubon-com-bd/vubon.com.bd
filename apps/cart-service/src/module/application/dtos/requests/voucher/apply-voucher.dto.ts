import { z } from 'zod';

export const ApplyVoucherRequestSchema = z.object({
  cartId: z.string().uuid(),
  code: z.string().min(6).max(32),
}).strict();

export type ApplyVoucherRequestDTO = z.infer<typeof ApplyVoucherRequestSchema>;
