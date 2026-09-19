import { z } from 'zod';
import { RegisterRequestSchema } from '@vubon/shared-schemas/auth';

export type RegisterRequestDTO = z.infer<typeof RegisterRequestSchema>;
