import { z } from 'zod';
import { AuthDeviceTrustInputSchema } from '@vubon/shared-schemas/auth';

export type UnlockAccountRequestDTO = z.infer<typeof AuthDeviceTrustInputSchema>;
