import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { UserSchema } from '../user/user.schema';
import { AuthSchema } from '../auth/auth.schema';
import { ADMIN_STATUS } from '@vubon/shared-constants';
import { ADMIN_TYPES } from '@vubon/shared-constants';
import { ADMIN_LEVEL } from '@vubon/shared-constants';
import { ADMIN_DEPARTMENT } from '@vubon/shared-constants';
import { ROLES } from '@vubon/shared-constants';
import { PERMISSIONS } from '@vubon/shared-constants';

export const AdminSchema = BaseSchema.extend({
  adminId: z.string().uuid(),
  userId: z.string().uuid(),
  user: UserSchema,
  auth: AuthSchema,
  status: z.enum(Object.keys(ADMIN_STATUS) as [string, ...string[]]),
  type: z.enum(Object.keys(ADMIN_TYPES) as [string, ...string[]]),
  level: z.enum(Object.keys(ADMIN_LEVEL) as [string, ...string[]]),
  department: z.enum(Object.keys(ADMIN_DEPARTMENT) as [string, ...string[]]),
  role: z.enum(Object.keys(ROLES) as [string, ...string[]]),
  permissions: z.array(z.enum(Object.keys(PERMISSIONS) as [string, ...string[]])),
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
