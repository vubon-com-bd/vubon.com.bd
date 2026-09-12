/**
 * Admin Role Constants
 * @module shared-constants/admin/admin-role.constants
 *
 * Spreads COMMON_ROLES + USER_ROLES. Duplicate keys (SUPER_ADMIN, ADMIN,
 * MODERATOR) are already present in COMMON_ROLES, so they are not redeclared.
 */

import { ROLES as COMMON_ROLES } from '../common/roles.constants';
import { USER_ROLES } from '../user/user-role.constants';

export const ADMIN_ROLES = {
  ...COMMON_ROLES,
  ...USER_ROLES,
} as const;

export type AdminRole = (typeof ADMIN_ROLES)[keyof typeof ADMIN_ROLES];
