import { z } from 'zod';

export const ClaimRewardRequestSchema = z.object({
  userId: z.string().uuid(),
  rewardId: z.string().uuid(),
});

export type ClaimRewardRequestDTO = z.infer<typeof ClaimRewardRequestSchema>;
