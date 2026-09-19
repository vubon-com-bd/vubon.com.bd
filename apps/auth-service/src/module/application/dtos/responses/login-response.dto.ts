import { z } from 'zod';
import { LoginResponseSchema } from '@vubon/shared-schemas/auth';

export type LoginResponseDTO = z.infer<typeof LoginResponseSchema>;
