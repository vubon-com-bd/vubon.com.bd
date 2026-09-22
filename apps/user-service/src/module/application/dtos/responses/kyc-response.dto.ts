import { z } from 'zod';
import { KycResponseSchema } from '@vubon/shared-schemas/user';

export type KycResponseDTO = z.infer<typeof KycResponseSchema>;
