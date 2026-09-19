import { z } from 'zod';
import { LoginAttemptSummarySchema } from '@vubon/shared-schemas/auth';

export type AuthLoginAttemptResponseDTO = z.infer<typeof LoginAttemptSummarySchema>;
