import { z } from 'zod';
import { LogoutRequestSchema } from '@vubon/shared-schemas/auth';

export type LogoutRequestDTO = z.infer<typeof LogoutRequestSchema>;
