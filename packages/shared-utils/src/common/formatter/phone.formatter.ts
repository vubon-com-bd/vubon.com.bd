/**
 * Phone Formatter — uses REGEX.
 */
import { REGEX } from '@vubon/shared-constants/src/common/regex.constants';

/**
 * Formats a Bangladesh phone number: 01712-345678
 */
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const local = cleaned.replace(/^(?:880|88)/, '').replace(/^0/, '');
  if (local.length === 10 && /^1[3-9]/.test(local)) {
    return `0${local.slice(0, 4)}-${local.slice(4)}`;
  }
  return phone;
};

/**
 * Formats an international phone number with country code.
 */
export const formatPhoneInternational = (phone: string): string => {
  const cleaned = phone.replace(/\s/g, '');
  if (REGEX.BD_MOBILE.test(cleaned)) {
    const local = cleaned.replace(/^(?:\+880|880|0)/, '');
    return `+880${local}`;
  }
  if (cleaned.startsWith('+')) return cleaned;
  return `+${cleaned}`;
};
