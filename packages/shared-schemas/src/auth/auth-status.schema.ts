/**
 * Auth Status Schema
 * প্রমাণীকরণ স্ট্যাটাস সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { AUTH } from '@vubon/shared-constants';

export const AuthStatusSchema = z.enum([
  AUTH.STATUS.AUTHENTICATED,
  AUTH.STATUS.UNAUTHENTICATED,
  AUTH.STATUS.VERIFIED,
  AUTH.STATUS.UNVERIFIED,
  AUTH.STATUS.LOCKED,
  AUTH.STATUS.SUSPENDED,
  AUTH.STATUS.DELETED,
  AUTH.STATUS.PENDING,
  AUTH.STATUS.EXPIRED,
  AUTH.STATUS.REVOKED,
]);

export const AuthStatusUpdateSchema = z.object({
  status: AuthStatusSchema,
  reason: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type AuthStatusSchemaType = z.infer<typeof AuthStatusSchema>;
export type AuthStatusUpdateSchemaType = z.infer<typeof AuthStatusUpdateSchema>;
