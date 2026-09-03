/**
 * User KYC Schema
 * ইউজার KYC সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { USER_KYC } from '@vubon/shared-constants';

export const UserKYCSchema = BaseSchema.extend({
  userId: z.string().uuid(),
  type: z.enum([
    USER_KYC.TYPES.NID,
    USER_KYC.TYPES.PASSPORT,
    USER_KYC.TYPES.DRIVING_LICENSE,
    USER_KYC.TYPES.BIRTH_REGISTRATION,
    USER_KYC.TYPES.TAX_ID,
    USER_KYC.TYPES.BUSINESS_LICENSE,
    USER_KYC.TYPES.TRADE_LICENSE,
    USER_KYC.TYPES.BANK_STATEMENT,
    USER_KYC.TYPES.UTILITY_BILL,
    USER_KYC.TYPES.MOBILE_BILL,
    USER_KYC.TYPES.ADDRESS_PROOF,
    USER_KYC.TYPES.INCOME_PROOF,
    USER_KYC.TYPES.EDUCATION_PROOF,
  ]),
  status: z.enum([
    USER_KYC.STATUS.NOT_SUBMITTED,
    USER_KYC.STATUS.SUBMITTED,
    USER_KYC.STATUS.PENDING,
    USER_KYC.STATUS.UNDER_REVIEW,
    USER_KYC.STATUS.VERIFIED,
    USER_KYC.STATUS.REJECTED,
    USER_KYC.STATUS.EXPIRED,
    USER_KYC.STATUS.CANCELLED,
    USER_KYC.STATUS.NEEDS_REVISION,
  ]),
  documentType: z.enum([
    USER_KYC.DOCUMENT_TYPES.IDENTITY,
    USER_KYC.DOCUMENT_TYPES.ADDRESS,
    USER_KYC.DOCUMENT_TYPES.INCOME,
    USER_KYC.DOCUMENT_TYPES.BUSINESS,
    USER_KYC.DOCUMENT_TYPES.EDUCATION,
    USER_KYC.DOCUMENT_TYPES.OTHER,
  ]),
  documentNumber: z.string().optional(),
  documentUrl: z.string().url().optional(),
  documentFront: z.string().url().optional(),
  documentBack: z.string().url().optional(),
  selfie: z.string().url().optional(),
  riskLevel: z
    .enum([
      USER_KYC.RISK_LEVELS.LOW,
      USER_KYC.RISK_LEVELS.MEDIUM,
      USER_KYC.RISK_LEVELS.HIGH,
      USER_KYC.RISK_LEVELS.VERY_HIGH,
    ])
    .default(USER_KYC.RISK_LEVELS.LOW),
  submittedAt: z.date().optional(),
  reviewedAt: z.date().optional(),
  expiresAt: z.date().optional(),
  reviewComments: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const UserKYCCreateSchema = UserKYCSchema.omit({
  id: true,
  status: true,
  riskLevel: true,
  submittedAt: true,
  reviewedAt: true,
  expiresAt: true,
  reviewComments: true,
  createdAt: true,
  updatedAt: true,
});

export const UserKYCUpdateSchema = UserKYCSchema.partial();

export type UserKYCSchemaType = z.infer<typeof UserKYCSchema>;
export type UserKYCCreateSchemaType = z.infer<typeof UserKYCCreateSchema>;
export type UserKYCUpdateSchemaType = z.infer<typeof UserKYCUpdateSchema>;
