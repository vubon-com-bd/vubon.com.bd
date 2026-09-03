/**
 * User Role Types
 * ইউজার রোল সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common';
import { USER_ROLES } from '@vubon/shared-constants';

export interface UserRole extends BaseEntity {
  userId: string;
  role: (typeof USER_ROLES)[keyof typeof USER_ROLES];
  organizationId?: string;
  teamId?: string;
  assignedBy: string;
  assignedAt: Date;
  revokedAt?: Date;
  metadata?: Record<string, unknown>;
}

export interface UserRoleCreateInput {
  userId: string;
  role: (typeof USER_ROLES)[keyof typeof USER_ROLES];
  organizationId?: string;
  teamId?: string;
  assignedBy: string;
  metadata?: Record<string, unknown>;
}

export interface UserRoleCheck {
  userId: string;
  role: (typeof USER_ROLES)[keyof typeof USER_ROLES];
  organizationId?: string;
  teamId?: string;
}

export interface UserRoleResult {
  hasRole: boolean;
  hierarchy?: number;
  permissions?: string[];
}

export interface UserRoleList {
  roles: UserRole[];
  total: number;
}
