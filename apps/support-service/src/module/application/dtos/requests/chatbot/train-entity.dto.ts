import { z } from 'zod';

export const TrainEntityRequestSchema = z.object({
  chatbotId: z.string().uuid(),
  name: z.string().min(1).max(100),
  type: z.string().min(1).max(50),
  value: z.string().min(1).max(500),
});

export type TrainEntityRequestDTO = z.infer<typeof TrainEntityRequestSchema>;
