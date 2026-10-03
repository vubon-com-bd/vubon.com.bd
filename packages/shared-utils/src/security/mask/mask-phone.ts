/**
 * Mask phone: keep first 3 and last 2
 * @module shared-utils/security/mask
 *
 * @example
 * maskPhone('+8801712345678') // '+88**********78'
 */
export function maskPhone(phone: string): string {
  const cleaned = phone.replace(/\s+/g, '');
  if (cleaned.length <= 5) return cleaned;
  const start = cleaned.slice(0, 3);
  const end = cleaned.slice(-2);
  return start + '*'.repeat(cleaned.length - 5) + end;
}
