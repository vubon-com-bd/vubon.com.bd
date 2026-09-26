import { z } from 'zod';

export const IndexVectorSchema = z.object({
  vectorId: z.string().uuid(),
  indexId: z.string().uuid(),
  metadata: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export type IndexVectorRequestDTO = z.infer<typeof IndexVectorSchema>;
