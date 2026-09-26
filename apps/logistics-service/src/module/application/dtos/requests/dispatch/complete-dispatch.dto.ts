import { z } from 'zod';

export const CompleteDispatchRequestSchema = z.object({
  dispatchId: z.string().uuid(),
  arrivedAt: z.string().datetime().optional(),
});

export type CompleteDispatchRequestDTO = z.infer<typeof CompleteDispatchRequestSchema>;
