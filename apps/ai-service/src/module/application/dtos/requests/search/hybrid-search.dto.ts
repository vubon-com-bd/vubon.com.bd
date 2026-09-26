import { z } from 'zod';

export const HybridSearchSchema = z.object({
  query: z.string().min(1).max(1000),
  userId: z.string().uuid().optional(),
  semanticWeight: z.number().min(0).max(1).default(0.7),
  limit: z.number().int().min(1).max(100).default(20),
});

export type HybridSearchRequestDTO = z.infer<typeof HybridSearchSchema>;
