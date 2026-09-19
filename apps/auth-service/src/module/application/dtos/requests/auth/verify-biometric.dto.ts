import { z } from 'zod';
import { AuthDeviceTrustInputSchema } from '@vubon/shared-schemas/auth';

export type VerifyBiometricRequestDTO = z.infer<typeof AuthDeviceTrustInputSchema>;
