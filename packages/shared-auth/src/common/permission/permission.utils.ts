import { PERMISSION } from '@vubon/shared-constants/common';

/** Expand a pattern like `user:*` into a list of known permissions. */
export function expandPattern(
  pattern: string,
  knownPermissions: readonly string[]
): readonly string[] {
  if (pattern === '*') return knownPermissions;
  if (pattern.endsWith(':*')) {
    const prefix = pattern.slice(0, -1);
    return knownPermissions.filter((p) => p.startsWith(prefix));
  }
  return [pattern];
}

/** List all permissions defined in shared-constants. */
export function listAllPermissions(): readonly string[] {
  return Object.values(PERMISSION);
}
