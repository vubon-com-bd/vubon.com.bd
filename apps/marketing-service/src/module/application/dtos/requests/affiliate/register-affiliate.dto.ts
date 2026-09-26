import { z } from 'zod';

export const RegisterAffiliateRequestSchema = z.object({
  userId: z.string().uuid(),
  commissionRate: z.number().min(0).max(100).optional(),
});

export type RegisterAffiliateRequestDTO = z.infer<typeof RegisterAffiliateRequestSchema>;
