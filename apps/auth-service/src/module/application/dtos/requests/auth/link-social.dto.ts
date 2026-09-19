import { z } from 'zod';
import { SocialAccountLinkInputSchema } from '@vubon/shared-schemas/auth';

export type LinkSocialRequestDTO = z.infer<typeof SocialAccountLinkInputSchema>;
