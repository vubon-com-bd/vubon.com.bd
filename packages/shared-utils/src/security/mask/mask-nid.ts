/**
 * Mask Bangladeshi NID: keep first 3 and last 2
 * @module shared-utils/security/mask
 */
export function maskNid(nid: string): string {
  const digits = nid.replace(/\D/g, '');
  if (digits.length <= 5) return digits;
  return digits.slice(0, 3) + '*'.repeat(digits.length - 5) + digits.slice(-2);
}
