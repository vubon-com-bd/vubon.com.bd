import { z } from 'zod';
import { RoleSchema } from '../common/role.schema';
import { AUTH_ROLES } from '@vubon/shared-constants/src/auth/auth-role.constants';

const authRoleKeys = Object.keys(AUTH_ROLES) as [string, ...string[]];

export const AuthRoleSchema = RoleSchema.extend({
  role: z.enum(authRoleKeys),
  category: z.literal('auth'),
});

export const AuthRoleEnumSchema = z.enum(authRoleKeys);
