import { z } from 'zod';

export const ApproveReviewRequestSchema = z.object({
  reviewId: z.string().min(1),
});

export type ApproveReviewRequestDTO = z.infer<typeof ApproveReviewRequestSchema>;
