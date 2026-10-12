/**
 * Auth Verification Request DTO
 * @module identity-service/application/dtos/requests/auth
 */
import type { z } from 'zod';
import type { AuthVerificationRequestSchema } from '@vubon/shared-schemas/auth';

export type AuthVerificationRequestDTO = z.infer<typeof AuthVerificationRequestSchema>;
