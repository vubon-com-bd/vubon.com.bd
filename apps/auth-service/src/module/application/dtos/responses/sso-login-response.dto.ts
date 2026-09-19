import { z } from 'zod';
import { SsoLoginResponseSchema } from '@vubon/shared-schemas/auth';

export type SsoLoginResponseDTO = z.infer<typeof SsoLoginResponseSchema>;
