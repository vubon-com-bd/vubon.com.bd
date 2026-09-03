/**
 * User Permission Schema
 * ইউজার পারমিশন সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { USER_PERMISSIONS } from '@vubon/shared-constants';

const permissionNames = Object.keys(USER_PERMISSIONS) as [string, ...string[]];

export const UserPermissionSchema = BaseSchema.extend({
  userId: z.string().uuid(),
  permission: z.enum(permissionNames),
  resource: z.string().min(1, 'Resource is required'),
  action: z.enum(['create', 'read', 'update', 'delete', 'manage', 'execute']),
  scope: z.enum(['global', 'organization', 'team', 'user']).default('global'),
  conditions: z.record(z.unknown()).optional(),
  grantedBy: z.string().uuid(),
  grantedAt: z.date(),
  revokedAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const UserPermissionCreateSchema = UserPermissionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  grantedAt: true,
  revokedAt: true,
});

export const UserPermissionUpdateSchema = z.object({
  permission: z.enum(permissionNames).optional(),
  resource: z.string().optional(),
  action: z.enum(['create', 'read', 'update', 'delete', 'manage', 'execute']).optional(),
  scope: z.enum(['global', 'organization', 'team', 'user']).optional(),
  conditions: z.record(z.unknown()).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const UserPermissionCheckSchema = z.object({
  userId: z.string().uuid(),
  permission: z.enum(permissionNames),
  resourceId: z.string().optional(),
  organizationId: z.string().optional(),
  teamId: z.string().optional(),
});

export type UserPermissionSchemaType = z.infer<typeof UserPermissionSchema>;
export type UserPermissionCreateSchemaType = z.infer<typeof UserPermissionCreateSchema>;
export type UserPermissionUpdateSchemaType = z.infer<typeof UserPermissionUpdateSchema>;
export type UserPermissionCheckSchemaType = z.infer<typeof UserPermissionCheckSchema>;
