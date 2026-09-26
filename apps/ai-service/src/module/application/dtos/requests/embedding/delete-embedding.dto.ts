import { z } from 'zod';

export const DeleteEmbeddingSchema = z.object({
  embeddingId: z.string().uuid().optional(),
  sourceId: z.string().optional(),
  sourceType: z.string().optional(),
}).refine(
  (data) => data.embeddingId || (data.sourceId && data.sourceType),
  { message: 'Either embeddingId or (sourceId + sourceType) is required' },
);

export type DeleteEmbeddingRequestDTO = z.infer<typeof DeleteEmbeddingSchema>;
