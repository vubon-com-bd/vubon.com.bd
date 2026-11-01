/**
 * Check if string contains Bengali characters
 * @module shared-utils/bd/language
 */
const BENGALI_RANGE = /[\u0980-\u09FF]/;

export function isBengali(value: string): boolean {
  if (typeof value !== 'string') return false;
  return BENGALI_RANGE.test(value);
}
