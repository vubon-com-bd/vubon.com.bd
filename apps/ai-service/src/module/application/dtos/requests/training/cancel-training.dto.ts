import { z } from 'zod';

export const CancelTrainingSchema = z.object({
  trainingId: z.string().uuid(),
  reason: z.string().min(1).max(500),
});

export type CancelTrainingRequestDTO = z.infer<typeof CancelTrainingSchema>;
