import { z } from 'zod';
import { RoleSchema } from '../common/role.schema';
import { USER_ROLES } from '@vubon/shared-constants/src/user/user-role.constants';

const userRoleValues = Object.values(USER_ROLES) as [string, ...string[]];

export const UserRoleSchema = RoleSchema.extend({
  role: z.enum(userRoleValues),
  category: z.literal('user'),
});
