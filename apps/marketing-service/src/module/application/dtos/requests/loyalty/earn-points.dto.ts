import { z } from 'zod';

export const EarnPointsRequestSchema = z.object({
  userId: z.string().uuid(),
  points: z.number().int().positive(),
  reason: z.string().max(200).optional(),
  orderId: z.string().uuid().optional(),
});

export type EarnPointsRequestDTO = z.infer<typeof EarnPointsRequestSchema>;
