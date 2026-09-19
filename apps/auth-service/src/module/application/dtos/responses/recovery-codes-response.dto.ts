import { z } from 'zod';
import { MfaBackupCodeSchema } from '@vubon/shared-schemas/auth';

export const RecoveryCodesResponseSchema = z.object({
  codes: z.array(MfaBackupCodeSchema),
  generatedAt: z.string().datetime(),
});

export type RecoveryCodesResponseDTO = z.infer<typeof RecoveryCodesResponseSchema>;
