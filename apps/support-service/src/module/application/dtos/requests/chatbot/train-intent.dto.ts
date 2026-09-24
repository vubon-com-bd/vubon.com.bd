import { z } from 'zod';

export const TrainIntentRequestSchema = z.object({
  chatbotId: z.string().uuid(),
  name: z.string().min(1).max(100),
  patterns: z.array(z.string()).min(1),
  response: z.string().min(1).max(2000),
});

export type TrainIntentRequestDTO = z.infer<typeof TrainIntentRequestSchema>;
