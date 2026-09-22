import { z } from 'zod';

export const RejectReviewRequestSchema = z.object({
  reviewId: z.string().min(1),
  reason: z.string().min(1).max(500),
});

export type RejectReviewRequestDTO = z.infer<typeof RejectReviewRequestSchema>;
