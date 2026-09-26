import { z } from 'zod';

export const GetModelPerformanceSchema = z.object({
  modelId: z.string().uuid(),
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
});

export type GetModelPerformanceRequestDTO = z.infer<typeof GetModelPerformanceSchema>;
