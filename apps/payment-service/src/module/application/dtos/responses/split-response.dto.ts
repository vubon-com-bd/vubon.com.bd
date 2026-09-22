import { z } from 'zod';

export const SplitPublicResponseSchema = z.object({
  id: z.string().uuid(),
  paymentId: z.string().uuid(),
  type: z.string(),
  amount: z.number(),
  currency: z.string().length(3),
  recipientId: z.string().uuid(),
  status: z.string(),
  createdAt: z.string().datetime(),
});

export type SplitResponseDTO = z.infer<typeof SplitPublicResponseSchema>;
