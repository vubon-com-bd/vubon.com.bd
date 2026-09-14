/**
 * Auth Permission Value Types
 * @module shared-types/auth
 *
 * Values আসে shared-constants/auth/auth-permission.constants থেকে।
 */

import type { AUTH_PERMISSION } from '@vubon/shared-constants/auth';
import type { PermissionValue } from '../common/enums';

export type AuthPermissionValue = (typeof AUTH_PERMISSION)[keyof typeof AUTH_PERMISSION];

export interface AuthPermissionMetadata {
  readonly value: AuthPermissionValue;
  readonly label: string;
  readonly category: string;
  readonly isSensitive: boolean;
}

export interface AuthPermissionCheck {
  readonly role: string;
  readonly permission: PermissionValue | AuthPermissionValue;
  readonly granted: boolean;
  readonly checkedAt: string;
}

export interface AuthPermissionGrant {
  readonly userId: string;
  readonly permission: PermissionValue | AuthPermissionValue;
  readonly grantedBy: string;
  readonly grantedAt: string;
  readonly expiresAt?: string;
  readonly reason?: string;
}

export interface AuthPermissionRevoke {
  readonly userId: string;
  readonly permission: PermissionValue | AuthPermissionValue;
  readonly revokedBy: string;
  readonly revokedAt: string;
  readonly reason?: string;
}
