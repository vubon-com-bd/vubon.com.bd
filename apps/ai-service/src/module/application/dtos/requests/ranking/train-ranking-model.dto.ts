import { z } from 'zod';

export const TrainRankingModelSchema = z.object({
  name: z.string().min(1).max(100),
  algorithm: z.enum(['linear', 'learning_to_rank', 'hybrid']),
  datasetId: z.string().min(1),
  features: z.array(z.enum(['relevance', 'ctr', 'freshness', 'popularity'])).min(1),
});

export type TrainRankingModelRequestDTO = z.infer<typeof TrainRankingModelSchema>;
