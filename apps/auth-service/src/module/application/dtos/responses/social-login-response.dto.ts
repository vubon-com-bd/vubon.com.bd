import { z } from 'zod';
import { SocialLoginResultSchema } from '@vubon/shared-schemas/auth';

export type SocialLoginResponseDTO = z.infer<typeof SocialLoginResultSchema>;
