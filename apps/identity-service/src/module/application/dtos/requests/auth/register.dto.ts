/**
 * Register Request DTO
 * @module identity-service/application/dtos/requests/auth
 */
import type { z } from 'zod';
import type { RegisterRequestSchema } from '@vubon/shared-schemas/auth';

export type RegisterRequestDTO = z.infer<typeof RegisterRequestSchema>;
