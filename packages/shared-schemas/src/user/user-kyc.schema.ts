import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { USER_KYC } from '@vubon/shared-constants/src/user/user-kyc.constants';

const userKycKeys = Object.keys(USER_KYC) as [string, ...string[]];

export const UserKycSchema = BaseSchema.extend({
  kycId: z.string().uuid(),
  userId: z.string().uuid(),
  type: z.enum(userKycKeys),
  documentType: z.string(),
  documentNumber: z.string(),
  documentImage: z.string().url(),
  status: z.enum(['pending', 'approved', 'rejected']),
  submittedAt: z.date(),
  verifiedAt: z.date().optional(),
  rejectedReason: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});
