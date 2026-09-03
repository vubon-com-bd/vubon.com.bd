/**
 * User Role Schema
 * ইউজার রোল সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { USER_ROLES } from '@vubon/shared-constants';

export const UserRoleSchema = z.enum([
  USER_ROLES.SUPER_ADMIN,
  USER_ROLES.ADMIN,
  USER_ROLES.MODERATOR,
  USER_ROLES.USER,
  USER_ROLES.VENDOR,
  USER_ROLES.GUEST,
  USER_ROLES.MANAGER,
  USER_ROLES.SUPPORT,
  USER_ROLES.DELIVERY_AGENT,
  USER_ROLES.CONTRIBUTOR,
  USER_ROLES.REVIEWER,
  USER_ROLES.EDITOR,
  USER_ROLES.AUTHOR,
  USER_ROLES.SUBSCRIBER,
  USER_ROLES.ANALYST,
  USER_ROLES.ACCOUNTANT,
  USER_ROLES.HR,
  USER_ROLES.TEAM_LEAD,
  USER_ROLES.PROJECT_MANAGER,
]);

export const UserRoleAssignmentSchema = BaseSchema.extend({
  userId: z.string().uuid(),
  role: UserRoleSchema,
  organizationId: z.string().uuid().optional(),
  teamId: z.string().uuid().optional(),
  assignedBy: z.string().uuid(),
  assignedAt: z.date(),
  revokedAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const UserRoleCreateSchema = UserRoleAssignmentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  assignedAt: true,
  revokedAt: true,
});

export const UserRoleUpdateSchema = z.object({
  role: UserRoleSchema.optional(),
  organizationId: z.string().uuid().optional(),
  teamId: z.string().uuid().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type UserRoleSchemaType = z.infer<typeof UserRoleSchema>;
export type UserRoleAssignmentSchemaType = z.infer<typeof UserRoleAssignmentSchema>;
export type UserRoleCreateSchemaType = z.infer<typeof UserRoleCreateSchema>;
export type UserRoleUpdateSchemaType = z.infer<typeof UserRoleUpdateSchema>;
