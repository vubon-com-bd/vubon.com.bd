import { z } from 'zod';

export const BatchEmbeddingSchema = z.object({
  items: z.array(z.object({
    sourceId: z.string().min(1),
    sourceType: z.string().min(1),
    content: z.string().min(1).max(100000),
  })).min(1).max(2048),
});

export type BatchEmbeddingRequestDTO = z.infer<typeof BatchEmbeddingSchema>;
