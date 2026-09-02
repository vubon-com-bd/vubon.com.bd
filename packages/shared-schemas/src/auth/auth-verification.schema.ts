/**
 * Auth Verification Schema
 * প্রমাণীকরণ যাচাইকরণ সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { AUTH_VERIFICATION } from '@vubon/shared-constants';

export const AuthVerificationSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  type: z.enum([
    AUTH_VERIFICATION.TYPES.EMAIL,
    AUTH_VERIFICATION.TYPES.PHONE,
    AUTH_VERIFICATION.TYPES.NID,
    AUTH_VERIFICATION.TYPES.BIRTH_REG,
    AUTH_VERIFICATION.TYPES.PASSPORT,
    AUTH_VERIFICATION.TYPES.DRIVING_LICENSE,
    AUTH_VERIFICATION.TYPES.ADDRESS,
    AUTH_VERIFICATION.TYPES.BANK_ACCOUNT,
    AUTH_VERIFICATION.TYPES.MOBILE_WALLET,
    AUTH_VERIFICATION.TYPES.TAX_ID,
    AUTH_VERIFICATION.TYPES.BUSINESS_LICENSE,
    AUTH_VERIFICATION.TYPES.TRADE_LICENSE,
  ]),
  value: z.string().min(1, 'Verification value is required'),
  code: z.string().optional(),
  token: z.string().optional(),
  status: z.enum([
    AUTH_VERIFICATION.STATUS.PENDING,
    AUTH_VERIFICATION.STATUS.VERIFIED,
    AUTH_VERIFICATION.STATUS.REJECTED,
    AUTH_VERIFICATION.STATUS.EXPIRED,
    AUTH_VERIFICATION.STATUS.IN_PROGRESS,
    AUTH_VERIFICATION.STATUS.FAILED,
    AUTH_VERIFICATION.STATUS.CANCELLED,
  ]),
  method: z.enum([
    AUTH_VERIFICATION.METHODS.OTP,
    AUTH_VERIFICATION.METHODS.MAGIC_LINK,
    AUTH_VERIFICATION.METHODS.DOCUMENT,
    AUTH_VERIFICATION.METHODS.BIOMETRIC,
    AUTH_VERIFICATION.METHODS.SOCIAL,
    AUTH_VERIFICATION.METHODS.GOVERNMENT,
    AUTH_VERIFICATION.METHODS.THIRD_PARTY,
    AUTH_VERIFICATION.METHODS.MANUAL,
  ]),
  expiresAt: z.date(),
  verifiedAt: z.date().optional(),
  attempts: z.number().int().min(0).default(0),
  maxAttempts: z.number().int().min(1).default(3),
  metadata: z.record(z.unknown()).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const AuthVerificationCreateSchema = AuthVerificationSchema.omit({
  id: true,
  status: true,
  verifiedAt: true,
  attempts: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  expiresIn: z.number().int().positive().optional(),
  maxAttempts: z.number().int().min(1).default(3).optional(),
});

export const AuthVerificationVerifySchema = z.object({
  code: z.string().optional(),
  token: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type AuthVerificationSchemaType = z.infer<typeof AuthVerificationSchema>;
export type AuthVerificationCreateSchemaType = z.infer<typeof AuthVerificationCreateSchema>;
export type AuthVerificationVerifySchemaType = z.infer<typeof AuthVerificationVerifySchema>;
