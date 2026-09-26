/**
 * Verification Schema
 * @module shared-schemas/security
 *
 * Values আসে shared-constants/security/verification.constants থেকে।
 *
 * ⚠️ Note: KycDocumentSchema এবং KycDataSchema user/user-kyc.schema.ts-এ আছে।
 * এখানে SecurityKycDocumentSchema।
 */

import { z } from 'zod';
import { VERIFICATION_TYPE, VERIFICATION_STATUS, OTP } from '@vubon/shared-constants/security';
import { EmailSchema } from '../common/primitives/email.schema';
import { PhoneSchema } from '../common/primitives/phone.schema';

export const VerificationTypeSchema = z.enum(
  Object.values(VERIFICATION_TYPE) as [string, ...string[]]
);

export const VerificationStatusSchema = z.enum(
  Object.values(VERIFICATION_STATUS) as [string, ...string[]]
);

export const OtpConfigSchema = z.object({
  length: z.number().int().min(OTP.MIN_LENGTH).max(OTP.MAX_LENGTH),
  expirySeconds: z.number().int().positive().max(3600),
  maxAttempts: z.number().int().positive().max(10),
  resendCooldownSeconds: z.number().int().nonnegative().max(600),
});

export const VerificationDataSchema = z.object({
  id: z.string().min(1),
  type: VerificationTypeSchema,
  status: VerificationStatusSchema,
  targetId: z.string().min(1),
  targetValue: z.union([EmailSchema, PhoneSchema, z.string().min(1).max(255)]),
  code: z
    .string()
    .regex(/^\d{4,8}$/)
    .optional(),
  token: z.string().min(1).max(255).optional(),
  attempts: z.number().int().nonnegative(),
  maxAttempts: z.number().int().positive(),
  createdAt: z.string().datetime(),
  expiresAt: z.string().datetime(),
  verifiedAt: z.string().datetime().optional(),
});

export const VerificationRequestSchema = z.object({
  type: VerificationTypeSchema,
  target: z.union([EmailSchema, PhoneSchema]),
  channel: z.string().max(20).optional(),
});

export const VerificationResultSchema = z.object({
  verified: z.boolean(),
  status: VerificationStatusSchema,
  message: z.string().optional(),
  verifiedAt: z.string().datetime().optional(),
});

export const SecurityKycDocumentSchema = z.object({
  id: z.string().min(1),
  type: z.string().min(1).max(50),
  number: z.string().max(100).optional(),
  fileUrl: z.string().url(),
  verified: z.boolean(),
  uploadedAt: z.string().datetime(),
});

export const KycDataSchema = z.object({
  userId: z.string().min(1),
  status: VerificationStatusSchema,
  level: z.number().int().min(0).max(10),
  documents: z.array(SecurityKycDocumentSchema).max(20),
  submittedAt: z.string().datetime(),
  reviewedAt: z.string().datetime().optional(),
  reviewedBy: z.string().optional(),
  rejectionReason: z.string().max(500).optional(),
});

export type VerificationTypeSchemaType = z.infer<typeof VerificationTypeSchema>;
export type VerificationStatusSchemaType = z.infer<typeof VerificationStatusSchema>;
export type OtpConfigSchemaType = z.infer<typeof OtpConfigSchema>;
export type VerificationDataSchemaType = z.infer<typeof VerificationDataSchema>;
export type VerificationRequestSchemaType = z.infer<typeof VerificationRequestSchema>;
export type VerificationResultSchemaType = z.infer<typeof VerificationResultSchema>;
export type SecurityKycDocumentSchemaType = z.infer<typeof SecurityKycDocumentSchema>;
export type KycDataSchemaType = z.infer<typeof KycDataSchema>;
