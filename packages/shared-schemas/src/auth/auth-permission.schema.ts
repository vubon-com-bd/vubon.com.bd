/**
 * Auth Permission Schema
 * প্রমাণীকরণ পারমিশন সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { AUTH_PERMISSION } from '@vubon/shared-constants';

// AUTH_PERMISSION থেকে পারমিশন নাম ব্যবহার
const permissionNames = Object.keys(AUTH_PERMISSION) as [string, ...string[]];

export const AuthPermissionSchema = z.object({
  id: z.string().uuid(),
  name: z.enum(permissionNames as [string, ...string[]]),
  description: z.string().optional(),
  resource: z.string().min(1, 'Resource is required'),
  action: z.enum(['create', 'read', 'update', 'delete', 'manage', 'execute']),
  scope: z.enum(['global', 'organization', 'team', 'user']).default('global'),
  roles: z.array(z.string()),
  conditions: z.record(z.unknown()).optional(),
  enabled: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const AuthPermissionCheckSchema = z.object({
  userId: z.string().uuid(),
  permission: z.enum(permissionNames as [string, ...string[]]),
  resourceId: z.string().optional(),
  organizationId: z.string().optional(),
  teamId: z.string().optional(),
});

export const AuthPermissionResultSchema = z.object({
  granted: z.boolean(),
  reason: z.string().optional(),
  role: z.string().optional(),
  scope: z.string().optional(),
});

export type AuthPermissionSchemaType = z.infer<typeof AuthPermissionSchema>;
export type AuthPermissionCheckSchemaType = z.infer<typeof AuthPermissionCheckSchema>;
export type AuthPermissionResultSchemaType = z.infer<typeof AuthPermissionResultSchema>;
