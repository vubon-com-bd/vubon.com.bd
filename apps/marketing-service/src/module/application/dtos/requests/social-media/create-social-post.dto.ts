import { z } from 'zod';
import { SocialMediaPlatformSchema } from '@vubon/shared-schemas/marketing';

export const CreateSocialPostRequestSchema = z.object({
  platform: SocialMediaPlatformSchema,
  content: z.string().min(1),
});

export type CreateSocialPostRequestDTO = z.infer<typeof CreateSocialPostRequestSchema>;
