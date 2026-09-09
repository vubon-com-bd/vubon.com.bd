import { ADMIN_STATUS } from '@vubon/shared-constants/src/admin/admin-status.constants';
import { ADMIN_TYPES } from '@vubon/shared-constants/src/admin/admin-type.constants';

export interface Admin {
  status: string;
  type: string;
  level: string;
  department: string;
}

export const validateAdmin = (admin: Partial<Admin>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (admin.status && !Object.keys(ADMIN_STATUS).includes(admin.status)) {
    errors.push('Invalid admin status');
  }
  if (admin.type && !Object.keys(ADMIN_TYPES).includes(admin.type)) {
    errors.push('Invalid admin type');
  }
  return { isValid: errors.length === 0, errors };
};
