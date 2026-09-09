import { z } from 'zod';
import { RoleSchema } from '../common/role.schema';
import { ADMIN_ROLES } from '@vubon/shared-constants/src/admin/admin-role.constants';

const adminRoleKeys = Object.keys(ADMIN_ROLES) as [string, ...string[]];

export const AdminRoleSchema = RoleSchema.extend({
  role: z.enum(adminRoleKeys),
  category: z.literal('admin'),
  extends: z.enum(adminRoleKeys).nullable(),
});
