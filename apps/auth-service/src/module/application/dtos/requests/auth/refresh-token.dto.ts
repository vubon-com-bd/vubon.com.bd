import { z } from 'zod';
import { RefreshTokenRequestSchema } from '@vubon/shared-schemas/auth';

export type RefreshTokenRequestDTO = z.infer<typeof RefreshTokenRequestSchema>;
