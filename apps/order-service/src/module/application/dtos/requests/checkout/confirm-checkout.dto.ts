import { z } from 'zod';

export const ConfirmCheckoutRequestSchema = z.object({
  checkoutId: z.string().min(1),
});

export type ConfirmCheckoutRequestDTO = z.infer<typeof ConfirmCheckoutRequestSchema>;
