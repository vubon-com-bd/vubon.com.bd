/**
 * Check if string is a valid hex sequence (even length)
 * @module shared-utils/validator/type
 */
export function isValidHex(value: string): boolean {
  if (typeof value !== 'string') return false;
  if (value.length === 0 || value.length % 2 !== 0) return false;
  return /^[0-9a-fA-F]+$/.test(value);
}
