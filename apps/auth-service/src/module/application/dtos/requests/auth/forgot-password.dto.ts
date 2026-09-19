import { z } from 'zod';
import { ForgotPasswordRequestSchema } from '@vubon/shared-schemas/auth';

export type ForgotPasswordRequestDTO = z.infer<typeof ForgotPasswordRequestSchema>;
