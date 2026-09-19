import { z } from 'zod';
import { SsoLoginRequestSchema } from '@vubon/shared-schemas/auth';

export type SsoLoginRequestDTO = z.infer<typeof SsoLoginRequestSchema>;
