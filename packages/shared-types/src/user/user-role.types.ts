/**
 * User Role Value Types
 * @module shared-types/user
 *
 * Values আসে shared-constants/user/user-role.constants থেকে।
 */

import type { USER_ROLE } from '@vubon/shared-constants/user';

export type UserRoleValue = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export interface UserRoleMetadata {
  readonly value: UserRoleValue;
  readonly label: string;
  readonly level: number;
  readonly isPrimary: boolean;
}

export interface UserRoleAssignment {
  readonly userId: string;
  readonly role: UserRoleValue;
  readonly assignedAt: string;
  readonly assignedBy?: string;
  readonly expiresAt?: string;
}
