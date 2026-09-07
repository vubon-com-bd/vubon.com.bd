import { ADMIN_DEPARTMENT } from '@vubon/shared-constants';
import { Admin } from './admin.types';

export interface AdminDepartment {
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
