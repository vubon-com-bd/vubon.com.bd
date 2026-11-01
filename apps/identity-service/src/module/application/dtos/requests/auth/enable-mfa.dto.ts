/**
 * Enable MFA Request DTO
 * @module identity-service/application/dtos/requests/auth
 */
import type { z } from 'zod';
import type { EnableMfaRequestSchema } from '@vubon/shared-schemas/auth';

export type EnableMfaRequestDTO = z.infer<typeof EnableMfaRequestSchema>;
