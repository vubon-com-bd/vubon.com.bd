import { z } from 'zod';
import { RoleSchema } from '../common/role.schema';
import { ADMIN_ROLES } from '@vubon/shared-constants';
import { USER_ROLES } from '@vubon/shared-constants';

export const AdminRoleSchema = RoleSchema.extend({
  role: z.enum(Object.keys(ADMIN_ROLES) as [string, ...string[]]),
  category: z.literal('admin'),
  extends: z.enum(Object.keys(ADMIN_ROLES) as [string, ...string[]]).nullable(),
  userRoles: z.array(z.enum(Object.keys(USER_ROLES) as [string, ...string[]])).optional(),
});

export const AdminRoleEnumSchema = z.enum(Object.keys(ADMIN_ROLES) as [string, ...string[]]);
