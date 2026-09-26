import { z } from 'zod';

export const ApproveAffiliateRequestSchema = z.object({
  affiliateId: z.string().uuid(),
  approvedBy: z.string().uuid(),
});

export type ApproveAffiliateRequestDTO = z.infer<typeof ApproveAffiliateRequestSchema>;
