import { validateEmail } from '../common/validator/email.validator';
import { validatePhone } from '../common/validator/phone.validator';
import { USER_STATUS } from '@vubon/shared-constants/src/user/user-status.constants';

export interface User {
  email: string;
  phone?: string;
  status: string;
}

export const validateUser = (user: Partial<User>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (user.email && !validateEmail(user.email).isValid) {
    errors.push('Invalid email');
  }
  if (user.phone && !validatePhone(user.phone).isValid) {
    errors.push('Invalid phone');
  }
  return { isValid: errors.length === 0, errors };
};

export const validateUserStatus = (status: string): boolean => {
  return Object.keys(USER_STATUS).includes(status);
};
