import { z } from 'zod';

export const SuspendUserRequestSchema = z.object({
  userId: z.string().min(1),
  reason: z.string().min(1).max(500),
  until: z.string().datetime().optional(),
});

export type SuspendUserRequestDTO = z.infer<typeof SuspendUserRequestSchema>;
