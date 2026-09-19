import { z } from 'zod';
import { AuthDeviceTrustInputSchema } from '@vubon/shared-schemas/auth';

export type LockAccountRequestDTO = z.infer<typeof AuthDeviceTrustInputSchema>;
