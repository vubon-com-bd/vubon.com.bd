/**
 * User Permission Types
 * ইউজার পারমিশন সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common';
import { USER_PERMISSIONS } from '@vubon/shared-constants';

export interface UserPermission extends BaseEntity {
  userId: string;
  permission: (typeof USER_PERMISSIONS)[keyof typeof USER_PERMISSIONS];
  resource: string;
  action: string;
  scope?: 'global' | 'organization' | 'team' | 'user';
  conditions?: Record<string, unknown>;
  grantedBy: string;
  grantedAt: Date;
  revokedAt?: Date;
  metadata?: Record<string, unknown>;
}

export interface UserPermissionCreateInput {
  userId: string;
  permission: (typeof USER_PERMISSIONS)[keyof typeof USER_PERMISSIONS];
  resource: string;
  action: string;
  scope?: 'global' | 'organization' | 'team' | 'user';
  conditions?: Record<string, unknown>;
  grantedBy: string;
  metadata?: Record<string, unknown>;
}

export interface UserPermissionCheck {
  userId: string;
  permission: (typeof USER_PERMISSIONS)[keyof typeof USER_PERMISSIONS];
  resource?: string;
  action?: string;
}

export interface UserPermissionResult {
  granted: boolean;
  reason?: string;
  scope?: string;
}

export interface UserPermissionList {
  permissions: UserPermission[];
  total: number;
}
