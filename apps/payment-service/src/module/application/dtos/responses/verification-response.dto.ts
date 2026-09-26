import { z } from 'zod';

export const VerificationPublicResponseSchema = z.object({
  id: z.string().uuid(),
  paymentId: z.string().uuid(),
  status: z.string(),
  method: z.string(),
  verifiedAt: z.string().datetime().nullable().optional(),
});

export type VerificationResponseDTO = z.infer<typeof VerificationPublicResponseSchema>;
