/**
 * Forgot Password Request DTO
 * @module identity-service/application/dtos/requests/auth
 */
import type { z } from 'zod';
import type { ForgotPasswordRequestSchema } from '@vubon/shared-schemas/auth';

export type ForgotPasswordRequestDTO = z.infer<typeof ForgotPasswordRequestSchema>;
