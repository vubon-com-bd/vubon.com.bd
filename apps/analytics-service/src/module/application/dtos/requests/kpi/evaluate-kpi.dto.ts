import { z } from 'zod';

export const EvaluateKpiSchema = z
  .object({
    kpiId: z.string().min(1).max(128),
    actual: z.number().finite(),
    evaluatedAt: z.string().datetime().optional(),
  })
  .strict();

export type EvaluateKpiDTO = z.infer<typeof EvaluateKpiSchema>;
