import { ROLE } from '@vubon/shared-constants/common';
import { RoleDeniedError } from './role.errors';
import { getInheritedRoles } from './role.hierarchy';
import type { Role, RoleCheckContext } from './role.types';

export function hasRole(
  userRoles: readonly Role[],
  required: Role | readonly Role[],
  mode: 'any' | 'all' = 'any'
): boolean {
  const requiredList = Array.isArray(required) ? required : [required];
  if (requiredList.length === 0) return true;

  // SUPER_ADMIN bypasses everything
  if (userRoles.includes(ROLE.SUPER_ADMIN as Role)) return true;

  // Expand user's roles with inherited ones
  const effective = new Set<Role>(userRoles);
  for (const r of userRoles) {
    for (const inherited of getInheritedRoles(r)) {
      effective.add(inherited as Role);
    }
  }

  const check = (req: Role): boolean => effective.has(req);
  return mode === 'all' ? requiredList.every(check) : requiredList.some(check);
}

export function checkRole(ctx: RoleCheckContext): boolean {
  return hasRole(ctx.userRoles, ctx.required, ctx.mode ?? 'any');
}

export function assertRole(ctx: RoleCheckContext): void {
  if (!checkRole(ctx)) {
    const requiredList = Array.isArray(ctx.required) ? ctx.required : [ctx.required];
    const missing = requiredList.filter((r) => !ctx.userRoles.includes(r));
    throw new RoleDeniedError(missing);
  }
}
