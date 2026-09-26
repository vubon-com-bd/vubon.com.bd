import { z } from 'zod';

export const SearchVectorSchema = z.object({
  indexId: z.string().uuid(),
  vector: z.array(z.number()).min(1).max(16384),
  topK: z.number().int().min(1).max(100).default(10),
  metric: z.enum(['cosine', 'euclidean', 'dot']).default('cosine'),
  threshold: z.number().min(0).max(1).optional(),
});

export type SearchVectorRequestDTO = z.infer<typeof SearchVectorSchema>;
