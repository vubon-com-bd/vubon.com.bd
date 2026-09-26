import { z } from 'zod';

export const DeleteUserRequestSchema = z.object({
  userId: z.string().min(1),
});

export type DeleteUserRequestDTO = z.infer<typeof DeleteUserRequestSchema>;
