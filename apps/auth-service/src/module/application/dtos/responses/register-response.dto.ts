import { z } from 'zod';
import { RegisterResponseSchema } from '@vubon/shared-schemas/auth';

export type RegisterResponseDTO = z.infer<typeof RegisterResponseSchema>;
