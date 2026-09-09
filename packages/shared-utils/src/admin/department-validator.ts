import { ADMIN_DEPARTMENT } from '@vubon/shared-constants/src/admin/admin-department.constants';

export interface AdminDepartment {
  name: string;
  description: string;
  headId: string;
  parentId?: string;
  isActive: boolean;
  metadata: Record<string, unknown>;
}

export const validateDepartment = (
  department: Partial<AdminDepartment>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!department.name || !Object.keys(ADMIN_DEPARTMENT).includes(department.name)) {
    errors.push('Invalid department name');
  }
  if (!department.headId) errors.push('Department head is required');
  return { isValid: errors.length === 0, errors };
};
