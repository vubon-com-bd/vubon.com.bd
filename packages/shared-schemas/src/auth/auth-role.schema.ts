import { z } from 'zod';
import { RoleSchema } from '../common/role.schema';
import { AUTH_ROLES } from '@vubon/shared-constants';

export const AuthRoleSchema = RoleSchema.extend({
  role: z.enum(Object.keys(AUTH_ROLES) as [string, ...string[]]),
  category: z.literal('auth'),
});

export const AuthRoleEnumSchema = z.enum(Object.keys(AUTH_ROLES) as [string, ...string[]]);
