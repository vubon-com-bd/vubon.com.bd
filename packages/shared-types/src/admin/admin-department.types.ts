import { BaseEntity } from '../common/base.types';
import { ADMIN_DEPARTMENT } from '@vubon/shared-constants/src/admin/admin-department.constants';
import { Admin } from './admin.types';

/**
 * Admin department interface
 */
export interface AdminDepartment extends BaseEntity {
  departmentId: string;
  name: keyof typeof ADMIN_DEPARTMENT;
  description: string;
  headId: string;
  head: Admin;
  members: Admin[];
  parentId?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  metadata: Record<string, unknown>;
}
