/**
 * Resend Verification Request DTO
 * @module identity-service/application/dtos/requests/auth
 */
import type { z } from 'zod';
import type { ResendVerifyEmailRequestSchema } from '@vubon/shared-schemas/auth';

export type ResendVerificationRequestDTO = z.infer<typeof ResendVerifyEmailRequestSchema>;
