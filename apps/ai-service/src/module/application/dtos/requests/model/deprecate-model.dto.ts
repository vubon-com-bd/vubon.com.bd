import { z } from 'zod';

export const DeprecateModelSchema = z.object({
  modelId: z.string().uuid(),
  reason: z.string().min(1).max(500),
  replacementModelId: z.string().uuid().optional(),
});

export type DeprecateModelRequestDTO = z.infer<typeof DeprecateModelSchema>;
