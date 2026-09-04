/**
 * Admin Permission Types
 * অ্যাডমিন পারমিশন সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common';
import { AuthPermission } from '../auth/auth-permission.types';
import { ADMIN_PERMISSIONS, ADMIN_ROLES } from '@vubon/shared-constants';

export interface AdminPermission extends BaseEntity, Omit<AuthPermission, 'action'> {
  name: keyof typeof ADMIN_PERMISSIONS;
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'manage' | 'execute';
  roles: (typeof ADMIN_ROLES)[keyof typeof ADMIN_ROLES][];
  conditions?: Record<string, unknown>;
}

export interface AdminPermissionCreateInput {
  name: keyof typeof ADMIN_PERMISSIONS;
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'manage' | 'execute';
  roles?: (typeof ADMIN_ROLES)[keyof typeof ADMIN_ROLES][];
  conditions?: Record<string, unknown>;
}

// UpdateInput Partial ব্যবহার করলেই যথেষ্ট, আলাদা interface দরকার নেই
export type AdminPermissionUpdateInput = Partial<AdminPermissionCreateInput>;

export interface AdminPermissionCheck {
  adminId: string;
  permission: keyof typeof ADMIN_PERMISSIONS;
  resourceId?: string;
}

export interface AdminPermissionResult {
  granted: boolean;
  reason?: string;
  role?: string;
}
