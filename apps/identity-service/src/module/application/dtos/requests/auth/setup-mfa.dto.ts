/**
 * Setup MFA Request DTO
 * @module identity-service/application/dtos/requests/auth
 */
import type { z } from 'zod';
import type { SetupMfaRequestSchema } from '@vubon/shared-schemas/auth';

export type SetupMfaRequestDTO = z.infer<typeof SetupMfaRequestSchema>;
