import { z } from 'zod';
import { LoginRequestSchema } from '@vubon/shared-schemas/auth';

export type LoginRequestDTO = z.infer<typeof LoginRequestSchema>;
