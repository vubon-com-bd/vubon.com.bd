import { z } from 'zod';

export const GenerateEmbeddingSchema = z.object({
  sourceId: z.string().min(1),
  sourceType: z.string().min(1),
  content: z.string().min(1).max(100000),
  type: z.enum(['text', 'image', 'audio', 'video', 'multimodal', 'code']).optional(),
  dimension: z.number().int().positive().optional(),
});

export type GenerateEmbeddingRequestDTO = z.infer<typeof GenerateEmbeddingSchema>;
