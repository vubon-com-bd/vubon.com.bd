import { z } from 'zod';

export const CompleteCancelRequestSchema = z.object({
  cancelId: z.string().min(1),
});

export type CompleteCancelRequestDTO = z.infer<typeof CompleteCancelRequestSchema>;
