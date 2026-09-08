import { validateEmail } from '../common/validator/email.validator';
import { validatePhone } from '../common/validator/phone.validator';
import { UserContact } from '@vubon/shared-types';

export const validateContact = (
  contact: Partial<UserContact>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (contact.email?.value && !validateEmail(contact.email.value).isValid) {
    errors.push('Invalid email');
  }
  if (contact.phone?.value && !validatePhone(contact.phone.value).isValid) {
    errors.push('Invalid phone');
  }
  return { isValid: errors.length === 0, errors };
};
