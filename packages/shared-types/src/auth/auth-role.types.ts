/**
 * Auth Role Value Types
 * @module shared-types/auth
 *
 * Values আসে shared-constants/auth/auth-role.constants থেকে।
 * এবং shared-constants/common/role.constants।
 */

import type { AUTH_ROLE } from '@vubon/shared-constants/auth';
import type { RoleValue } from '../common/enums';

export type AuthRoleValue = (typeof AUTH_ROLE)[keyof typeof AUTH_ROLE];

export interface AuthRoleMetadata {
  readonly value: AuthRoleValue;
  readonly label: string;
  readonly level: number;
  readonly isSystemRole: boolean;
  readonly isAdminRole: boolean;
}

export interface AuthRoleAssignment {
  readonly userId: string;
  readonly role: RoleValue | AuthRoleValue;
  readonly assignedBy: string;
  readonly assignedAt: string;
  readonly expiresAt?: string;
  readonly isPrimary: boolean;
}

export interface AuthRoleHierarchy {
  readonly role: RoleValue | AuthRoleValue;
  readonly level: number;
  readonly inheritsFrom?: readonly (RoleValue | AuthRoleValue)[];
}

export interface AuthRoleCheck {
  readonly userId: string;
  readonly role: RoleValue | AuthRoleValue;
  readonly hasRole: boolean;
  readonly checkedAt: string;
}
