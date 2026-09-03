/**
 * User Status Schema
 * ইউজার স্ট্যাটাস সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { USER_STATUS } from '@vubon/shared-constants';

export const UserStatusSchema = z.enum([
  USER_STATUS.ACTIVE,
  USER_STATUS.INACTIVE,
  USER_STATUS.PENDING,
  USER_STATUS.DELETED,
  USER_STATUS.SUSPENDED,
  USER_STATUS.BANNED,
  USER_STATUS.VERIFIED,
  USER_STATUS.UNVERIFIED,
  USER_STATUS.LOCKED,
  USER_STATUS.RESTRICTED,
]);

export const UserStatusHistorySchema = BaseSchema.extend({
  userId: z.string().uuid(),
  status: UserStatusSchema,
  previousStatus: UserStatusSchema.optional(),
  reason: z.string().optional(),
  changedBy: z.string().uuid().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const UserStatusUpdateSchema = z.object({
  status: UserStatusSchema,
  reason: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type UserStatusSchemaType = z.infer<typeof UserStatusSchema>;
export type UserStatusHistorySchemaType = z.infer<typeof UserStatusHistorySchema>;
export type UserStatusUpdateSchemaType = z.infer<typeof UserStatusUpdateSchema>;
