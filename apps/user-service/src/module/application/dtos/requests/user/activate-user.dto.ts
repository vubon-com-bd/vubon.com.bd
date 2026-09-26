import { z } from 'zod';

export const ActivateUserRequestSchema = z.object({
  userId: z.string().min(1),
});

export type ActivateUserRequestDTO = z.infer<typeof ActivateUserRequestSchema>;
