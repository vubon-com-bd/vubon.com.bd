/**
 * Admin Activity Schema
 * অ্যাডমিন অ্যাক্টিভিটি সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { ADMIN_ACTIVITY } from '@vubon/shared-constants';

export const AdminActivitySchema = BaseSchema.extend({
  adminId: z.string().uuid(),
  type: z.enum([
    ADMIN_ACTIVITY.TYPES.LOGIN,
    ADMIN_ACTIVITY.TYPES.LOGOUT,
    ADMIN_ACTIVITY.TYPES.CREATE,
    ADMIN_ACTIVITY.TYPES.UPDATE,
    ADMIN_ACTIVITY.TYPES.DELETE,
    ADMIN_ACTIVITY.TYPES.VIEW,
    ADMIN_ACTIVITY.TYPES.EXPORT,
    ADMIN_ACTIVITY.TYPES.IMPORT,
    ADMIN_ACTIVITY.TYPES.APPROVE,
    ADMIN_ACTIVITY.TYPES.REJECT,
    ADMIN_ACTIVITY.TYPES.SUSPEND,
    ADMIN_ACTIVITY.TYPES.UNSUSPEND,
    ADMIN_ACTIVITY.TYPES.BAN,
    ADMIN_ACTIVITY.TYPES.UNBAN,
    ADMIN_ACTIVITY.TYPES.LOCK,
    ADMIN_ACTIVITY.TYPES.UNLOCK,
    ADMIN_ACTIVITY.TYPES.ROLE_CHANGE,
    ADMIN_ACTIVITY.TYPES.PERMISSION_CHANGE,
    ADMIN_ACTIVITY.TYPES.SETTINGS_CHANGE,
    ADMIN_ACTIVITY.TYPES.PASSWORD_CHANGE,
    ADMIN_ACTIVITY.TYPES.PROFILE_UPDATE,
  ]),
  status: z
    .enum([
      ADMIN_ACTIVITY.STATUS.SUCCESS,
      ADMIN_ACTIVITY.STATUS.FAILED,
      ADMIN_ACTIVITY.STATUS.PENDING,
      ADMIN_ACTIVITY.STATUS.IN_PROGRESS,
      ADMIN_ACTIVITY.STATUS.CANCELLED,
    ])
    .default(ADMIN_ACTIVITY.STATUS.SUCCESS),
  importance: z
    .enum([
      ADMIN_ACTIVITY.IMPORTANCE.LOW,
      ADMIN_ACTIVITY.IMPORTANCE.MEDIUM,
      ADMIN_ACTIVITY.IMPORTANCE.HIGH,
      ADMIN_ACTIVITY.IMPORTANCE.CRITICAL,
    ])
    .default(ADMIN_ACTIVITY.IMPORTANCE.LOW),
  description: z.string().optional(),
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().optional(),
  location: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
  timestamp: z.date().default(() => new Date()),
});

export const AdminActivityCreateSchema = AdminActivitySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  timestamp: true,
});

export const AdminActivityFilterSchema = z.object({
  adminId: z.string().uuid().optional(),
  type: z
    .enum([
      ADMIN_ACTIVITY.TYPES.LOGIN,
      ADMIN_ACTIVITY.TYPES.LOGOUT,
      ADMIN_ACTIVITY.TYPES.CREATE,
      ADMIN_ACTIVITY.TYPES.UPDATE,
      ADMIN_ACTIVITY.TYPES.DELETE,
      ADMIN_ACTIVITY.TYPES.VIEW,
      ADMIN_ACTIVITY.TYPES.EXPORT,
      ADMIN_ACTIVITY.TYPES.IMPORT,
      ADMIN_ACTIVITY.TYPES.APPROVE,
      ADMIN_ACTIVITY.TYPES.REJECT,
      ADMIN_ACTIVITY.TYPES.SUSPEND,
      ADMIN_ACTIVITY.TYPES.UNSUSPEND,
      ADMIN_ACTIVITY.TYPES.BAN,
      ADMIN_ACTIVITY.TYPES.UNBAN,
      ADMIN_ACTIVITY.TYPES.LOCK,
      ADMIN_ACTIVITY.TYPES.UNLOCK,
      ADMIN_ACTIVITY.TYPES.ROLE_CHANGE,
      ADMIN_ACTIVITY.TYPES.PERMISSION_CHANGE,
      ADMIN_ACTIVITY.TYPES.SETTINGS_CHANGE,
      ADMIN_ACTIVITY.TYPES.PASSWORD_CHANGE,
      ADMIN_ACTIVITY.TYPES.PROFILE_UPDATE,
    ])
    .optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
});

export type AdminActivitySchemaType = z.infer<typeof AdminActivitySchema>;
export type AdminActivityCreateSchemaType = z.infer<typeof AdminActivityCreateSchema>;
export type AdminActivityFilterSchemaType = z.infer<typeof AdminActivityFilterSchema>;
