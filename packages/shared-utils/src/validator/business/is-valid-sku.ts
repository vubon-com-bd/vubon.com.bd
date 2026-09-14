/**
 * Check if string is a valid SKU
 * @module shared-utils/validator/business
 */
export function isValidSku(value: string): boolean {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (trimmed.length < 2 || trimmed.length > 64) return false;
  return /^[A-Z0-9][A-Z0-9\-_]*$/i.test(trimmed);
}
