import { z } from 'zod';
import { AuthDeviceRegisterInputSchema } from '@vubon/shared-schemas/auth';

export type EnableBiometricRequestDTO = z.infer<typeof AuthDeviceRegisterInputSchema>;
