import { z } from 'zod';

export const UpdateKpiSchema = z
  .object({
    kpiId: z.string().min(1).max(128),
    name: z.string().min(3).max(200).optional(),
    target: z.number().positive().optional(),
    threshold: z.number().min(0).max(100).optional(),
    metricName: z.string().min(1).max(100).optional(),
  })
  .strict()
  .refine(
    (d) =>
      d.name !== undefined ||
      d.target !== undefined ||
      d.threshold !== undefined ||
      d.metricName !== undefined,
    'At least one field must be provided',
  );

export type UpdateKpiDTO = z.infer<typeof UpdateKpiSchema>;
