import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { UserSchema } from '../user/user.schema';
import { AuthSchema } from '../auth/auth.schema';
import { ADMIN_STATUS } from '@vubon/shared-constants/src/admin/admin-status.constants';
import { ADMIN_TYPES } from '@vubon/shared-constants/src/admin/admin-type.constants';
import { ADMIN_LEVEL } from '@vubon/shared-constants/src/admin/admin-level.constants';
import { ADMIN_DEPARTMENT } from '@vubon/shared-constants/src/admin/admin-department.constants';
import { ADMIN_ROLES } from '@vubon/shared-constants/src/admin/admin-role.constants';
import { ADMIN_PERMISSIONS } from '@vubon/shared-constants/src/admin/admin-permission.constants';

// Object.values — we need enum VALUES ('active', 'it'), not keys.
const adminStatusValues = Object.values(ADMIN_STATUS) as [string, ...string[]];
const adminTypeValues = Object.values(ADMIN_TYPES) as [string, ...string[]];
const adminLevelValues = Object.values(ADMIN_LEVEL) as [string, ...string[]];
const adminDepartmentValues = Object.values(ADMIN_DEPARTMENT) as [string, ...string[]];
const adminRoleValues = Object.values(ADMIN_ROLES) as [string, ...string[]];
const adminPermissionValues = Object.values(ADMIN_PERMISSIONS) as [string, ...string[]];

/**
 * Internal Admin entity.
 * ⚠️ Embeds UserSchema + AuthSchema — never serialize to clients.
 * Use AdminPublicSchema for API responses.
 */
export const AdminSchema = BaseSchema.extend({
  adminId: z.string().uuid(),
  userId: z.string().uuid(),
  /** @internal */
  user: UserSchema,
  /** @internal */
  auth: AuthSchema,
  status: z.enum(adminStatusValues),
  type: z.enum(adminTypeValues),
  level: z.enum(adminLevelValues),
  department: z.enum(adminDepartmentValues),
  role: z.enum(adminRoleValues),
  permissions: z.array(z.enum(adminPermissionValues)),
  isSuperAdmin: z.boolean().default(false),
  isActive: z.boolean().default(true),
  lastLoginAt: z.date().optional(),
  joinedAt: z.date(),
  metadata: z.object({
    employeeId: z.string(),
    title: z.string(),
    reportsTo: z.string().uuid().optional(),
    skills: z.array(z.string()).optional(),
    languages: z.array(z.string()).optional(),
    timezone: z.string().optional(),
  }),
});

/**
 * Public-safe Admin DTO — no user/auth embeds, no internal metadata.
 */
export const AdminPublicSchema = AdminSchema.omit({
  user: true,
  auth: true,
  metadata: true,
});
