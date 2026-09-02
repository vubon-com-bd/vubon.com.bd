/**
 * Auth Role Types
 * প্রমাণীকরণ রোল সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common/base.entity';
import { AUTH_ROLE } from '@vubon/shared-constants';

export interface AuthRole extends BaseEntity {
  name: AuthRoleType;
  displayName: string;
  description?: string;
  hierarchy: number;
  permissions: string[];
  isDefault: boolean;
  isSystem: boolean;
  enabled: boolean;
  metadata?: Record<string, unknown>;
}

export interface AuthRoleAssignment {
  userId: string;
  roleId: string;
  organizationId?: string;
  teamId?: string;
  assignedBy: string;
  assignedAt: Date;
  revokedAt?: Date;
}

export interface AuthRoleCreateInput {
  name: AuthRoleType;
  displayName: string;
  description?: string;
  hierarchy?: number;
  permissions?: string[];
  isDefault?: boolean;
  isSystem?: boolean;
}

export type AuthRoleType = (typeof AUTH_ROLE)[keyof typeof AUTH_ROLE];
