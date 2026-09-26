import { z } from 'zod';

export const CreateClustersSchema = z.object({
  vectorIds: z.array(z.string().uuid()).min(2),
  k: z.number().int().min(2).max(100),
  algorithm: z.string().min(1).default('kmeans'),
  maxIterations: z.number().int().min(1).max(1000).default(100),
});

export type CreateClustersRequestDTO = z.infer<typeof CreateClustersSchema>;
