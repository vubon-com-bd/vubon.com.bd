import { z } from 'zod';
import { AuthDeviceRegisterInputSchema } from '@vubon/shared-schemas/auth';

export type DisableBiometricRequestDTO = z.infer<typeof AuthDeviceRegisterInputSchema>;
