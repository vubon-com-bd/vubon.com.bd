/**
 * User KYC Schema
 * @module shared-schemas/user
 *
 * Values আসে shared-constants/user/user-kyc.constants থেকে।
 */

import { z } from 'zod';
import {
  USER_KYC_STATUS,
  USER_KYC_LEVEL,
  USER_KYC_DOCUMENT,
  USER_KYC,
} from '@vubon/shared-constants/user';
import { UuidSchema } from '../common/primitives/uuid.schema';

export const KycStatusSchema = z.enum(Object.values(USER_KYC_STATUS) as [string, ...string[]]);

export const KycLevelSchema = z.number().int().min(USER_KYC_LEVEL.NONE).max(USER_KYC_LEVEL.FULL);

export const KycDocumentTypeSchema = z.enum(
  Object.values(USER_KYC_DOCUMENT) as [string, ...string[]]
);

export const KycDocumentSchema = z.object({
  id: UuidSchema,
  type: KycDocumentTypeSchema,
  number: z.string().max(100).optional(),
  frontUrl: z.string().url(),
  backUrl: z.string().url().optional(),
  selfieUrl: z.string().url().optional(),
  verified: z.boolean(),
  uploadedAt: z.string().datetime(),
});

export const UserKycSchema = z.object({
  userId: UuidSchema,
  status: KycStatusSchema,
  level: KycLevelSchema,
  documents: z.array(KycDocumentSchema).max(USER_KYC.MAX_DOCUMENTS),
  submittedAt: z.string().datetime().optional(),
  reviewedAt: z.string().datetime().optional(),
  reviewedBy: z.string().optional(),
  rejectionReason: z.string().max(500).optional(),
  expiresAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime(),
});

export const KycDocumentInputSchema = KycDocumentSchema.omit({
  id: true,
  verified: true,
  uploadedAt: true,
});

export const UserKycInputSchema = z.object({
  userId: UuidSchema,
  documents: z.array(KycDocumentInputSchema).min(1).max(USER_KYC.MAX_DOCUMENTS),
});

export type KycStatusSchemaType = z.infer<typeof KycStatusSchema>;
export type KycLevelSchemaType = z.infer<typeof KycLevelSchema>;
export type KycDocumentTypeSchemaType = z.infer<typeof KycDocumentTypeSchema>;
export type KycDocumentSchemaType = z.infer<typeof KycDocumentSchema>;
export type UserKycSchemaType = z.infer<typeof UserKycSchema>;
export type UserKycInputSchemaType = z.infer<typeof UserKycInputSchema>;
