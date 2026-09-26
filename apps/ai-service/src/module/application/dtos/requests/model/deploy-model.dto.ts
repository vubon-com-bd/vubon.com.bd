import { z } from 'zod';

export const DeployModelSchema = z.object({
  modelId: z.string().uuid(),
  endpoint: z.string().url().optional(),
  trafficPercent: z.number().int().min(0).max(100).optional(),
});

export type DeployModelRequestDTO = z.infer<typeof DeployModelSchema>;
