/**
 * Reverify KYC Request DTO
 * @module identity-service/application/dtos/requests/kyc
 */
import { z } from 'zod';
import { USER_KYC } from '@vubon/shared-constants/user';

export const ReverifyKycRequestSchema = z
  .object({
    documents: z
      .array(
        z.object({
          type: z.string().min(1).max(50),
          number: z.string().min(1).max(100),
          frontUrl: z.string().url(),
          backUrl: z.string().url().optional(),
          selfieUrl: z.string().url().optional(),
        }),
      )
      .min(1)
      .max(USER_KYC.MAX_DOCUMENTS),
  })
  .strict();

export type ReverifyKycRequestDTO = z.infer<typeof ReverifyKycRequestSchema>;
