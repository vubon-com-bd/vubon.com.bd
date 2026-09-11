import { BaseEntity } from '../common/base.types';
import { ADMIN_DEPARTMENT } from '@vubon/shared-constants/src/admin/admin-department.constants';
import { AdminPublic } from './admin.types';

/**
 * Admin department value
 */
export type AdminDepartmentValue = (typeof ADMIN_DEPARTMENT)[keyof typeof ADMIN_DEPARTMENT];

/**
 * Admin department interface
 */
export interface AdminDepartment extends BaseEntity {
  departmentId: string;
  name: AdminDepartmentValue;
  description: string;
  headId: string;
  head: AdminPublic;
  members: AdminPublic[];
  parentId?: string;
  isActive: boolean;
}
