/**
 * Login Request DTO
 * @module identity-service/application/dtos/requests/auth
 */
import type { z } from 'zod';
import type { LoginRequestSchema } from '@vubon/shared-schemas/auth';

export type LoginRequestDTO = z.infer<typeof LoginRequestSchema>;
