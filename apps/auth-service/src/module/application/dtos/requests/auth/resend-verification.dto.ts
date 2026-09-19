import { z } from 'zod';
import { ResendVerifyEmailRequestSchema } from '@vubon/shared-schemas/auth';

export type ResendVerificationRequestDTO = z.infer<typeof ResendVerifyEmailRequestSchema>;
