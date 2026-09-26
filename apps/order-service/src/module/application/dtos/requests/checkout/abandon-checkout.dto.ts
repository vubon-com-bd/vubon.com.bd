import { z } from 'zod';

export const AbandonCheckoutRequestSchema = z.object({
  checkoutId: z.string().min(1),
  reason: z.string().max(500).optional(),
});

export type AbandonCheckoutRequestDTO = z.infer<typeof AbandonCheckoutRequestSchema>;
