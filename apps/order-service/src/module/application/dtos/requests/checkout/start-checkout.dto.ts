import { z } from 'zod';

export const StartCheckoutRequestSchema = z.object({
  customerId: z.string().min(1),
  cartId: z.string().optional(),
});

export type StartCheckoutRequestDTO = z.infer<typeof StartCheckoutRequestSchema>;
