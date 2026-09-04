/**
 * Admin Audit Schema
 * অ্যাডমিন অডিট সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { ADMIN_AUDIT } from '@vubon/shared-constants';

export const AdminAuditSchema = BaseSchema.extend({
  adminId: z.string().uuid(),
  action: z.enum([
    ADMIN_AUDIT.ACTIONS.CREATE,
    ADMIN_AUDIT.ACTIONS.UPDATE,
    ADMIN_AUDIT.ACTIONS.DELETE,
    ADMIN_AUDIT.ACTIONS.VIEW,
    ADMIN_AUDIT.ACTIONS.EXPORT,
    ADMIN_AUDIT.ACTIONS.IMPORT,
    ADMIN_AUDIT.ACTIONS.LOGIN,
    ADMIN_AUDIT.ACTIONS.LOGOUT,
    ADMIN_AUDIT.ACTIONS.APPROVE,
    ADMIN_AUDIT.ACTIONS.REJECT,
    ADMIN_AUDIT.ACTIONS.SUSPEND,
    ADMIN_AUDIT.ACTIONS.UNSUSPEND,
    ADMIN_AUDIT.ACTIONS.BAN,
    ADMIN_AUDIT.ACTIONS.UNBAN,
    ADMIN_AUDIT.ACTIONS.LOCK,
    ADMIN_AUDIT.ACTIONS.UNLOCK,
    ADMIN_AUDIT.ACTIONS.ROLE_CHANGE,
    ADMIN_AUDIT.ACTIONS.PERMISSION_CHANGE,
    ADMIN_AUDIT.ACTIONS.SETTINGS_CHANGE,
    ADMIN_AUDIT.ACTIONS.PASSWORD_CHANGE,
    ADMIN_AUDIT.ACTIONS.PROFILE_UPDATE,
  ]),
  resource: z.enum([
    ADMIN_AUDIT.RESOURCES.ADMIN,
    ADMIN_AUDIT.RESOURCES.USER,
    ADMIN_AUDIT.RESOURCES.CONTENT,
    ADMIN_AUDIT.RESOURCES.FINANCE,
    ADMIN_AUDIT.RESOURCES.SETTINGS,
    ADMIN_AUDIT.RESOURCES.SYSTEM,
    ADMIN_AUDIT.RESOURCES.ROLE,
    ADMIN_AUDIT.RESOURCES.PERMISSION,
    ADMIN_AUDIT.RESOURCES.REPORT,
    ADMIN_AUDIT.RESOURCES.NOTIFICATION,
  ]),
  resourceId: z.string().optional(),
  status: z
    .enum([ADMIN_AUDIT.STATUS.SUCCESS, ADMIN_AUDIT.STATUS.FAILED, ADMIN_AUDIT.STATUS.PENDING])
    .default(ADMIN_AUDIT.STATUS.SUCCESS),
  details: z.record(z.unknown()).optional(),
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().optional(),
  timestamp: z.date().default(() => new Date()),
});

export const AdminAuditCreateSchema = AdminAuditSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  timestamp: true,
});

export const AdminAuditQuerySchema = z.object({
  adminId: z.string().uuid().optional(),
  action: z
    .enum([
      ADMIN_AUDIT.ACTIONS.CREATE,
      ADMIN_AUDIT.ACTIONS.UPDATE,
      ADMIN_AUDIT.ACTIONS.DELETE,
      ADMIN_AUDIT.ACTIONS.VIEW,
      ADMIN_AUDIT.ACTIONS.EXPORT,
      ADMIN_AUDIT.ACTIONS.IMPORT,
      ADMIN_AUDIT.ACTIONS.LOGIN,
      ADMIN_AUDIT.ACTIONS.LOGOUT,
      ADMIN_AUDIT.ACTIONS.APPROVE,
      ADMIN_AUDIT.ACTIONS.REJECT,
      ADMIN_AUDIT.ACTIONS.SUSPEND,
      ADMIN_AUDIT.ACTIONS.UNSUSPEND,
      ADMIN_AUDIT.ACTIONS.BAN,
      ADMIN_AUDIT.ACTIONS.UNBAN,
      ADMIN_AUDIT.ACTIONS.LOCK,
      ADMIN_AUDIT.ACTIONS.UNLOCK,
      ADMIN_AUDIT.ACTIONS.ROLE_CHANGE,
      ADMIN_AUDIT.ACTIONS.PERMISSION_CHANGE,
      ADMIN_AUDIT.ACTIONS.SETTINGS_CHANGE,
      ADMIN_AUDIT.ACTIONS.PASSWORD_CHANGE,
      ADMIN_AUDIT.ACTIONS.PROFILE_UPDATE,
    ])
    .optional(),
  resource: z
    .enum([
      ADMIN_AUDIT.RESOURCES.ADMIN,
      ADMIN_AUDIT.RESOURCES.USER,
      ADMIN_AUDIT.RESOURCES.CONTENT,
      ADMIN_AUDIT.RESOURCES.FINANCE,
      ADMIN_AUDIT.RESOURCES.SETTINGS,
      ADMIN_AUDIT.RESOURCES.SYSTEM,
      ADMIN_AUDIT.RESOURCES.ROLE,
      ADMIN_AUDIT.RESOURCES.PERMISSION,
      ADMIN_AUDIT.RESOURCES.REPORT,
      ADMIN_AUDIT.RESOURCES.NOTIFICATION,
    ])
    .optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
});

export type AdminAuditSchemaType = z.infer<typeof AdminAuditSchema>;
export type AdminAuditCreateSchemaType = z.infer<typeof AdminAuditCreateSchema>;
export type AdminAuditQuerySchemaType = z.infer<typeof AdminAuditQuerySchema>;
