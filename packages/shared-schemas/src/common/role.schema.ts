import { z } from 'zod';
import { ROLES } from '@vubon/shared-constants/src/common/roles.constants';

const roleKeys = Object.keys(ROLES) as [string, ...string[]];

export const RoleSchema = z.object({
  role: z.enum(roleKeys),
});

export const RoleEnumSchema = z.enum(roleKeys);

export const RoleListSchema = z.object({
  roles: z.array(z.enum(roleKeys)),
});
