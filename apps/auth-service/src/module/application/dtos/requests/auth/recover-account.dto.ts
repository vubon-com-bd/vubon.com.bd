import { z } from 'zod';
import { VerifyBackupCodeRequestSchema } from '@vubon/shared-schemas/auth';

export type RecoverAccountRequestDTO = z.infer<typeof VerifyBackupCodeRequestSchema>;
