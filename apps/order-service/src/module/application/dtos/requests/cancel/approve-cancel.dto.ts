import { z } from 'zod';

export const ApproveCancelRequestSchema = z.object({
  cancelId: z.string().min(1),
  approvedBy: z.string().min(1),
});

export type ApproveCancelRequestDTO = z.infer<typeof ApproveCancelRequestSchema>;
