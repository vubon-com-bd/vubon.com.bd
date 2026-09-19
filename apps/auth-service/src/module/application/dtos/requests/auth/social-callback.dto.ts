import { z } from 'zod';
import { SocialAccountLinkInputSchema } from '@vubon/shared-schemas/auth';

export type SocialCallbackRequestDTO = z.infer<typeof SocialAccountLinkInputSchema>;
