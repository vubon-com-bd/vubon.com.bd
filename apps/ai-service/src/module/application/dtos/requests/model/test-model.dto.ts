import { z } from 'zod';

export const TestModelSchema = z.object({
  modelId: z.string().uuid(),
  inputs: z.array(z.record(z.string(), z.unknown())).min(1).max(100),
});

export type TestModelRequestDTO = z.infer<typeof TestModelSchema>;
