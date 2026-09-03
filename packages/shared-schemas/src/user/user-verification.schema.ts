/**
 * User Verification Schema
 * ইউজার ভেরিফিকেশন সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { USER_VERIFICATION } from '@vubon/shared-constants';

export const UserVerificationSchema = BaseSchema.extend({
  userId: z.string().uuid(),
  method: z.enum([
    USER_VERIFICATION.METHODS.EMAIL,
    USER_VERIFICATION.METHODS.PHONE,
    USER_VERIFICATION.METHODS.NID,
    USER_VERIFICATION.METHODS.PASSPORT,
    USER_VERIFICATION.METHODS.DRIVING_LICENSE,
    USER_VERIFICATION.METHODS.BIRTH_REGISTRATION,
    USER_VERIFICATION.METHODS.TAX_ID,
    USER_VERIFICATION.METHODS.BUSINESS_LICENSE,
    USER_VERIFICATION.METHODS.TRADE_LICENSE,
    USER_VERIFICATION.METHODS.BANK_ACCOUNT,
    USER_VERIFICATION.METHODS.MOBILE_WALLET,
    USER_VERIFICATION.METHODS.ADDRESS,
    USER_VERIFICATION.METHODS.SOCIAL,
    USER_VERIFICATION.METHODS.BIOMETRIC,
    USER_VERIFICATION.METHODS.FACIAL,
  ]),
  value: z.string().min(1, 'Verification value is required'),
  code: z.string().optional(),
  token: z.string().optional(),
  status: z.enum([
    USER_VERIFICATION.STATUS.PENDING,
    USER_VERIFICATION.STATUS.VERIFIED,
    USER_VERIFICATION.STATUS.REJECTED,
    USER_VERIFICATION.STATUS.EXPIRED,
    USER_VERIFICATION.STATUS.IN_PROGRESS,
    USER_VERIFICATION.STATUS.FAILED,
    USER_VERIFICATION.STATUS.CANCELLED,
    USER_VERIFICATION.STATUS.AWAITING_REVIEW,
  ]),
  level: z.enum([
    USER_VERIFICATION.LEVELS.BASIC,
    USER_VERIFICATION.LEVELS.STANDARD,
    USER_VERIFICATION.LEVELS.PREMIUM,
    USER_VERIFICATION.LEVELS.ENTERPRISE,
    USER_VERIFICATION.LEVELS.VERIFIED,
  ]),
  expiresAt: z.date(),
  verifiedAt: z.date().optional(),
  attempts: z.number().int().min(0).default(0),
  maxAttempts: z.number().int().min(1).default(USER_VERIFICATION.DEFAULTS.MAX_ATTEMPTS),
  metadata: z.record(z.unknown()).optional(),
});

export const UserVerificationCreateSchema = UserVerificationSchema.omit({
  id: true,
  status: true,
  verifiedAt: true,
  attempts: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  expiresIn: z.number().int().positive().optional(),
});

export const UserVerificationVerifySchema = z.object({
  code: z.string().optional(),
  token: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type UserVerificationSchemaType = z.infer<typeof UserVerificationSchema>;
export type UserVerificationCreateSchemaType = z.infer<typeof UserVerificationCreateSchema>;
export type UserVerificationVerifySchemaType = z.infer<typeof UserVerificationVerifySchema>;
