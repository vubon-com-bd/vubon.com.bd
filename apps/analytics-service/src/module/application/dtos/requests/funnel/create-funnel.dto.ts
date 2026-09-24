import { z } from 'zod';

export const CreateFunnelSchema = z
  .object({
    name: z.string().min(2).max(150),
    steps: z
      .array(z.string().min(1).max(100))
      .min(2, 'Funnel requires at least 2 steps')
      .max(20, 'Funnel cannot have more than 20 steps')
      .refine(
        (arr) => new Set(arr.map((s) => s.toLowerCase())).size === arr.length,
        'Funnel steps must be unique',
      ),
    ownerId: z.string().min(1).max(128),
  })
  .strict();

export type CreateFunnelDTO = z.infer<typeof CreateFunnelSchema>;
