import { PERMISSION } from '@vubon/shared-constants/common';
import { PermissionDeniedError } from './permission.errors';
import { matchesPattern } from './permission.matcher';
import type { PermissionCheckContext } from './permission.types';

export function hasPermission(
  ownedPermissions: readonly string[],
  required: string | readonly string[],
  mode: 'any' | 'all' = 'all'
): boolean {
  const requiredList = Array.isArray(required) ? required : [required];
  if (requiredList.length === 0) return true;

  // Global `*` grants everything
  if (ownedPermissions.includes(PERMISSION.ALL)) return true;

  const check = (req: string): boolean =>
    ownedPermissions.some((owned) => matchesPattern(owned, req));

  return mode === 'all' ? requiredList.every(check) : requiredList.some(check);
}

export function checkPermission(ctx: PermissionCheckContext): boolean {
  return hasPermission(ctx.permissions, ctx.required, ctx.mode ?? 'all');
}

export function assertPermission(ctx: PermissionCheckContext): void {
  if (!checkPermission(ctx)) {
    const requiredList = Array.isArray(ctx.required) ? ctx.required : [ctx.required];
    const missing = requiredList.filter(
      (req) => !ctx.permissions.some((owned) => matchesPattern(owned, req))
    );
    throw new PermissionDeniedError(missing);
  }
}
