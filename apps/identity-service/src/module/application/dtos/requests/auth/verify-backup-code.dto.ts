/**
 * Verify Backup Code Request DTO
 * @module identity-service/application/dtos/requests/auth
 */
import type { z } from 'zod';
import type { VerifyBackupCodeRequestSchema } from '@vubon/shared-schemas/auth';

export type VerifyBackupCodeRequestDTO = z.infer<typeof VerifyBackupCodeRequestSchema>;
