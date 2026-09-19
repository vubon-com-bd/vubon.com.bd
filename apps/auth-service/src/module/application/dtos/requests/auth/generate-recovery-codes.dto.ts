import { z } from 'zod';
import { MfaSetupResultSchema } from '@vubon/shared-schemas/auth';

export type GenerateRecoveryCodesRequestDTO = z.infer<typeof MfaSetupResultSchema>;
