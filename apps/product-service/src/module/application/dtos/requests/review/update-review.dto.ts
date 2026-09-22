import { z } from 'zod';

export const UpdateReviewRequestSchema = z.object({
  reviewId: z.string().min(1),
  rating: z.number().int().min(1).max(5).optional(),
  content: z.string().max(2000).optional(),
});

export type UpdateReviewRequestDTO = z.infer<typeof UpdateReviewRequestSchema>;
