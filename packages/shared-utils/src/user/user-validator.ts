import { validateEmail } from '../common/validator/email.validator';
import { validatePhone } from '../common/validator/phone.validator';
import { USER_STATUS } from '@vubon/shared-constants';
import { User } from '@vubon/shared-types';

export const validateUser = (user: Partial<User>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // User-এ email ও phone হলো Email ও PhoneNumber ক্লাস
  if (user.email?.value && !validateEmail(user.email.value).isValid) {
    errors.push('Invalid email');
  }
  if (user.phone?.value && !validatePhone(user.phone.value).isValid) {
    errors.push('Invalid phone');
  }

  return { isValid: errors.length === 0, errors };
};

export const validateUserStatus = (status: string): boolean => {
  return Object.keys(USER_STATUS).includes(status);
};
