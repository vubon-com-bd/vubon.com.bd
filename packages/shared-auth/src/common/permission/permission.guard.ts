import { assertPermission } from './permission.checker';
import type { PermissionCheckContext } from './permission.types';

/**
 * Framework-agnostic permission guard.
 * Throws PermissionDeniedError if the check fails.
 */
export function permissionGuard(ctx: PermissionCheckContext): void {
  assertPermission(ctx);
}

/** Returns boolean (non-throwing). */
export function permissionGuardSafe(ctx: PermissionCheckContext): boolean {
  try {
    assertPermission(ctx);
    return true;
  } catch {
    return false;
  }
}
