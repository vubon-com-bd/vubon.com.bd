/**
 * Submit KYC Request DTO
 * @module identity-service/application/dtos/requests/user
 */
import type { z } from 'zod';
import type { SubmitKycRequestSchema } from '@vubon/shared-schemas/user';

export type SubmitKycRequestDTO = z.infer<typeof SubmitKycRequestSchema>;
