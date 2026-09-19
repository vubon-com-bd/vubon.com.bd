import { z } from 'zod';
import { KycResponseSchema } from '@vubon/shared-schemas/user';

export type UserKycResponseDTO = z.infer<typeof KycResponseSchema>;
