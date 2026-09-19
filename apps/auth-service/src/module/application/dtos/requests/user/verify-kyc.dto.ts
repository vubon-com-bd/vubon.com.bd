import { z } from 'zod';

export const VerifyKycRequestSchema = z.object({
  userId: z.string().min(1),
  kycId: z.string().min(1),
});

export type VerifyKycRequestDTO = z.infer<typeof VerifyKycRequestSchema>;
