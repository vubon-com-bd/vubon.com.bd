/**
 * Logout Request DTO
 * @module identity-service/application/dtos/requests/auth
 */
import type { z } from 'zod';
import type { LogoutRequestSchema } from '@vubon/shared-schemas/auth';

export type LogoutRequestDTO = z.infer<typeof LogoutRequestSchema>;
