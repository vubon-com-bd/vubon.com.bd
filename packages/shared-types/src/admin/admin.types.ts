/**
 * Admin Types - Base
 * অ্যাডমিন সম্পর্কিত মূল টাইপ
 */

import { BaseEntity, BaseResponse } from '../common';
import { AuthUser } from '../common/auth.user';
import { ADMIN_STATUS, ADMIN_ROLES } from '@vubon/shared-constants';

export interface Admin extends BaseEntity, Omit<AuthUser, 'role' | 'status'> {
  role: (typeof ADMIN_ROLES)[keyof typeof ADMIN_ROLES];
  status: (typeof ADMIN_STATUS)[keyof typeof ADMIN_STATUS];
  level?: string;
  department?: string;
  permissions?: string[];
  lastLoginAt?: Date;
  isSuperAdmin: boolean;
}

export interface AdminCreateInput {
  email: string;
  name: string;
  phone?: string;
  role?: (typeof ADMIN_ROLES)[keyof typeof ADMIN_ROLES];
  status?: (typeof ADMIN_STATUS)[keyof typeof ADMIN_STATUS];
  level?: string;
  department?: string;
  permissions?: string[];
}

export interface AdminUpdateInput extends Partial<AdminCreateInput> {
  isSuperAdmin?: boolean;
  isLocked?: boolean;
  lastLoginAt?: Date;
}

export interface AdminResponse extends BaseResponse<Admin> {
  admin: Admin;
}

export interface AdminListResponse extends BaseResponse<Admin[]> {
  admins: Admin[];
  total: number;
  page: number;
  limit: number;
}
