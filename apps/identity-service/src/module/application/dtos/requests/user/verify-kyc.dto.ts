/**
 * Verify KYC Request DTO
 * @module identity-service/application/dtos/requests/user
 */
import { z } from 'zod';

export const VerifyKycRequestSchema = z
  .object({
    kycId: z.string().uuid(),
  })
  .strict();

export type VerifyKycRequestDTO = z.infer<typeof VerifyKycRequestSchema>;
