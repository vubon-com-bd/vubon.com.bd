import { z } from 'zod';
import { RefreshTokenResponseSchema } from '@vubon/shared-schemas/auth';

export type RefreshTokenResponseDTO = z.infer<typeof RefreshTokenResponseSchema>;
