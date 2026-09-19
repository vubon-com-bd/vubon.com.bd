/**
 * KYC Response Schema
 * @module shared-schemas/user/responses
 */

import { z } from 'zod';
import { UserKycSchema } from './user-kyc.schema';
import { UserVerificationStatusSchema } from './user-verification.schema';

export const KycResponseSchema = z.object({
  success: z.literal(true),
  kyc: UserKycSchema,
});

export const KycSubmitResponseSchema = z.object({
  success: z.literal(true),
  userId: z.string().min(1),
  status: UserVerificationStatusSchema,
  submittedAt: z.string().datetime(),
  message: z.string(),
  estimatedReviewHours: z.number().int().positive(),
});

export const KycStatusResponseSchema = z.object({
  success: z.literal(true),
  status: UserVerificationStatusSchema,
  level: z.number().int().min(0).max(10),
  documentsVerified: z.number().int().nonnegative(),
  documentsPending: z.number().int().nonnegative(),
  rejectionReason: z.string().max(500).optional(),
  updatedAt: z.string().datetime(),
});

export type KycResponseSchemaType = z.infer<typeof KycResponseSchema>;
export type KycSubmitResponseSchemaType = z.infer<typeof KycSubmitResponseSchema>;
export type KycStatusResponseSchemaType = z.infer<typeof KycStatusResponseSchema>;
