import { z } from 'zod';

export const CreateKpiSchema = z
  .object({
    name: z.string().min(3).max(200),
    metricName: z.string().min(1).max(100),
    target: z.number().positive('Target must be positive'),
    threshold: z.number().min(0).max(100, 'Threshold is a percentage (0-100)'),
    ownerId: z.string().min(1).max(128),
  })
  .strict();

export type CreateKpiDTO = z.infer<typeof CreateKpiSchema>;
