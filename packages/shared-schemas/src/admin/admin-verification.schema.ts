/**
 * Admin Verification Schema
 * অ্যাডমিন ভেরিফিকেশন সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { ADMIN_VERIFICATION } from '@vubon/shared-constants';

export const AdminVerificationSchema = BaseSchema.extend({
  adminId: z.string().uuid(),
  method: z.enum([
    ADMIN_VERIFICATION.METHODS.EMAIL,
    ADMIN_VERIFICATION.METHODS.PHONE,
    ADMIN_VERIFICATION.METHODS.NID,
    ADMIN_VERIFICATION.METHODS.PASSPORT,
    ADMIN_VERIFICATION.METHODS.DRIVING_LICENSE,
    ADMIN_VERIFICATION.METHODS.BIRTH_REGISTRATION,
    ADMIN_VERIFICATION.METHODS.TAX_ID,
    ADMIN_VERIFICATION.METHODS.BUSINESS_LICENSE,
    ADMIN_VERIFICATION.METHODS.TRADE_LICENSE,
    ADMIN_VERIFICATION.METHODS.BANK_ACCOUNT,
    ADMIN_VERIFICATION.METHODS.MOBILE_WALLET,
    ADMIN_VERIFICATION.METHODS.ADDRESS,
    ADMIN_VERIFICATION.METHODS.SOCIAL,
    ADMIN_VERIFICATION.METHODS.BIOMETRIC,
  ]),
  value: z.string().min(1, 'Verification value is required'),
  status: z.enum([
    ADMIN_VERIFICATION.STATUS.PENDING,
    ADMIN_VERIFICATION.STATUS.VERIFIED,
    ADMIN_VERIFICATION.STATUS.REJECTED,
    ADMIN_VERIFICATION.STATUS.EXPIRED,
    ADMIN_VERIFICATION.STATUS.IN_PROGRESS,
    ADMIN_VERIFICATION.STATUS.FAILED,
    ADMIN_VERIFICATION.STATUS.CANCELLED,
    ADMIN_VERIFICATION.STATUS.AWAITING_REVIEW,
  ]),
  code: z.string().optional(),
  token: z.string().optional(),
  expiresAt: z.date(),
  verifiedAt: z.date().optional(),
  attempts: z.number().int().min(0).default(0),
  maxAttempts: z.number().int().min(1).default(ADMIN_VERIFICATION.DEFAULTS.MAX_ATTEMPTS),
  metadata: z.record(z.unknown()).optional(),
});

export const AdminVerificationCreateSchema = AdminVerificationSchema.omit({
  id: true,
  status: true,
  verifiedAt: true,
  attempts: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  expiresIn: z.number().int().positive().optional(),
});

export const AdminVerificationVerifySchema = z.object({
  code: z.string().optional(),
  token: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type AdminVerificationSchemaType = z.infer<typeof AdminVerificationSchema>;
export type AdminVerificationCreateSchemaType = z.infer<typeof AdminVerificationCreateSchema>;
export type AdminVerificationVerifySchemaType = z.infer<typeof AdminVerificationVerifySchema>;
