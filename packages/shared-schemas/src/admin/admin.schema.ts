import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { UserSchema } from '../user/user.schema';
import { AuthSchema } from '../auth/auth.schema';
import { ADMIN_STATUS } from '@vubon/shared-constants/src/admin/admin-status.constants';
import { ADMIN_TYPES } from '@vubon/shared-constants/src/admin/admin-type.constants';
import { ADMIN_LEVEL } from '@vubon/shared-constants/src/admin/admin-level.constants';
import { ADMIN_DEPARTMENT } from '@vubon/shared-constants/src/admin/admin-department.constants';
import { ROLES } from '@vubon/shared-constants/src/common/roles.constants';
import { PERMISSIONS } from '@vubon/shared-constants/src/common/permissions.constants';

const adminStatusKeys = Object.keys(ADMIN_STATUS) as [string, ...string[]];
const adminTypeKeys = Object.keys(ADMIN_TYPES) as [string, ...string[]];
const adminLevelKeys = Object.keys(ADMIN_LEVEL) as [string, ...string[]];
const adminDepartmentKeys = Object.keys(ADMIN_DEPARTMENT) as [string, ...string[]];
const roleKeys = Object.keys(ROLES) as [string, ...string[]];
const permissionKeys = Object.keys(PERMISSIONS) as [string, ...string[]];

export const AdminSchema = BaseSchema.extend({
  adminId: z.string().uuid(),
  userId: z.string().uuid(),
  user: UserSchema,
  auth: AuthSchema,
  status: z.enum(adminStatusKeys),
  type: z.enum(adminTypeKeys),
  level: z.enum(adminLevelKeys),
  department: z.enum(adminDepartmentKeys),
  role: z.enum(roleKeys),
  permissions: z.array(z.enum(permissionKeys)),
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
