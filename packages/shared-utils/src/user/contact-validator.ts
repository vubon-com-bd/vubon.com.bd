import { validateEmail } from '../common/validator/email.validator';
import { validatePhone } from '../common/validator/phone.validator';
import { USER_CONTACT } from '@vubon/shared-constants/src/user/user-contact.constants';

export interface UserContact {
  email?: string;
  phone?: string;
  type: string;
}

export const validateContact = (
  contact: Partial<UserContact>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (contact.email && !validateEmail(contact.email).isValid) {
    errors.push('Invalid email');
  }
  if (contact.phone && !validatePhone(contact.phone).isValid) {
    errors.push('Invalid phone');
  }
  if (contact.type && !Object.keys(USER_CONTACT).includes(contact.type)) {
    errors.push('Invalid contact type');
  }
  return { isValid: errors.length === 0, errors };
};
