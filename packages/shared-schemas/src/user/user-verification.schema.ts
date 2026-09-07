import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { VERIFICATION } from '@vubon/shared-constants';
import { USER_VERIFICATION } from '@vubon/shared-constants';

export const UserVerificationSchema = BaseSchema.extend({
  verificationId: z.string().uuid(),
  userId: z.string().uuid(),
  type: z.enum(Object.keys(USER_VERIFICATION) as [string, ...string[]]),
  status: z.enum(Object.keys(VERIFICATION) as [string, ...string[]]),
  documentId: z.string().optional(),
  verifiedAt: z.date().optional(),
  expiresAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});
