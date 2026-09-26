import { z } from 'zod';

export const RebuildIndexSchema = z.object({
  indexId: z.string().uuid(),
  force: z.boolean().default(false),
});

export type RebuildIndexRequestDTO = z.infer<typeof RebuildIndexSchema>;
