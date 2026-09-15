import { ROLE } from '@vubon/shared-constants/common';
import type { Role } from './role.types';

/** List all defined roles. */
export function listAllRoles(): readonly Role[] {
  return Object.values(ROLE) as readonly Role[];
}

/** Check if a role is admin-level. */
export function isAdminRole(role: Role): boolean {
  return role === ROLE.SUPER_ADMIN || role === ROLE.ADMIN || role === ROLE.MODERATOR;
}

/** Check if a role is vendor-level. */
export function isVendorRole(role: Role): boolean {
  return role === ROLE.VENDOR || role === ROLE.VENDOR_MANAGER || role === ROLE.VENDOR_STAFF;
}

/** Human-readable label for a role. */
export function roleLabel(role: Role): string {
  return role
    .split('_')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join(' ');
}
