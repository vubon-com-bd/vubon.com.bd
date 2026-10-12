/**
 * Verify MFA Request DTO
 * @module identity-service/application/dtos/requests/auth
 */
import type { z } from 'zod';
import type { VerifyMfaRequestSchema } from '@vubon/shared-schemas/auth';

export type VerifyMfaRequestDTO = z.infer<typeof VerifyMfaRequestSchema>;
