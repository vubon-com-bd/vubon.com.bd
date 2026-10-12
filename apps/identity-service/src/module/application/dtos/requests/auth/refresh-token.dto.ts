/**
 * Refresh Token Request DTO
 * @module identity-service/application/dtos/requests/auth
 */
import type { z } from 'zod';
import type { RefreshTokenRequestSchema } from '@vubon/shared-schemas/auth';

export type RefreshTokenRequestDTO = z.infer<typeof RefreshTokenRequestSchema>;
