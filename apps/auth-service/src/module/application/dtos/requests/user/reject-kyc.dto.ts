import { z } from 'zod';

export const RejectKycRequestSchema = z.object({
  userId: z.string().min(1),
  kycId: z.string().min(1),
  reason: z.string().min(1).max(500),
});

export type RejectKycRequestDTO = z.infer<typeof RejectKycRequestSchema>;
