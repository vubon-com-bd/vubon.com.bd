/**
 * Social Login Request DTO
 * @module identity-service/application/dtos/requests/auth
 */
import type { z } from 'zod';
import type { SocialLoginRequestSchema } from '@vubon/shared-schemas/auth';

export type SocialLoginRequestDTO = z.infer<typeof SocialLoginRequestSchema>;
