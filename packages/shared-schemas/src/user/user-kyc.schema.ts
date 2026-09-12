import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { USER_KYC } from '@vubon/shared-constants/src/user/user-kyc.constants';
import { STATUS } from '@vubon/shared-constants/src/common/status.constants';
import { DOCUMENT } from '@vubon/shared-constants/src/common/document.constants';

const userKycValues = Object.values(USER_KYC) as [string, ...string[]];
const verificationStatusValues = Object.values(STATUS.VERIFICATION) as [string, ...string[]];
const documentTypeValues = Object.values(DOCUMENT.TYPES) as [string, ...string[]];

/**
 * Internal UserKyc entity.
 * ⚠️ documentNumberHash and documentImageUrl are @internal — never expose.
 */
export const UserKycSchema = BaseSchema.extend({
  kycId: z.string().uuid(),
  userId: z.string().uuid(),
  type: z.enum(userKycValues),
  documentType: z.enum(documentTypeValues),
  /** @internal bcrypt/SHA-256 hash of the document number */
  documentNumberHash: z.string().min(20).max(512),
  /** @internal S3 / secure storage URL (not base64) */
  documentImageUrl: z.string().url(),
  status: z.enum(verificationStatusValues),
  submittedAt: z.date(),
  verifiedAt: z.date().optional(),
  rejectedReason: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

/**
 * Input schema — client sends the raw document number; server hashes it.
 */
export const UserKycInputSchema = z.object({
  userId: z.string().uuid(),
  type: z.enum(userKycValues),
  documentType: z.enum(documentTypeValues),
  documentNumber: z.string().min(4).max(64),
  documentImageUrl: z.string().url(),
});

/**
 * Public-safe UserKyc DTO — no document hash/URL.
 */
export const UserKycPublicSchema = UserKycSchema.omit({
  documentNumberHash: true,
  documentImageUrl: true,
  metadata: true,
});
