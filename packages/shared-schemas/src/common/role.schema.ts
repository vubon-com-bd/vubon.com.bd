import { z } from 'zod';
import { ROLES } from '@vubon/shared-constants/src/common/roles.constants';

/**
 * Role VALUES (e.g. 'super_admin', 'customer') — not KEYS.
 * Previously used Object.keys → produced 'SUPER_ADMIN' which is wrong.
 */
const roleValues = Object.values(ROLES) as [string, ...string[]];

export const RoleSchema = z.object({
  role: z.enum(roleValues),
});

export const RoleEnumSchema = z.enum(roleValues);

export const RoleListSchema = z.object({
  roles: z.array(z.enum(roleValues)),
});
