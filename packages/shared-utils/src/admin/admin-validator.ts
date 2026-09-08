import { ADMIN_STATUS } from '@vubon/shared-constants';
import { ADMIN_TYPES } from '@vubon/shared-constants';
import { Admin } from '@vubon/shared-types';

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
