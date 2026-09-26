import { z } from 'zod';

export const RemoveVoucherRequestSchema = z.object({
  cartId: z.string().uuid(),
  code: z.string().min(6).max(32),
}).strict();

export type RemoveVoucherRequestDTO = z.infer<typeof RemoveVoucherRequestSchema>;
