/**
 * Verify Email Request DTO
 * @module identity-service/application/dtos/requests/auth
 */
import type { z } from 'zod';
import type { VerifyEmailRequestSchema } from '@vubon/shared-schemas/auth';

export type VerifyEmailRequestDTO = z.infer<typeof VerifyEmailRequestSchema>;
