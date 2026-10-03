import { ROLE } from '@vubon/shared-constants/common';
import type { RoleHierarchy } from './role.types';

/**
 * Role hierarchy — higher role inherits lower role's capabilities.
 * Order matters: SUPER_ADMIN is highest.
 */
export const ROLE_HIERARCHY: RoleHierarchy = Object.freeze({
  [ROLE.SUPER_ADMIN]: [ROLE.ADMIN],
  [ROLE.ADMIN]: [ROLE.MODERATOR],
  [ROLE.MODERATOR]: [ROLE.SUPPORT_MANAGER],
  [ROLE.SUPPORT_MANAGER]: [ROLE.SUPPORT_AGENT],
  [ROLE.SUPPORT_AGENT]: [ROLE.CUSTOMER],
  [ROLE.VENDOR_MANAGER]: [ROLE.VENDOR_STAFF],
  [ROLE.VENDOR_STAFF]: [ROLE.CUSTOMER],
  [ROLE.LOGISTICS_MANAGER]: [ROLE.LOGISTICS_AGENT],
  [ROLE.LOGISTICS_AGENT]: [ROLE.DELIVERY_DRIVER],
  [ROLE.WAREHOUSE_MANAGER]: [ROLE.LOGISTICS_AGENT],
});

export function getInheritedRoles(role: string): readonly string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  const stack = [...(ROLE_HIERARCHY[role] ?? [])];
  while (stack.length > 0) {
    const r = stack.pop();
    if (!r || seen.has(r)) continue;
    seen.add(r);
    out.push(r);
    stack.push(...(ROLE_HIERARCHY[r] ?? []));
  }
  return out;
}
