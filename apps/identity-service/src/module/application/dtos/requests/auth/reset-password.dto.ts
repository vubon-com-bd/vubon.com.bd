/**
 * Reset Password Request DTO
 * @module identity-service/application/dtos/requests/auth
 */
import type { z } from 'zod';
import type { ResetPasswordRequestSchema } from '@vubon/shared-schemas/auth';

export type ResetPasswordRequestDTO = z.infer<typeof ResetPasswordRequestSchema>;
