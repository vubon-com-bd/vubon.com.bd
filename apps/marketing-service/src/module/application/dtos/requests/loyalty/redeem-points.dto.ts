import { z } from 'zod';

export const RedeemPointsRequestSchema = z.object({
  userId: z.string().uuid(),
  points: z.number().int().positive(),
  rewardId: z.string().uuid().optional(),
});

export type RedeemPointsRequestDTO = z.infer<typeof RedeemPointsRequestSchema>;
