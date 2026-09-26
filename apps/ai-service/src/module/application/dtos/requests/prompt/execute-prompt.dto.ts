import { z } from 'zod';

export const ExecutePromptSchema = z.object({
  promptId: z.string().uuid().optional(),
  text: z.string().min(1).max(100000).optional(),
  templateId: z.string().uuid().optional(),
  role: z.enum(['system', 'user', 'assistant']).default('user'),
  variables: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).optional(),
  model: z.string().min(1),
  maxTokens: z.number().int().min(1).max(128000).optional(),
  temperature: z.number().min(0).max(2).default(0.7),
}).refine(
  (data) => data.promptId || data.text || data.templateId,
  { message: 'Either promptId, text, or templateId is required' },
);

export type ExecutePromptRequestDTO = z.infer<typeof ExecutePromptSchema>;
