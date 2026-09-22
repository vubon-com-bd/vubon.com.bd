import { z } from 'zod';

export const DeactivateUserRequestSchema = z.object({
  userId: z.string().min(1),
  reason: z.string().max(500).optional(),
});

export type DeactivateUserRequestDTO = z.infer<typeof DeactivateUserRequestSchema>;
