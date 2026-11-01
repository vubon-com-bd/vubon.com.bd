/**
 * OAuth Authorize Request DTO
 * @module identity-service/application/dtos/requests/auth
 */
import type { z } from 'zod';
import type { OAuthAuthorizeRequestSchema } from '@vubon/shared-schemas/auth';

export type OAuthAuthorizeRequestDTO = z.infer<typeof OAuthAuthorizeRequestSchema>;
