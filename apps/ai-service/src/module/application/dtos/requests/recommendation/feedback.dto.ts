import { z } from 'zod';

export const FeedbackSchema = z.object({
  recommendationId: z.string().uuid(),
  userId: z.string().uuid(),
  productId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(1000).optional(),
});

export type FeedbackRequestDTO = z.infer<typeof FeedbackSchema>;
