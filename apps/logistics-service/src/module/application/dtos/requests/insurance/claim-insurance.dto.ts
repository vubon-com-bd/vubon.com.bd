import { z } from 'zod';

export const ClaimInsuranceRequestSchema = z.object({
  insuranceId: z.string().uuid(),
  amount: z.number().positive(),
  reason: z.string().min(1).max(500),
});

export type ClaimInsuranceRequestDTO = z.infer<typeof ClaimInsuranceRequestSchema>;
