import { z } from 'zod';

export const RequestPayoutRequestSchema = z.object({
  affiliateId: z.string().uuid(),
  amount: z.number().positive(),
  currency: z.string().length(3).optional(),
  method: z.string().max(50).optional(),
});

export type RequestPayoutRequestDTO = z.infer<typeof RequestPayoutRequestSchema>;
