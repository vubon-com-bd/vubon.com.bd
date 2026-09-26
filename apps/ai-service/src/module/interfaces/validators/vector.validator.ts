import { z } from 'zod';

export const SearchVectorBodySchema = z.object({
  indexId: z.string().uuid(),
  vector: z.array(z.number()).min(1).max(16384),
  topK: z.number().int().min(1).max(100).optional(),
  metric: z.enum(['cosine', 'euclidean', 'dot']).optional(),
  threshold: z.number().min(0).max(1).optional(),
});

export type SearchVectorBody = z.infer<typeof SearchVectorBodySchema>;

export class VectorValidator {
  static validateSearch(input: unknown): SearchVectorBody {
    return SearchVectorBodySchema.parse(input);
  }
}
