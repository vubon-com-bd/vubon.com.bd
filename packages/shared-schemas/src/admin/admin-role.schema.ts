import { z } from 'zod';
import { RoleSchema } from '../common/role.schema';
import { ADMIN_ROLES } from '@vubon/shared-constants/src/admin/admin-role.constants';

const adminRoleValues = Object.values(ADMIN_ROLES) as [string, ...string[]];

export const AdminRoleSchema = RoleSchema.extend({
  role: z.enum(adminRoleValues),
  category: z.literal('admin'),
  /** Role this inherits from (or null) */
  inheritsFrom: z.enum(adminRoleValues).nullable(),
});
