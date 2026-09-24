import { z } from 'zod';

export const SubmitFeedbackRequestSchema = z.object({
  userId: z.string().uuid(),
  type: z.string().min(1).max(50),
  content: z.string().min(1).max(5000),
});

export type SubmitFeedbackRequestDTO = z.infer<typeof SubmitFeedbackRequestSchema>;
