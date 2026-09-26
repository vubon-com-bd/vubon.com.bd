import { z } from 'zod';

export const SuspendCourierRequestSchema = z.object({
  courierId: z.string().uuid(),
  reason: z.string().min(1).max(500),
});

export type SuspendCourierRequestDTO = z.infer<typeof SuspendCourierRequestSchema>;
