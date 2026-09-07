import { z } from 'zod';
import { RoleSchema } from '../common/role.schema';
import { USER_ROLES } from '@vubon/shared-constants';
import { AUTH_ROLES } from '@vubon/shared-constants';

export const UserRoleSchema = RoleSchema.extend({
  role: z.enum(Object.keys(USER_ROLES) as [string, ...string[]]),
  category: z.literal('user'),
  extends: z.enum(Object.keys(AUTH_ROLES) as [string, ...string[]]).optional(),
});

export const UserRoleEnumSchema = z.enum(Object.keys(USER_ROLES) as [string, ...string[]]);
