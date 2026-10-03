/**
 * Check if string parses to a valid Date
 * @module shared-utils/validator/type
 *
 * ⚠️ Note: নাম isValidDateString, কারণ common/date/is-valid-date.ts-এ Date-object type guard আছে।
 */
export function isValidDateString(value: string): boolean {
  if (typeof value !== 'string' || value.length === 0) return false;
  const parsed = new Date(value);
  return !Number.isNaN(parsed.getTime());
}
