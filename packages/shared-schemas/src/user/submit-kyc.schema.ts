/**
 * Submit KYC Request Schema
 * @module shared-schemas/user/requests
 */

import { z } from 'zod';
import { USER_KYC } from '@vubon/shared-constants/user';
import { KycDocumentInputSchema } from './user-kyc.schema';

export const SubmitKycRequestSchema = z
  .object({
    documents: z
      .array(KycDocumentInputSchema)
      .min(1, 'At least one document required')
      .max(USER_KYC.MAX_DOCUMENTS, 'Too many documents'),
    acceptTerms: z.literal(true),
  })
  .strict();

export type SubmitKycRequestSchemaType = z.infer<typeof SubmitKycRequestSchema>;
