import { z } from 'zod';

export const SemanticSearchSchema = z.object({
  query: z.string().min(1).max(1000),
  userId: z.string().uuid().optional(),
  model: z.string().min(1).optional(),
  limit: z.number().int().min(1).max(100).default(20),
  threshold: z.number().min(0).max(1).default(0.7),
});

export type SemanticSearchRequestDTO = z.infer<typeof SemanticSearchSchema>;
