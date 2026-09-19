import { ROLE } from '@vubon/shared-constants/common';
import type { Role } from './role.types';

/**
 * Wildcard / pattern role matcher.
 * Supports:
 *   - `*`         → matches any role (SUPER_ADMIN)
 *   - `vendor:*`  → matches `vendor`, `vendor_manager`, `vendor_staff`
 *   - `vendor`    → exact match
 */
export function matchesRolePattern(role: string, pattern: string): boolean {
  if (pattern === '*' || pattern === ROLE.SUPER_ADMIN) return true;
  if (pattern === role) return true;

  if (pattern.endsWith(':*')) {
    const prefix = pattern.slice(0, -1);
    return role.startsWith(prefix);
  }
  return false;
}

export interface RoleMatcher {
  readonly pattern: string;
  readonly matches: (role: Role) => boolean;
}

export function buildRoleMatcher(pattern: string): RoleMatcher {
  return {
    pattern,
    matches: (role: Role) => matchesRolePattern(role, pattern),
  };
}
