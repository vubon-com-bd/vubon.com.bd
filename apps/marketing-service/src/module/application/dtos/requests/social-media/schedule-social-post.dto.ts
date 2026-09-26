import { z } from 'zod';

export const ScheduleSocialPostRequestSchema = z.object({
  postId: z.string().uuid(),
  scheduledAt: z.string().datetime(),
});

export type ScheduleSocialPostRequestDTO = z.infer<typeof ScheduleSocialPostRequestSchema>;
