import { z } from 'zod';

export const StartTrainingSchema = z.object({
  modelId: z.string().uuid(),
  datasetId: z.string().min(1),
  epochs: z.number().int().min(1).max(1000).default(10),
  batchSize: z.number().int().min(1).max(4096).default(32),
  learningRate: z.number().positive().max(1).default(0.001),
  validationSplit: z.number().min(0).max(0.9).default(0.2),
  hyperparameters: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export type StartTrainingRequestDTO = z.infer<typeof StartTrainingSchema>;
