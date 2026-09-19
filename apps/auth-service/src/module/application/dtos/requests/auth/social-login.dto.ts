import { z } from 'zod';
import { SocialLoginRequestSchema } from '@vubon/shared-schemas/auth';

export type SocialLoginRequestDTO = z.infer<typeof SocialLoginRequestSchema>;
