import { z } from 'zod';

export const UpdateAvatarRequestSchema = z.object({
  userId: z.string().min(1),
  avatarUrl: z.string().url().nullable(),
});

export type UpdateAvatarRequestDTO = z.infer<typeof UpdateAvatarRequestSchema>;
