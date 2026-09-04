/**
 * Admin Role Types
 * অ্যাডমিন রোল সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common';
import { AuthRole } from '../auth/auth-role.types';
import { ADMIN_ROLES } from '@vubon/shared-constants';

export interface AdminRole extends BaseEntity, Omit<AuthRole, 'name'> {
  name: (typeof ADMIN_ROLES)[keyof typeof ADMIN_ROLES];
  hierarchy: number;
  permissions: string[];
  isSystem: boolean;
  isDefault: boolean;
}

export interface AdminRoleCreateInput {
  name: (typeof ADMIN_ROLES)[keyof typeof ADMIN_ROLES];
  description?: string;
  hierarchy?: number;
  permissions?: string[];
  isSystem?: boolean;
  isDefault?: boolean;
}

export type AdminRoleUpdateInput = Partial<AdminRoleCreateInput>;

export interface AdminRoleAssignment {
  adminId: string;
  roleId: string;
  assignedBy: string;
  assignedAt: Date;
  revokedAt?: Date;
}

export interface AdminRoleListResponse {
  roles: AdminRole[];
  total: number;
}
