/**
 * Admin Department Types
 * অ্যাডমিন ডিপার্টমেন্ট সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common';
import { ADMIN_DEPARTMENT } from '@vubon/shared-constants';

export interface AdminDepartment extends BaseEntity {
  name: (typeof ADMIN_DEPARTMENT.DEPARTMENTS)[keyof typeof ADMIN_DEPARTMENT.DEPARTMENTS];
  code: string;
  description?: string;
  headId?: string;
  members: string[];
  parentDepartment?: string;
  status: 'active' | 'inactive';
  metadata?: Record<string, unknown>;
}

export interface AdminDepartmentCreateInput {
  name: (typeof ADMIN_DEPARTMENT.DEPARTMENTS)[keyof typeof ADMIN_DEPARTMENT.DEPARTMENTS];
  code: string;
  description?: string;
  headId?: string;
  members?: string[];
  parentDepartment?: string;
  metadata?: Record<string, unknown>;
}

export interface AdminDepartmentUpdateInput extends Partial<AdminDepartmentCreateInput> {
  status?: 'active' | 'inactive';
}

export interface AdminDepartmentListResponse {
  departments: AdminDepartment[];
  total: number;
}
