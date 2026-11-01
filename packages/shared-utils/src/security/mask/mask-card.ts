/**
 * Mask card number: keep last 4
 * @module shared-utils/security/mask
 */
export function maskCard(cardNumber: string): string {
  const digits = cardNumber.replace(/\D/g, '');
  if (digits.length <= 4) return digits;
  return '*'.repeat(digits.length - 4) + digits.slice(-4);
}
