import { z } from 'zod';
import { SsoLoginRequestSchema } from '@vubon/shared-schemas/auth';

export type SsoCallbackRequestDTO = z.infer<typeof SsoLoginRequestSchema>;
