import { z } from 'zod';
import { VerifyEmailRequestSchema } from '@vubon/shared-schemas/auth';

export type VerifyEmailRequestDTO = z.infer<typeof VerifyEmailRequestSchema>;
