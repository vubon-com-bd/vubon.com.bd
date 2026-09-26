import { z } from 'zod';

export const ComputeSimilaritySchema = z.object({
  sourceVectorId: z.string().uuid(),
  targetVectorIds: z.array(z.string().uuid()).min(1).max(1000),
  metric: z.enum(['cosine', 'euclidean', 'dot']).default('cosine'),
  threshold: z.number().min(0).max(1).default(0.7),
});

export type ComputeSimilarityRequestDTO = z.infer<typeof ComputeSimilaritySchema>;
