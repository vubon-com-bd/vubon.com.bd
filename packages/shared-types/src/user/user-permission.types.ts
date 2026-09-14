/**
 * User Permission Value Types
 * @module shared-types/user
 *
 * Values আসে shared-constants/user/user-permission.constants থেকে।
 */

import type { USER_PERMISSION } from '@vubon/shared-constants/user';

export type UserPermissionValue = (typeof USER_PERMISSION)[keyof typeof USER_PERMISSION];

export interface UserPermissionGrant {
  readonly userId: string;
  readonly permission: UserPermissionValue;
  readonly grantedBy: string;
  readonly grantedAt: string;
  readonly expiresAt?: string;
}
