import { z } from 'zod';

export const GenerateCompletionSchema = z.object({
  promptId: z.string().uuid(),
  model: z.string().min(1),
  maxTokens: z.number().int().min(1).max(128000).default(1000),
  temperature: z.number().min(0).max(2).default(0.7),
  stopSequences: z.array(z.string()).max(10).optional(),
});

export type GenerateCompletionRequestDTO = z.infer<typeof GenerateCompletionSchema>;
