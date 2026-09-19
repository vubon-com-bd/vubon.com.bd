import { z } from 'zod';
import { VerifyMfaRequestSchema } from '@vubon/shared-schemas/auth';

export type VerifyMfaRequestDTO = z.infer<typeof VerifyMfaRequestSchema>;
