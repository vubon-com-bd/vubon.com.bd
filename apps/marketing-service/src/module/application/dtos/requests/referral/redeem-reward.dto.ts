import { z } from 'zod';

export const RedeemReferralRewardRequestSchema = z.object({
  referralId: z.string().uuid(),
  userId: z.string().uuid(),
});

export type RedeemReferralRewardRequestDTO = z.infer<typeof RedeemReferralRewardRequestSchema>;
