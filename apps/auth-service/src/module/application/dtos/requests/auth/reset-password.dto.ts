import { z } from 'zod';
import { ResetPasswordRequestSchema } from '@vubon/shared-schemas/auth';

export type ResetPasswordRequestDTO = z.infer<typeof ResetPasswordRequestSchema>;
