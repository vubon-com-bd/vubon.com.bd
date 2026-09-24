import { z } from 'zod';

export const ReviewFeedbackRequestSchema = z.object({
  feedbackId: z.string().uuid(),
  status: z.string().min(1).max(50),
  notes: z.string().max(2000).optional(),
});

export type ReviewFeedbackRequestDTO = z.infer<typeof ReviewFeedbackRequestSchema>;
