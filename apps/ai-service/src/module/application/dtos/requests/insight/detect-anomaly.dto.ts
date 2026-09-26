import { z } from 'zod';

export const DetectAnomalySchema = z.object({
  target: z.string().min(1),
  dataPoints: z.array(z.object({
    timestamp: z.string().datetime(),
    value: z.number(),
  })).min(3),
  method: z.enum(['zscore', 'iqr']).default('zscore'),
  threshold: z.number().positive().default(2),
});

export type DetectAnomalyRequestDTO = z.infer<typeof DetectAnomalySchema>;
