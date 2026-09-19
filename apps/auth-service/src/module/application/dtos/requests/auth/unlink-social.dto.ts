import { z } from 'zod';
import { SocialAccountUnlinkInputSchema } from '@vubon/shared-schemas/auth';

export type UnlinkSocialRequestDTO = z.infer<typeof SocialAccountUnlinkInputSchema>;
