import { z } from 'zod';

export const CreateReferralRequestSchema = z.object({
  referrerId: z.string().uuid(),
  code: z.string().min(4).max(24).optional(),
});

export type CreateReferralRequestDTO = z.infer<typeof CreateReferralRequestSchema>;
