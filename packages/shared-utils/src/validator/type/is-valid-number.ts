/**
 * Check if string is a valid finite number
 * @module shared-utils/validator/type
 */
export function isValidNumber(value: string): boolean {
  if (typeof value !== 'string' || value.trim() === '') return false;
  const parsed = Number(value);
  return Number.isFinite(parsed);
}
