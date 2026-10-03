import { PERMISSION } from '@vubon/shared-constants/common';
import type { PermissionMatcher } from './permission.types';

/**
 * Check whether a permission matches a pattern.
 * Supports:
 *   - `*`        → matches everything
 *   - `user:*`   → matches `user:view`, `user:create`, ...
 *   - `user:view` → exact match
 */
export function matchesPattern(permission: string, pattern: string): boolean {
  if (pattern === PERMISSION.ALL || pattern === '*') return true;
  if (pattern === permission) return true;

  if (pattern.endsWith(':*')) {
    const prefix = pattern.slice(0, -1); // keep colon
    return permission.startsWith(prefix);
  }

  return false;
}

export function buildMatcher(pattern: string): PermissionMatcher {
  return {
    pattern,
    matches: (permission: string) => matchesPattern(permission, pattern),
  };
}
