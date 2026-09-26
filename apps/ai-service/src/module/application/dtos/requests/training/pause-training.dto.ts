import { z } from 'zod';

export const PauseTrainingSchema = z.object({
  trainingId: z.string().uuid(),
  reason: z.string().max(500).optional(),
});

export type PauseTrainingRequestDTO = z.infer<typeof PauseTrainingSchema>;
