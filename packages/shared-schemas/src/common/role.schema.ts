import { z } from 'zod';
import { ROLES } from '@vubon/shared-constants';

export const RoleSchema = z.object({
  role: z.enum(Object.keys(ROLES) as [string, ...string[]]),
});

export const RoleEnumSchema = z.enum(Object.keys(ROLES) as [string, ...string[]]);

export const RoleListSchema = z.object({
  roles: z.array(z.enum(Object.keys(ROLES) as [string, ...string[]])),
});
