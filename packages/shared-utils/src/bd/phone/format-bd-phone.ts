/**
 * Format BD phone in +880 1X-XXXX-XXXX pattern
 * @module shared-utils/bd/phone
 */
export function formatBdPhone(value: string): string {
  const digits = String(value).replace(/\D/g, '');
  const local = digits.startsWith('880') ? digits.slice(3) : digits;
  if (!/^01[3-9]\d{8}$/.test(local)) return value;
  return `+880 ${local.slice(0, 3)}-${local.slice(3, 7)}-${local.slice(7)}`;
}
