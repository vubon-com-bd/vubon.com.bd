/**
 * Disable MFA Request DTO
 * @module identity-service/application/dtos/requests/auth
 */
import type { z } from 'zod';
import type { DisableMfaRequestSchema } from '@vubon/shared-schemas/auth';

export type DisableMfaRequestDTO = z.infer<typeof DisableMfaRequestSchema>;
