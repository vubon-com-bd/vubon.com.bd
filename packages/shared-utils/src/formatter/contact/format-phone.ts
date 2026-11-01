/**
 * Format phone number (BD format by default)
 * @module shared-utils/formatter/contact
 */
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');

  // BD: 11 digits starting with 01
  if (digits.length === 11 && digits.startsWith('01')) {
    return `${digits.slice(0, 4)}-${digits.slice(4, 7)}-${digits.slice(7)}`;
  }

  // BD with country code: 880 + 10 digits
  if (digits.length === 13 && digits.startsWith('880')) {
    return `+${digits.slice(0, 3)} ${digits.slice(3, 5)}-${digits.slice(5, 8)}-${digits.slice(8)}`;
  }

  // Fallback: return input
  return phone;
}
