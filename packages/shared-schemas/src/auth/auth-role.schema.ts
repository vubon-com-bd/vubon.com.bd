/**
 * Auth Role Schema
 * প্রমাণীকরণ রোল সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { AUTH_ROLE } from '@vubon/shared-constants';

export const AuthRoleSchema = z.object({
  id: z.string().uuid(),
  name: z.enum([
    AUTH_ROLE.SUPER_ADMIN,
    AUTH_ROLE.ADMIN,
    AUTH_ROLE.MODERATOR,
    AUTH_ROLE.USER,
    AUTH_ROLE.VENDOR,
    AUTH_ROLE.GUEST,
    AUTH_ROLE.MANAGER,
    AUTH_ROLE.SUPPORT,
    AUTH_ROLE.DELIVERY_AGENT,
    AUTH_ROLE.AUTH_SERVICE,
    AUTH_ROLE.AUTH_ADMIN,
    AUTH_ROLE.AUTH_MANAGER,
    AUTH_ROLE.AUTH_SUPPORT,
    AUTH_ROLE.AUTH_USER,
  ]),
  displayName: z.string().min(1, 'Display name is required'),
  description: z.string().optional(),
  hierarchy: z.number().int().min(0).max(100).default(10),
  permissions: z.array(z.string()).default([]),
  isDefault: z.boolean().default(false),
  isSystem: z.boolean().default(false),
  enabled: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const AuthRoleAssignmentSchema = z.object({
  userId: z.string().uuid(),
  roleId: z.string().uuid(),
  organizationId: z.string().optional(),
  teamId: z.string().optional(),
  assignedBy: z.string().uuid(),
  assignedAt: z.date(),
  revokedAt: z.date().optional(),
});

export const AuthRoleCreateSchema = AuthRoleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type AuthRoleSchemaType = z.infer<typeof AuthRoleSchema>;
export type AuthRoleAssignmentSchemaType = z.infer<typeof AuthRoleAssignmentSchema>;
export type AuthRoleCreateSchemaType = z.infer<typeof AuthRoleCreateSchema>;
