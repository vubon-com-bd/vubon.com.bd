/**
 * OAuth Token Request DTO
 * @module identity-service/application/dtos/requests/auth
 */
import type { z } from 'zod';
import type { OAuthTokenRequestSchema } from '@vubon/shared-schemas/auth';

export type OAuthTokenRequestDTO = z.infer<typeof OAuthTokenRequestSchema>;
