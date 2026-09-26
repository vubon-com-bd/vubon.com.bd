import { z } from 'zod';

export const ReverifyKycRequestSchema = z.object({
  userId: z.string().min(1),
  kycId: z.string().min(1),
});

export type ReverifyKycRequestDTO = z.infer<typeof ReverifyKycRequestSchema>;
