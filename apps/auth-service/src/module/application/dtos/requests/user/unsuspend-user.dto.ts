import { z } from 'zod';

export const UnsuspendUserRequestSchema = z.object({
  userId: z.string().min(1),
});

export type UnsuspendUserRequestDTO = z.infer<typeof UnsuspendUserRequestSchema>;
