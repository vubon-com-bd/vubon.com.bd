import { z } from 'zod';
import { AuthDevicePublicSchema } from '@vubon/shared-schemas/auth';

export type AuthDeviceResponseDTO = z.infer<typeof AuthDevicePublicSchema>;
