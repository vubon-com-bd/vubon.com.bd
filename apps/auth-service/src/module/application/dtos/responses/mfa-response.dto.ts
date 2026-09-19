import { z } from 'zod';
import { MfaSetupResponseSchema } from '@vubon/shared-schemas/auth';

export type MfaResponseDTO = z.infer<typeof MfaSetupResponseSchema>;
