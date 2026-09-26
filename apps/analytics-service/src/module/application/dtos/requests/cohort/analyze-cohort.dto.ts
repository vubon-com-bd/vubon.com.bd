import { z } from 'zod';

export const AnalyzeCohortSchema = z
  .object({
    cohortId: z.string().min(1).max(128),
    periods: z.number().int().min(1).max(365).optional().default(30),
  })
  .strict();

export type AnalyzeCohortDTO = z.infer<typeof AnalyzeCohortSchema>;
