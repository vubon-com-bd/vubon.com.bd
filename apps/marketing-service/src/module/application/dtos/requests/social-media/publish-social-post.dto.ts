import { z } from 'zod';

export const PublishSocialPostRequestSchema = z.object({
  postId: z.string().uuid(),
});

export type PublishSocialPostRequestDTO = z.infer<typeof PublishSocialPostRequestSchema>;
