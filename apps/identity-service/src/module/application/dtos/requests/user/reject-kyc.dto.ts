/**
 * Reject KYC Request DTO
 * @module identity-service/application/dtos/requests/user
 */
import { z } from 'zod';

export const RejectKycRequestSchema = z
  .object({
    kycId: z.string().uuid(),
    reason: z.string().min(5).max(500),
  })
  .strict();

export type RejectKycRequestDTO = z.infer<typeof RejectKycRequestSchema>;
