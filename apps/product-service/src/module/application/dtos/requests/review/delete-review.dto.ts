import { z } from 'zod';

export const DeleteReviewRequestSchema = z.object({
  reviewId: z.string().min(1),
});

export type DeleteReviewRequestDTO = z.infer<typeof DeleteReviewRequestSchema>;
