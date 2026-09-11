import { VENDOR_CONTACT } from '@vubon/shared-constants/src/business/vendor/vendor-contact.constants';

export interface VendorContactInput {
  name: string;
  email: string;
  phone: string;
  type: string;
}

const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePhone = (phone: string): boolean => {
  return /^\+?[0-9]{10,15}$/.test(phone);
};

export const validateVendorContact = (
  contact: Partial<VendorContactInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!contact.name) errors.push('Contact name is required');
  if (contact.email && !validateEmail(contact.email)) {
    errors.push('Invalid email');
  }
  if (contact.phone && !validatePhone(contact.phone)) {
    errors.push('Invalid phone');
  }
  if (contact.type && !Object.keys(VENDOR_CONTACT.TYPES).includes(contact.type)) {
    errors.push('Invalid contact type');
  }
  return { isValid: errors.length === 0, errors };
};
