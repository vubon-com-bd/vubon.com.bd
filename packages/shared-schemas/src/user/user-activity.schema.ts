/**
 * User Activity Schema
 * ইউজার অ্যাক্টিভিটি সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { USER_ACTIVITY } from '@vubon/shared-constants';

export const UserActivitySchema = BaseSchema.extend({
  userId: z.string().uuid(),
  type: z.enum([
    USER_ACTIVITY.TYPES.LOGIN,
    USER_ACTIVITY.TYPES.LOGOUT,
    USER_ACTIVITY.TYPES.REGISTER,
    USER_ACTIVITY.TYPES.PROFILE_UPDATE,
    USER_ACTIVITY.TYPES.PASSWORD_CHANGE,
    USER_ACTIVITY.TYPES.EMAIL_CHANGE,
    USER_ACTIVITY.TYPES.PHONE_CHANGE,
    USER_ACTIVITY.TYPES.ADDRESS_CHANGE,
    USER_ACTIVITY.TYPES.SETTINGS_CHANGE,
    USER_ACTIVITY.TYPES.PREFERENCE_CHANGE,
    USER_ACTIVITY.TYPES.VERIFICATION,
    USER_ACTIVITY.TYPES.KYC_SUBMIT,
    USER_ACTIVITY.TYPES.KYC_VERIFY,
    USER_ACTIVITY.TYPES.PAYMENT,
    USER_ACTIVITY.TYPES.ORDER,
    USER_ACTIVITY.TYPES.REVIEW,
    USER_ACTIVITY.TYPES.COMMENT,
    USER_ACTIVITY.TYPES.SHARE,
    USER_ACTIVITY.TYPES.LIKE,
    USER_ACTIVITY.TYPES.FOLLOW,
    USER_ACTIVITY.TYPES.UNFOLLOW,
    USER_ACTIVITY.TYPES.BLOCK,
    USER_ACTIVITY.TYPES.UNBLOCK,
    USER_ACTIVITY.TYPES.REPORT,
    USER_ACTIVITY.TYPES.EXPORT,
    USER_ACTIVITY.TYPES.IMPORT,
  ]),
  status: z
    .enum([
      USER_ACTIVITY.STATUS.SUCCESS,
      USER_ACTIVITY.STATUS.FAILED,
      USER_ACTIVITY.STATUS.PENDING,
      USER_ACTIVITY.STATUS.IN_PROGRESS,
      USER_ACTIVITY.STATUS.CANCELLED,
    ])
    .default(USER_ACTIVITY.STATUS.SUCCESS),
  importance: z
    .enum([
      USER_ACTIVITY.IMPORTANCE.LOW,
      USER_ACTIVITY.IMPORTANCE.MEDIUM,
      USER_ACTIVITY.IMPORTANCE.HIGH,
      USER_ACTIVITY.IMPORTANCE.CRITICAL,
    ])
    .default(USER_ACTIVITY.IMPORTANCE.LOW),
  description: z.string().optional(),
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().optional(),
  location: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
  timestamp: z.date().default(() => new Date()),
});

export const UserActivityCreateSchema = UserActivitySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  timestamp: true,
});

export const UserActivityFilterSchema = z.object({
  userId: z.string().uuid().optional(),
  type: z
    .enum([
      USER_ACTIVITY.TYPES.LOGIN,
      USER_ACTIVITY.TYPES.LOGOUT,
      USER_ACTIVITY.TYPES.REGISTER,
      USER_ACTIVITY.TYPES.PROFILE_UPDATE,
      USER_ACTIVITY.TYPES.PASSWORD_CHANGE,
      USER_ACTIVITY.TYPES.EMAIL_CHANGE,
      USER_ACTIVITY.TYPES.PHONE_CHANGE,
      USER_ACTIVITY.TYPES.ADDRESS_CHANGE,
      USER_ACTIVITY.TYPES.SETTINGS_CHANGE,
      USER_ACTIVITY.TYPES.PREFERENCE_CHANGE,
      USER_ACTIVITY.TYPES.VERIFICATION,
      USER_ACTIVITY.TYPES.KYC_SUBMIT,
      USER_ACTIVITY.TYPES.KYC_VERIFY,
      USER_ACTIVITY.TYPES.PAYMENT,
      USER_ACTIVITY.TYPES.ORDER,
      USER_ACTIVITY.TYPES.REVIEW,
      USER_ACTIVITY.TYPES.COMMENT,
      USER_ACTIVITY.TYPES.SHARE,
      USER_ACTIVITY.TYPES.LIKE,
      USER_ACTIVITY.TYPES.FOLLOW,
      USER_ACTIVITY.TYPES.UNFOLLOW,
      USER_ACTIVITY.TYPES.BLOCK,
      USER_ACTIVITY.TYPES.UNBLOCK,
      USER_ACTIVITY.TYPES.REPORT,
      USER_ACTIVITY.TYPES.EXPORT,
      USER_ACTIVITY.TYPES.IMPORT,
    ])
    .optional(),
  status: z
    .enum([
      USER_ACTIVITY.STATUS.SUCCESS,
      USER_ACTIVITY.STATUS.FAILED,
      USER_ACTIVITY.STATUS.PENDING,
      USER_ACTIVITY.STATUS.IN_PROGRESS,
      USER_ACTIVITY.STATUS.CANCELLED,
    ])
    .optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
});

export type UserActivitySchemaType = z.infer<typeof UserActivitySchema>;
export type UserActivityCreateSchemaType = z.infer<typeof UserActivityCreateSchema>;
export type UserActivityFilterSchemaType = z.infer<typeof UserActivityFilterSchema>;
