import { z } from 'zod';

export const EvaluateModelSchema = z.object({
  modelId: z.string().uuid(),
  testDatasetId: z.string().min(1),
  metrics: z.array(z.enum(['accuracy', 'precision', 'recall', 'f1', 'rmse', 'mae'])).default(['accuracy']),
});

export type EvaluateModelRequestDTO = z.infer<typeof EvaluateModelSchema>;
