/**
 * Admin Permission Schema
 * অ্যাডমিন পারমিশন সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { ADMIN_PERMISSIONS, ADMIN_ROLES } from '@vubon/shared-constants';

const permissionNames = Object.keys(ADMIN_PERMISSIONS) as [string, ...string[]];
const roleValues = Object.values(ADMIN_ROLES) as [string, ...string[]];

export const AdminPermissionSchema = BaseSchema.extend({
  name: z.enum(permissionNames),
  resource: z.string().min(1, 'Resource is required'),
  action: z.enum(['create', 'read', 'update', 'delete', 'manage', 'execute']),
  roles: z.array(z.enum(roleValues)).default([]),
  conditions: z.record(z.unknown()).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const AdminPermissionCreateSchema = AdminPermissionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const AdminPermissionUpdateSchema = AdminPermissionSchema.partial();

export const AdminPermissionCheckSchema = z.object({
  adminId: z.string().uuid(),
  permission: z.enum(permissionNames),
  resourceId: z.string().optional(),
});

export const AdminPermissionResultSchema = z.object({
  granted: z.boolean(),
  reason: z.string().optional(),
  role: z.string().optional(),
});

export type AdminPermissionSchemaType = z.infer<typeof AdminPermissionSchema>;
export type AdminPermissionCreateSchemaType = z.infer<typeof AdminPermissionCreateSchema>;
export type AdminPermissionUpdateSchemaType = z.infer<typeof AdminPermissionUpdateSchema>;
export type AdminPermissionCheckSchemaType = z.infer<typeof AdminPermissionCheckSchema>;
export type AdminPermissionResultSchemaType = z.infer<typeof AdminPermissionResultSchema>;
