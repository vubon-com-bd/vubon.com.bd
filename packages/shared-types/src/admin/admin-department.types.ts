import { BaseEntity } from '../common/base.types';
import { ADMIN_DEPARTMENT } from '@vubon/shared-constants/src/admin/admin-department.constants';

/**
 * Admin department type value (it/hr/finance/operations)
 */
export type AdminDepartmentValue = (typeof ADMIN_DEPARTMENT)[keyof typeof ADMIN_DEPARTMENT];

/**
 * Admin department interface
 *
 * Design notes:
 * - `type` = code (it/hr/finance/operations) — matches constants.
 * - `name` = display name (e.g. 'Information Technology').
 * - `headId` and `memberIds` are references (string IDs).
 *   Full Admin objects are NOT embedded — resolve on demand.
 * - `parentId` supports nested departments.
 */
export interface AdminDepartment extends BaseEntity {
  departmentId: string;
  type: AdminDepartmentValue;
  name: string;
  description: string;
  headId: string;
  memberIds: string[];
  parentId?: string;
  isActive: boolean;
}
