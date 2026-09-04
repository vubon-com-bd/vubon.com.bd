/**
 * Admin Role Schema
 * অ্যাডমিন রোল সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { ADMIN_ROLES } from '@vubon/shared-constants';

export const AdminRoleSchema = BaseSchema.extend({
  name: z.enum([
    ADMIN_ROLES.SUPER_ADMIN,
    ADMIN_ROLES.SYSTEM_ADMIN,
    ADMIN_ROLES.ADMIN,
    ADMIN_ROLES.AUTH_ADMIN,
    ADMIN_ROLES.FINANCE_ADMIN,
    ADMIN_ROLES.MANAGER,
    ADMIN_ROLES.AUTH_SERVICE,
    ADMIN_ROLES.AUTH_MANAGER,
    ADMIN_ROLES.CONTENT_ADMIN,
    ADMIN_ROLES.USER_ADMIN,
    ADMIN_ROLES.REPORT_ADMIN,
    ADMIN_ROLES.SETTINGS_ADMIN,
    ADMIN_ROLES.MODERATOR,
    ADMIN_ROLES.SUPPORT,
    ADMIN_ROLES.AUTH_SUPPORT,
  ]),
  description: z.string().optional(),
  hierarchy: z.number().int().min(0).max(100).default(10),
  permissions: z.array(z.string()).default([]),
  isSystem: z.boolean().default(false),
  isDefault: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});

export const AdminRoleCreateSchema = AdminRoleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const AdminRoleUpdateSchema = AdminRoleSchema.partial();

export const AdminRoleAssignmentSchema = z.object({
  adminId: z.string().uuid(),
  roleId: z.string().uuid(),
  assignedBy: z.string().uuid(),
  assignedAt: z.date(),
  revokedAt: z.date().optional(),
});

export type AdminRoleSchemaType = z.infer<typeof AdminRoleSchema>;
export type AdminRoleCreateSchemaType = z.infer<typeof AdminRoleCreateSchema>;
export type AdminRoleUpdateSchemaType = z.infer<typeof AdminRoleUpdateSchema>;
export type AdminRoleAssignmentSchemaType = z.infer<typeof AdminRoleAssignmentSchema>;
