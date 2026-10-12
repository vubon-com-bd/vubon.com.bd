/**
 * SSO Login Request DTO
 * @module identity-service/application/dtos/requests/auth
 */
import type { z } from 'zod';
import type { SsoLoginRequestSchema } from '@vubon/shared-schemas/auth';

export type SsoLoginRequestDTO = z.infer<typeof SsoLoginRequestSchema>;
