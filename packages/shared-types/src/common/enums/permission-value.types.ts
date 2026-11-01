/**
 * Permission Value Types
 * @module shared-types/common/enums
 *
 * Values আসে shared-constants/common/permission.constants থেকে।
 *
 * ⚠️ Note: domain-specific permission type (UserPermissionValue,
 * ProductPermissionValue, OrderPermissionValue) সাধারণত domain-এ
 * রাখা উচিত। এখানে শুধু base PermissionValue।
 */

import type { PERMISSION } from '@vubon/shared-constants/common';

export type PermissionValue = (typeof PERMISSION)[keyof typeof PERMISSION];

export interface PermissionMetadata {
  readonly value: PermissionValue;
  readonly resource: string;
  readonly action: string;
  readonly description: string;
}

export interface PermissionCheck {
  readonly permission: PermissionValue;
  readonly granted: boolean;
  readonly checkedAt: string;
}

export interface PermissionGrant {
  readonly permission: PermissionValue;
  readonly grantedBy: string;
  readonly grantedAt: string;
  readonly expiresAt?: string;
}
